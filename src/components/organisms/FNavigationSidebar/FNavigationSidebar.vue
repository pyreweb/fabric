<template>
	<div>
		<!-- Mobile overlay -->
		<div
			v-if="isMobile && mobileOpen"
			class="fixed inset-0 bg-black opacity-50 z-40"
			aria-hidden="true"
			data-testid="mobile-overlay"
			@click="closeMobile"
		/>
		<aside
			:class="sidebarClasses"
			:style="sidebarStyle"
			role="navigation"
			aria-label="Navigation principale"
		>
		<!-- Branding/Logo Section -->
		<div :class="brandingClasses">
			<slot name="branding">
				<div class="flex items-center gap-3">
					<slot name="logo" />
					<f-typography
						v-if="title && !collapsed"
						variant="h6"
						class="transition-opacity duration-[var(--transition-duration-base)] ease-[var(--transition-easing-standard)]"
					>
						{{ title }}
					</f-typography>
				</div>
			</slot>
			<f-button
				v-if="collapsible"
				variant="ghost"
				size="small"
				:aria-label="
					collapsed ? 'Développer la navigation' : 'Réduire la navigation'
				"
				@click="toggleCollapsed"
			>
				<f-icon
					:name="collapsed ? 'chevron-right' : 'chevron-left'"
					size="sm"
				/>
			</f-button>
		</div>

		<!-- Navigation Content -->
		<nav class="flex-1 overflow-y-auto py-2">
			<!-- All Navigation Items (including submenus) rendered in order -->
			<template v-for="(item, index) in navigationItems">
				<!-- Group Label -->
				<div
					v-if="item.type === 'group'"
					:key="`nav-group-${index}`"
					:class="groupLabelClasses"
				>
					<f-typography
						v-if="!collapsed"
						variant="overline"
						class="text-neutral-500"
					>
						{{ item.label }}
					</f-typography>
					<f-divider v-else margin="sm" />
				</div>

				<!-- Divider -->
				<f-divider
					v-else-if="item.type === 'divider'"
					:key="`nav-divider-${index}`"
					margin="sm"
				/>

				<!-- Submenu Item (with children) -->
				<div
					v-else-if="item.children && item.children.length > 0"
					:key="`nav-submenu-${index}`"
					class="nav-submenu"
				>
					<button
						:class="getNavItemClasses(item, true)"
						:aria-expanded="String(isSubmenuOpen(item))"
						@click="toggleSubmenu(item)"
					>
						<span class="flex items-center gap-3 flex-1 min-w-0">
							<f-icon
								v-if="item.icon"
								:name="item.icon"
								size="md"
								:class="getIconClasses(item)"
							/>
							<span
								v-if="!collapsed"
								class="truncate transition-opacity duration-[var(--transition-duration-base)] ease-[var(--transition-easing-standard)]"
							>
								{{ item.label }}
							</span>
						</span>
						<f-icon
							v-if="!collapsed"
							name="chevron-down"
							size="sm"
							:class="getChevronClasses(item)"
						/>
					</button>

					<!-- Submenu Children -->
					<div
						v-show="isSubmenuOpen(item) && !collapsed"
						class="submenu-content"
					>
						<component
							:is="getItemComponent(child)"
							v-for="(child, childIndex) in item.children"
							:key="`child-${index}-${childIndex}`"
							:href="child.href"
							:to="child.to"
							:class="getChildItemClasses(child)"
							@click="handleItemClick(child, $event)"
						>
							<span class="flex items-center gap-3 flex-1 min-w-0">
								<f-icon
									v-if="child.icon"
									:name="child.icon"
									size="sm"
									:class="getIconClasses(child)"
								/>
								<span class="truncate">{{ child.label }}</span>
							</span>
							<f-badge
								v-if="child.badge"
								:variant="child.badgeVariant || 'primary'"
								size="small"
							>
								{{ child.badge }}
							</f-badge>
						</component>
					</div>
				</div>

				<!-- Regular Navigation Item -->
				<component
					:is="getItemComponent(item)"
					v-else
					:key="`nav-item-${index}`"
					:href="item.href"
					:to="item.to"
					:class="getNavItemClasses(item)"
					@click="handleItemClick(item, $event)"
				>
					<span class="flex items-center gap-3 flex-1 min-w-0">
						<f-icon
							v-if="item.icon"
							:name="item.icon"
							size="md"
							:class="getIconClasses(item)"
						/>
						<span
							v-if="!collapsed"
							class="truncate transition-opacity duration-[var(--transition-duration-base)] ease-[var(--transition-easing-standard)]"
						>
							{{ item.label }}
						</span>
					</span>
					<f-badge
						v-if="item.badge && !collapsed"
						:variant="item.badgeVariant || 'primary'"
						size="small"
					>
						{{ item.badge }}
					</f-badge>
				</component>
			</template>

			<!-- Custom Navigation Slot -->
			<slot name="navigation" />
		</nav>

		<!-- Footer Section -->
		<div v-if="$slots.footer || showThemeToggle" :class="footerClasses">
			<slot name="footer">
				<div
					v-if="showThemeToggle"
					class="flex items-center"
					:class="collapsed ? 'justify-center' : 'justify-between'"
				>
					<f-typography v-if="!collapsed" variant="caption">
						{{ themeToggleLabel }}
					</f-typography>
					<f-toggle
						:value="isDarkMode"
						:aria-label="themeToggleLabel"
						@input="handleThemeToggle"
					/>
				</div>
			</slot>
		</div>
		</aside>
	</div>
</template>

<script>
import FTypography from '../../atoms/FTypography/FTypography.vue';
import FButton from '../../atoms/FButton/FButton.vue';
import FIcon from '../../atoms/FIcon/FIcon.vue';
import FDivider from '../../atoms/FDivider/FDivider.vue';
import FToggle from '../../atoms/FToggle/FToggle.vue';
import FBadge from '../../atoms/FBadge/FBadge.vue';

export default {
	name: 'FNavigationSidebar',
	components: {
		FTypography,
		FButton,
		FIcon,
		FDivider,
		FToggle,
		FBadge
	},
	props: {
		/**
		 * Controls the collapsed state of the sidebar.
		 * Use v-model:collapsed for two-way binding.
		 */
		collapsed: {
			type: Boolean,
			default: false
		},
		/**
		 * Title displayed next to the logo when expanded
		 */
		title: {
			type: String,
			default: ''
		},
		/**
		 * Width of the sidebar when expanded
		 */
		width: {
			type: String,
			default: '256px'
		},
		/**
		 * Width of the sidebar when collapsed
		 */
		collapsedWidth: {
			type: String,
			default: '64px'
		},
		/**
		 * Allow collapsing/expanding the sidebar
		 */
		collapsible: {
			type: Boolean,
			default: true
		},
		/**
		 * Navigation items configuration
		 * Each item: { id, label, icon, href, to, children, badge, badgeVariant, disabled, type }
		 * type: 'link' (default) | 'group' | 'divider'
		 */
		items: {
			type: Array,
			default: () => []
		},
		/**
		 * Current active route path for determining active state
		 */
		activeRoute: {
			type: String,
			default: ''
		},
		/**
		 * Show theme toggle in footer
		 */
		showThemeToggle: {
			type: Boolean,
			default: false
		},
		/**
		 * Current dark mode state
		 */
		isDarkMode: {
			type: Boolean,
			default: false
		},
		/**
		 * Label for the theme toggle
		 */
		themeToggleLabel: {
			type: String,
			default: 'Mode sombre'
		},
		/**
		 * Position of the sidebar
		 */
		position: {
			type: String,
			default: 'left',
			validator: (value) => ['left', 'right'].includes(value)
		},
		/**
		 * Controls the mobile drawer visibility.
		 * Use v-model:mobileOpen for two-way binding.
		 */
		mobileOpen: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			openSubmenus: [],
			isMobile: false
		};
	},
	computed: {
		/**
		 * Filtered navigation items (excluding invalid entries)
		 */
		navigationItems() {
			return this.items.filter(
				(item) => item && (item.label || item.type === 'divider')
			);
		},
		/**
		 * Main sidebar container classes
		 */
		sidebarClasses() {
			if (this.isMobile) {
				const baseClasses =
					'fixed inset-y-0 z-50 flex flex-col bg-white border-neutral-200';
				const positionClasses =
					this.position === 'left'
						? 'left-0 border-r'
						: 'right-0 border-l';
				const transitionClasses =
					'transition-transform duration-[var(--transition-duration-slow)] ease-[var(--transition-easing-standard)]';
				const visibilityClasses = this.mobileOpen
					? 'translate-x-0'
					: this.position === 'left'
						? '-translate-x-full'
						: 'translate-x-full';

				return [
					baseClasses,
					positionClasses,
					transitionClasses,
					visibilityClasses
				]
					.filter(Boolean)
					.join(' ');
			}

			const baseClasses = 'flex flex-col h-full bg-white border-neutral-200';
			const transitionClasses =
				'transition-all duration-[var(--transition-duration-slow)] ease-[var(--transition-easing-standard)]';
			const borderClasses = this.position === 'left' ? 'border-r' : 'border-l';

			return [baseClasses, transitionClasses, borderClasses]
				.filter(Boolean)
				.join(' ');
		},
		/**
		 * Sidebar inline styles
		 */
		sidebarStyle() {
			if (this.isMobile) {
				return { width: this.width };
			}
			return {
				width: this.collapsed ? this.collapsedWidth : this.width
			};
		},
		/**
		 * Branding section classes
		 */
		brandingClasses() {
			const baseClasses = 'flex items-center border-b border-neutral-200';
			const transitionClasses =
				'transition-all duration-[var(--transition-duration-base)] ease-[var(--transition-easing-standard)]';
			const paddingClasses = this.collapsed
				? 'justify-center p-3'
				: 'justify-between p-4';

			return [baseClasses, transitionClasses, paddingClasses]
				.filter(Boolean)
				.join(' ');
		},
		/**
		 * Group label classes
		 */
		groupLabelClasses() {
			return this.collapsed ? 'px-2 py-1' : 'px-4 py-2 mt-2';
		},
		/**
		 * Footer section classes
		 */
		footerClasses() {
			const baseClasses = 'border-t border-neutral-200';
			const transitionClasses =
				'transition-all duration-[var(--transition-duration-base)] ease-[var(--transition-easing-standard)]';
			const paddingClasses = this.collapsed ? 'p-2' : 'p-4';

			return [baseClasses, transitionClasses, paddingClasses]
				.filter(Boolean)
				.join(' ');
		}
	},
	watch: {
		/**
		 * Close submenus when sidebar is collapsed
		 */
		collapsed(newValue) {
			if (newValue) {
				this.openSubmenus = [];
			}
		}
	},
	created() {
		this.initializeOpenSubmenus();
	},
	mounted() {
		this.checkMobile();
		window.addEventListener('resize', this.checkMobile);
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.checkMobile);
	},
	methods: {
		/**
		 * Initialize open submenus based on active route
		 */
		initializeOpenSubmenus() {
			if (!this.activeRoute) return;

			this.items.forEach((item) => {
				if (item.children && item.children.length > 0) {
					const hasActiveChild = item.children.some((child) =>
						this.isItemActive(child)
					);
					if (
						hasActiveChild &&
						!this.openSubmenus.includes(item.id || item.label)
					) {
						this.openSubmenus.push(item.id || item.label);
					}
				}
			});
		},
		/**
		 * Toggle sidebar collapsed state
		 */
		toggleCollapsed() {
			this.$emit('update:collapsed', !this.collapsed);
			this.$emit('toggle', !this.collapsed);
		},
		/**
		 * Check if a submenu is open
		 */
		isSubmenuOpen(item) {
			const key = item.id || item.label;
			return this.openSubmenus.includes(key);
		},
		/**
		 * Toggle submenu open state
		 */
		toggleSubmenu(item) {
			const key = item.id || item.label;
			const index = this.openSubmenus.indexOf(key);

			if (index === -1) {
				this.openSubmenus.push(key);
			} else {
				this.openSubmenus.splice(index, 1);
			}

			this.$emit('submenu-toggle', { item, open: index === -1 });
		},
		/**
		 * Check if an item is currently active
		 */
		isItemActive(item) {
			if (!this.activeRoute) return false;

			const itemPath = item.to || item.href;
			if (!itemPath) return false;

			// Exact match
			if (this.activeRoute === itemPath) return true;

			// For nested routes: check if active route starts with item path
			// followed by '/' or end of string to avoid partial matches
			// e.g., '/users' should not match '/user-settings'
			if (itemPath !== '/') {
				return (
					this.activeRoute.startsWith(itemPath + '/') ||
					this.activeRoute === itemPath
				);
			}

			return false;
		},
		/**
		 * Check if a parent item has an active child
		 */
		hasActiveChild(item) {
			if (!item.children || item.children.length === 0) return false;
			return item.children.some((child) => this.isItemActive(child));
		},
		/**
		 * Get the component to use for navigation items
		 */
		getItemComponent(item) {
			if (item.to) return 'router-link';
			if (item.href) return 'a';
			return 'button';
		},
		/**
		 * Get classes for navigation items
		 */
		getNavItemClasses(item, isSubmenuTrigger = false) {
			const isActive = this.isItemActive(item) || this.hasActiveChild(item);
			const isDisabled = item.disabled;

			const baseClasses = 'flex items-center w-full gap-3 text-sm font-medium';
			const transitionClasses =
				'transition-colors duration-[var(--transition-duration-base)] ease-[var(--transition-easing-standard)]';
			const paddingClasses = this.collapsed
				? 'justify-center px-3 py-3'
				: 'px-4 py-3';
			const hoverClasses = !isDisabled ? 'hover:bg-neutral-50' : '';
			const activeClasses = isActive
				? 'bg-primary-50 text-primary-600'
				: 'text-neutral-700';
			const disabledClasses = isDisabled
				? 'opacity-50 cursor-not-allowed'
				: 'cursor-pointer';
			const focusClasses =
				'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:ring-inset';

			return [
				baseClasses,
				transitionClasses,
				paddingClasses,
				hoverClasses,
				activeClasses,
				disabledClasses,
				focusClasses
			]
				.filter(Boolean)
				.join(' ');
		},
		/**
		 * Get classes for child items in submenus
		 */
		getChildItemClasses(item) {
			const isActive = this.isItemActive(item);
			const isDisabled = item.disabled;

			const baseClasses =
				'flex items-center w-full gap-3 pl-11 pr-4 py-2 text-sm';
			const transitionClasses =
				'transition-colors duration-[var(--transition-duration-base)] ease-[var(--transition-easing-standard)]';
			const hoverClasses = !isDisabled ? 'hover:bg-neutral-50' : '';
			const activeClasses = isActive
				? 'bg-primary-50 text-primary-600 font-medium'
				: 'text-neutral-600';
			const disabledClasses = isDisabled
				? 'opacity-50 cursor-not-allowed'
				: 'cursor-pointer';
			const focusClasses =
				'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:ring-inset';

			return [
				baseClasses,
				transitionClasses,
				hoverClasses,
				activeClasses,
				disabledClasses,
				focusClasses
			]
				.filter(Boolean)
				.join(' ');
		},
		/**
		 * Get icon classes based on active state
		 */
		getIconClasses(item) {
			const isActive = this.isItemActive(item) || this.hasActiveChild(item);
			return isActive ? 'text-primary-600' : 'text-neutral-400';
		},
		/**
		 * Get chevron classes for submenu indicators
		 */
		getChevronClasses(item) {
			const isOpen = this.isSubmenuOpen(item);
			const baseClasses = 'text-neutral-400';
			const transitionClasses =
				'transition-transform duration-[var(--transition-duration-base)] ease-[var(--transition-easing-standard)]';
			const rotateClasses = isOpen ? 'rotate-180' : 'rotate-0';

			return `${baseClasses} ${transitionClasses} ${rotateClasses}`;
		},
		/**
		 * Handle navigation item click
		 */
		handleItemClick(item, event) {
			if (item.disabled) {
				event.preventDefault();
				return;
			}

			this.$emit('navigate', item);

			// For items without href/to (custom actions)
			if (!item.href && !item.to) {
				event.preventDefault();
				this.$emit('item-click', item);
			}
		},
		/**
		 * Handle theme toggle
		 */
		handleThemeToggle(value) {
			this.$emit('update:isDarkMode', value);
			this.$emit('theme-change', value);
		},
		/**
		 * Check if the viewport is mobile-sized (below md breakpoint: 768px)
		 */
		checkMobile() {
			this.isMobile = window.innerWidth < 768;
		},
		/**
		 * Close the mobile drawer
		 */
		closeMobile() {
			this.$emit('update:mobileOpen', false);
			this.$emit('close');
		}
	}
};
</script>
