import { ref, computed, watch, Ref, ComputedRef } from 'vue';

/**
 * Navigation item structure
 */
export interface NavigationItem {
	id?: string;
	label?: string;
	icon?: string;
	href?: string;
	to?: string;
	children?: NavigationItem[];
	badge?: string | number;
	badgeVariant?: string;
	disabled?: boolean;
	type?: 'link' | 'group' | 'divider';
}

/**
 * Configuration options for useSidebarState
 */
export interface SidebarStateOptions {
	/**
	 * Navigation items configuration
	 */
	items: NavigationItem[];
	/**
	 * Initial collapsed state
	 */
	initialCollapsed?: boolean;
	/**
	 * Current active route path
	 */
	activeRoute?: string;
}

/**
 * Return type for useSidebarState
 */
export interface SidebarState {
	// Collapse state
	collapsed: Ref<boolean>;
	
	// Submenu state
	openSubmenus: Ref<string[]>;
	
	// Filtered navigation items
	navigationItems: ComputedRef<NavigationItem[]>;
	
	// Methods
	toggleCollapsed: () => void;
	isSubmenuOpen: (item: NavigationItem) => boolean;
	toggleSubmenu: (item: NavigationItem) => void;
	isItemActive: (item: NavigationItem) => boolean;
	hasActiveChild: (item: NavigationItem) => boolean;
	initializeOpenSubmenus: () => void;
}

/**
 * Composable for managing navigation sidebar state
 * 
 * Handles collapsed state, submenu navigation, and active route detection.
 * 
 * @param options - Configuration options for the sidebar state
 * @param emit - Emit function from the component setup
 * @returns Object containing reactive state and methods for sidebar operations
 * 
 * @example
 * ```ts
 * const sidebarState = useSidebarState({
 *   items: navigationItems,
 *   activeRoute: '/dashboard'
 * }, emit);
 * ```
 */
export function useSidebarState(
	options: SidebarStateOptions,
	emit: (event: string, ...args: any[]) => void
): SidebarState {
	const {
		items,
		initialCollapsed = false,
		activeRoute = ''
	} = options;

	// Reactive state
	const collapsed = ref(initialCollapsed);
	const openSubmenus = ref<string[]>([]);

	// Computed: Filtered navigation items (excluding invalid entries)
	const navigationItems = computed(() => {
		return items.filter((item) => item && (item.label || item.type === 'divider'));
	});

	/**
	 * Check if an item is currently active
	 */
	const isItemActive = (item: NavigationItem): boolean => {
		if (!activeRoute) return false;

		const itemPath = item.to || item.href;
		if (!itemPath) return false;

		// Exact match
		if (activeRoute === itemPath) return true;

		// For nested routes: check if active route starts with item path
		// followed by '/' or end of string to avoid partial matches
		// e.g., '/users' should not match '/user-settings'
		if (itemPath !== '/') {
			return (
				activeRoute.startsWith(itemPath + '/') ||
				activeRoute === itemPath
			);
		}

		return false;
	};

	/**
	 * Check if a parent item has an active child
	 */
	const hasActiveChild = (item: NavigationItem): boolean => {
		if (!item.children || item.children.length === 0) return false;
		return item.children.some((child) => isItemActive(child));
	};

	/**
	 * Check if a submenu is open
	 */
	const isSubmenuOpen = (item: NavigationItem): boolean => {
		const key = item.id || item.label || '';
		return openSubmenus.value.includes(key);
	};

	/**
	 * Toggle submenu open state
	 */
	const toggleSubmenu = (item: NavigationItem): void => {
		const key = item.id || item.label || '';
		const index = openSubmenus.value.indexOf(key);

		if (index === -1) {
			openSubmenus.value.push(key);
		} else {
			openSubmenus.value.splice(index, 1);
		}

		emit('submenu-toggle', { item, open: index === -1 });
	};

	/**
	 * Toggle sidebar collapsed state
	 */
	const toggleCollapsed = (): void => {
		collapsed.value = !collapsed.value;
		emit('update:collapsed', collapsed.value);
		emit('toggle', collapsed.value);
	};

	/**
	 * Initialize open submenus based on active route
	 */
	const initializeOpenSubmenus = (): void => {
		if (!activeRoute) return;

		items.forEach((item) => {
			if (item.children && item.children.length > 0) {
				const hasActiveChildItem = item.children.some((child) =>
					isItemActive(child)
				);
				const key = item.id || item.label || '';
				if (hasActiveChildItem && !openSubmenus.value.includes(key)) {
					openSubmenus.value.push(key);
				}
			}
		});
	};

	// Watch: Close submenus when sidebar is collapsed
	watch(collapsed, (newValue) => {
		if (newValue) {
			openSubmenus.value = [];
		}
	});

	return {
		// Collapse state
		collapsed,
		
		// Submenu state
		openSubmenus,
		
		// Filtered navigation items
		navigationItems,
		
		// Methods
		toggleCollapsed,
		isSubmenuOpen,
		toggleSubmenu,
		isItemActive,
		hasActiveChild,
		initializeOpenSubmenus
	};
}
