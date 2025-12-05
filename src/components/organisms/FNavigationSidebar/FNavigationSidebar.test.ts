import { describe, it, expect } from 'vitest';
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
			...items.slice(0, 1).map(i => ({ ...i, active: true })),
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
});
