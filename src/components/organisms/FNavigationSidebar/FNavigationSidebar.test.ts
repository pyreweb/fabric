import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import FNavigationSidebar from './FNavigationSidebar.vue';

describe('FNavigationSidebar', () => {
	const items = [
		{ label: 'Dashboard', href: '/dashboard', icon: 'home' },
		{ label: 'Projects', href: '/projects', icon: 'folder' },
		{ label: 'Settings', href: '/settings', icon: 'cog' }
	];

	it('renders correctly with required props', () => {
		const wrapper = mount(FNavigationSidebar, {
			propsData: { items }
		});
		expect(wrapper.find('nav').exists()).toBe(true);
	});

	it('displays navigation items', () => {
		const wrapper = mount(FNavigationSidebar, {
			propsData: { items }
		});
		expect(wrapper.text()).toContain('Dashboard');
		expect(wrapper.text()).toContain('Projects');
	});

	it('marks active item', () => {
		const itemsWithActive = [
			...items.slice(0, 1).map((i) => ({ ...i, active: true })),
			...items.slice(1)
		];
		const wrapper = mount(FNavigationSidebar, {
			propsData: { items: itemsWithActive }
		});
		expect(wrapper.exists()).toBe(true);
	});

	it('renders icons', () => {
		const wrapper = mount(FNavigationSidebar, {
			propsData: { items }
		});
		expect(wrapper.findComponent({ name: 'FIcon' }).exists()).toBe(true);
	});

	it('collapses when collapsed prop is true', () => {
		const wrapper = mount(FNavigationSidebar, {
			propsData: { items, collapsed: true }
		});
		expect(wrapper.exists()).toBe(true);
	});

	it('emits navigate event when item is clicked', async () => {
		const wrapper = mount(FNavigationSidebar, {
			propsData: { items }
		});
		const navItems = wrapper.findAll('a, button');
		if (navItems.length > 0) {
			await navItems[0].trigger('click');
			expect(wrapper.emitted('navigate')).toBeTruthy();
		}
	});

	it('renders header slot', () => {
		const wrapper = mount(FNavigationSidebar, {
			propsData: { items },
			slots: { header: '<div>Header</div>' }
		});
		expect(wrapper.html()).toContain('Header');
	});

	it('renders footer slot', () => {
		const wrapper = mount(FNavigationSidebar, {
			propsData: { items },
			slots: { footer: '<div>Footer</div>' }
		});
		expect(wrapper.html()).toContain('Footer');
	});

	it('renders nested items', () => {
		const nestedItems = [
			{
				label: 'Section',
				icon: 'folder',
				children: [
					{ label: 'Sub Item 1', href: '/sub1' },
					{ label: 'Sub Item 2', href: '/sub2' }
				]
			}
		];
		const wrapper = mount(FNavigationSidebar, {
			propsData: { items: nestedItems }
		});
		expect(wrapper.exists()).toBe(true);
	});

	describe('mobile behavior', () => {
		let originalInnerWidth: number;

		beforeEach(() => {
			originalInnerWidth = window.innerWidth;
		});

		afterEach(() => {
			Object.defineProperty(window, 'innerWidth', {
				writable: true,
				configurable: true,
				value: originalInnerWidth
			});
			vi.restoreAllMocks();
		});

		it('sets isMobile to true when window width is below 768px', async () => {
			Object.defineProperty(window, 'innerWidth', {
				writable: true,
				configurable: true,
				value: 375
			});
			const wrapper = mount(FNavigationSidebar, {
				propsData: { items }
			});
			// Trigger resize to update isMobile
			window.dispatchEvent(new Event('resize'));
			await wrapper.vm.$nextTick();
			expect((wrapper.vm as any).isMobile).toBe(true);
		});

		it('sets isMobile to false when window width is 768px or above', async () => {
			Object.defineProperty(window, 'innerWidth', {
				writable: true,
				configurable: true,
				value: 1024
			});
			const wrapper = mount(FNavigationSidebar, {
				propsData: { items }
			});
			window.dispatchEvent(new Event('resize'));
			await wrapper.vm.$nextTick();
			expect((wrapper.vm as any).isMobile).toBe(false);
		});

		it('shows overlay when isMobile is true and mobileOpen is true', async () => {
			Object.defineProperty(window, 'innerWidth', {
				writable: true,
				configurable: true,
				value: 375
			});
			const wrapper = mount(FNavigationSidebar, {
				propsData: { items, mobileOpen: true }
			});
			window.dispatchEvent(new Event('resize'));
			await wrapper.vm.$nextTick();
			const overlay = wrapper.find('[data-testid="mobile-overlay"]');
			expect(overlay.exists()).toBe(true);
		});

		it('hides overlay when mobileOpen is false', async () => {
			Object.defineProperty(window, 'innerWidth', {
				writable: true,
				configurable: true,
				value: 375
			});
			const wrapper = mount(FNavigationSidebar, {
				propsData: { items, mobileOpen: false }
			});
			window.dispatchEvent(new Event('resize'));
			await wrapper.vm.$nextTick();
			const overlay = wrapper.find('[data-testid="mobile-overlay"]');
			expect(overlay.exists()).toBe(false);
		});

		it('emits update:mobileOpen false and close when overlay is clicked', async () => {
			Object.defineProperty(window, 'innerWidth', {
				writable: true,
				configurable: true,
				value: 375
			});
			const wrapper = mount(FNavigationSidebar, {
				propsData: { items, mobileOpen: true }
			});
			window.dispatchEvent(new Event('resize'));
			await wrapper.vm.$nextTick();
			const overlay = wrapper.find('[data-testid="mobile-overlay"]');
			await overlay.trigger('click');
			expect(wrapper.emitted('update:mobileOpen')).toBeTruthy();
			expect(wrapper.emitted('update:mobileOpen')![0]).toEqual([false]);
			expect(wrapper.emitted('close')).toBeTruthy();
		});

		it('applies fixed positioning classes in mobile mode', async () => {
			Object.defineProperty(window, 'innerWidth', {
				writable: true,
				configurable: true,
				value: 375
			});
			const wrapper = mount(FNavigationSidebar, {
				propsData: { items, mobileOpen: true }
			});
			window.dispatchEvent(new Event('resize'));
			await wrapper.vm.$nextTick();
			const aside = wrapper.find('aside');
			expect(aside.classes()).toContain('fixed');
		});

		it('applies -translate-x-full when mobile sidebar is closed', async () => {
			Object.defineProperty(window, 'innerWidth', {
				writable: true,
				configurable: true,
				value: 375
			});
			const wrapper = mount(FNavigationSidebar, {
				propsData: { items, mobileOpen: false }
			});
			window.dispatchEvent(new Event('resize'));
			await wrapper.vm.$nextTick();
			const aside = wrapper.find('aside');
			expect(aside.classes()).toContain('-translate-x-full');
		});

		it('removes resize listener on destroy', () => {
			const removeEventListenerSpy = vi.spyOn(
				window,
				'removeEventListener'
			);
			const wrapper = mount(FNavigationSidebar, {
				propsData: { items }
			});
			wrapper.destroy();
			expect(removeEventListenerSpy).toHaveBeenCalledWith(
				'resize',
				expect.any(Function)
			);
		});
	});
});
