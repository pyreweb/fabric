import { describe, it, expect, vi } from 'vitest';
import { useSidebarState } from './useSidebarState';

describe('useSidebarState', () => {
	const items = [
		{ id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: 'home' },
		{ id: 'projects', label: 'Projects', href: '/projects', icon: 'folder' },
		{ id: 'settings', label: 'Settings', href: '/settings', icon: 'cog' }
	];

	it('initializes with default state', () => {
		const emit = vi.fn();
		const state = useSidebarState({ items }, emit);

		expect(state.collapsed.value).toBe(false);
		expect(state.openSubmenus.value).toEqual([]);
	});

	it('initializes with custom collapsed state', () => {
		const emit = vi.fn();
		const state = useSidebarState({ items, initialCollapsed: true }, emit);

		expect(state.collapsed.value).toBe(true);
	});

	describe('navigationItems', () => {
		it('filters out invalid items', () => {
			const emit = vi.fn();
			const itemsWithInvalid = [
				{ id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
				null,
				undefined,
				{ id: 'projects', label: 'Projects', href: '/projects' }
			];
			const state = useSidebarState({ items: itemsWithInvalid as any }, emit);

			expect(state.navigationItems.value.length).toBe(2);
		});

		it('includes divider items without labels', () => {
			const emit = vi.fn();
			const itemsWithDivider = [
				{ id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
				{ type: 'divider' as const },
				{ id: 'projects', label: 'Projects', href: '/projects' }
			];
			const state = useSidebarState({ items: itemsWithDivider }, emit);

			expect(state.navigationItems.value.length).toBe(3);
		});
	});

	describe('isItemActive', () => {
		it('detects exact route match', () => {
			const emit = vi.fn();
			const state = useSidebarState(
				{ items, activeRoute: '/dashboard' },
				emit
			);

			expect(state.isItemActive(items[0])).toBe(true);
			expect(state.isItemActive(items[1])).toBe(false);
		});

		it('detects nested route match', () => {
			const emit = vi.fn();
			const state = useSidebarState(
				{ items, activeRoute: '/projects/123' },
				emit
			);

			expect(state.isItemActive(items[1])).toBe(true);
		});

		it('does not match partial route names', () => {
			const emit = vi.fn();
			const itemsWithSimilarRoutes = [
				{ id: 'user', label: 'User', href: '/user' },
				{ id: 'users', label: 'Users', href: '/users' }
			];
			const state = useSidebarState(
				{ items: itemsWithSimilarRoutes, activeRoute: '/users' },
				emit
			);

			expect(state.isItemActive(itemsWithSimilarRoutes[0])).toBe(false);
			expect(state.isItemActive(itemsWithSimilarRoutes[1])).toBe(true);
		});

		it('handles root path specially', () => {
			const emit = vi.fn();
			const itemsWithRoot = [
				{ id: 'home', label: 'Home', href: '/' },
				{ id: 'dashboard', label: 'Dashboard', href: '/dashboard' }
			];
			const state = useSidebarState(
				{ items: itemsWithRoot, activeRoute: '/dashboard' },
				emit
			);

			expect(state.isItemActive(itemsWithRoot[0])).toBe(false);
		});

		it('returns false when no active route is set', () => {
			const emit = vi.fn();
			const state = useSidebarState({ items }, emit);

			expect(state.isItemActive(items[0])).toBe(false);
		});

		it('works with router-link "to" property', () => {
			const emit = vi.fn();
			const itemsWithTo = [
				{ id: 'dashboard', label: 'Dashboard', to: '/dashboard' }
			];
			const state = useSidebarState(
				{ items: itemsWithTo, activeRoute: '/dashboard' },
				emit
			);

			expect(state.isItemActive(itemsWithTo[0])).toBe(true);
		});
	});

	describe('hasActiveChild', () => {
		const nestedItems = [
			{
				id: 'section',
				label: 'Section',
				icon: 'folder',
				children: [
					{ id: 'child1', label: 'Child 1', href: '/section/child1' },
					{ id: 'child2', label: 'Child 2', href: '/section/child2' }
				]
			}
		];

		it('detects active child', () => {
			const emit = vi.fn();
			const state = useSidebarState(
				{ items: nestedItems, activeRoute: '/section/child1' },
				emit
			);

			expect(state.hasActiveChild(nestedItems[0])).toBe(true);
		});

		it('returns false when no child is active', () => {
			const emit = vi.fn();
			const state = useSidebarState(
				{ items: nestedItems, activeRoute: '/other' },
				emit
			);

			expect(state.hasActiveChild(nestedItems[0])).toBe(false);
		});

		it('returns false when item has no children', () => {
			const emit = vi.fn();
			const state = useSidebarState({ items }, emit);

			expect(state.hasActiveChild(items[0])).toBe(false);
		});
	});

	describe('submenu management', () => {
		const nestedItems = [
			{
				id: 'section',
				label: 'Section',
				children: [
					{ id: 'child1', label: 'Child 1', href: '/child1' }
				]
			}
		];

		it('checks if submenu is open', () => {
			const emit = vi.fn();
			const state = useSidebarState({ items: nestedItems }, emit);

			expect(state.isSubmenuOpen(nestedItems[0])).toBe(false);

			state.openSubmenus.value = ['section'];
			expect(state.isSubmenuOpen(nestedItems[0])).toBe(true);
		});

		it('toggles submenu open', () => {
			const emit = vi.fn();
			const state = useSidebarState({ items: nestedItems }, emit);

			state.toggleSubmenu(nestedItems[0]);
			expect(state.isSubmenuOpen(nestedItems[0])).toBe(true);
			expect(emit).toHaveBeenCalledWith('submenu-toggle', {
				item: nestedItems[0],
				open: true
			});
		});

		it('toggles submenu closed', () => {
			const emit = vi.fn();
			const state = useSidebarState({ items: nestedItems }, emit);

			state.openSubmenus.value = ['section'];
			state.toggleSubmenu(nestedItems[0]);
			expect(state.isSubmenuOpen(nestedItems[0])).toBe(false);
		});

		it('uses label as key when id is not present', () => {
			const emit = vi.fn();
			const itemsWithoutId = [
				{
					label: 'Section',
					children: [{ label: 'Child', href: '/child' }]
				}
			];
			const state = useSidebarState({ items: itemsWithoutId }, emit);

			state.toggleSubmenu(itemsWithoutId[0]);
			expect(state.openSubmenus.value).toContain('Section');
		});
	});

	describe('initializeOpenSubmenus', () => {
		const nestedItems = [
			{
				id: 'section1',
				label: 'Section 1',
				children: [
					{ id: 'child1', label: 'Child 1', href: '/section1/child1' }
				]
			},
			{
				id: 'section2',
				label: 'Section 2',
				children: [
					{ id: 'child2', label: 'Child 2', href: '/section2/child2' }
				]
			}
		];

		it('opens parent submenu when child is active', () => {
			const emit = vi.fn();
			const state = useSidebarState(
				{ items: nestedItems, activeRoute: '/section1/child1' },
				emit
			);

			state.initializeOpenSubmenus();
			expect(state.openSubmenus.value).toContain('section1');
			expect(state.openSubmenus.value).not.toContain('section2');
		});

		it('does nothing when no active route', () => {
			const emit = vi.fn();
			const state = useSidebarState({ items: nestedItems }, emit);

			state.initializeOpenSubmenus();
			expect(state.openSubmenus.value).toEqual([]);
		});

		it('does not duplicate entries', () => {
			const emit = vi.fn();
			const state = useSidebarState(
				{ items: nestedItems, activeRoute: '/section1/child1' },
				emit
			);

			state.initializeOpenSubmenus();
			state.initializeOpenSubmenus();
			expect(state.openSubmenus.value.filter(k => k === 'section1').length).toBe(1);
		});
	});

	describe('toggleCollapsed', () => {
		it('toggles collapsed state', () => {
			const emit = vi.fn();
			const state = useSidebarState({ items }, emit);

			expect(state.collapsed.value).toBe(false);
			state.toggleCollapsed();
			expect(state.collapsed.value).toBe(true);
		});

		it('emits events on toggle', () => {
			const emit = vi.fn();
			const state = useSidebarState({ items }, emit);

			state.toggleCollapsed();
			expect(emit).toHaveBeenCalledWith('update:collapsed', true);
			expect(emit).toHaveBeenCalledWith('toggle', true);
		});

		it('closes submenus when collapsed', async () => {
			const emit = vi.fn();
			const nestedItems = [
				{
					id: 'section',
					label: 'Section',
					children: [{ id: 'child', label: 'Child', href: '/child' }]
				}
			];
			const state = useSidebarState({ items: nestedItems }, emit);

			state.toggleSubmenu(nestedItems[0]);
			expect(state.openSubmenus.value.length).toBe(1);

			state.toggleCollapsed();
			// Wait for watcher to trigger
			await new Promise(resolve => setTimeout(resolve, 0));
			expect(state.openSubmenus.value).toEqual([]);
		});
	});
});
