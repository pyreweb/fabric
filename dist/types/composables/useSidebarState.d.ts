import { Ref, ComputedRef } from 'vue';
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
    collapsed: Ref<boolean>;
    openSubmenus: Ref<string[]>;
    navigationItems: ComputedRef<NavigationItem[]>;
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
export declare function useSidebarState(options: SidebarStateOptions, emit: (event: string, ...args: any[]) => void): SidebarState;
