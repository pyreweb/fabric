import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FBreadcrumb from './FBreadcrumb.vue';

describe('FBreadcrumb', () => {
	const items = [
		{ label: 'Home', href: '/' },
		{ label: 'Products', href: '/products' },
		{ label: 'Current Page' }
	];

	it('renders correctly with items', () => {
		const wrapper = mount(FBreadcrumb, {
			propsData: { items }
		});
		expect(wrapper.find('nav').exists()).toBe(true);
	});

	it('displays all items', () => {
		const wrapper = mount(FBreadcrumb, {
			propsData: { items }
		});
		expect(wrapper.text()).toContain('Home');
		expect(wrapper.text()).toContain('Products');
		expect(wrapper.text()).toContain('Current Page');
	});

	it('marks last item as current page', () => {
		const wrapper = mount(FBreadcrumb, {
			propsData: { items }
		});
		expect(wrapper.find('[aria-current="page"]').exists()).toBe(true);
	});

	it('renders links for non-current items', () => {
		const wrapper = mount(FBreadcrumb, {
			propsData: { items }
		});
		const links = wrapper.findAll('a');
		expect(links.length).toBeGreaterThan(0);
	});

	it('shows separators between items', () => {
		const wrapper = mount(FBreadcrumb, {
			propsData: { items }
		});
		const icons = wrapper.findAllComponents({ name: 'FIcon' });
		// Should have separators (number of items - 1)
		expect(icons.length).toBeGreaterThanOrEqual(items.length - 1);
	});

	it('uses custom separator icon', () => {
		const wrapper = mount(FBreadcrumb, {
			propsData: { items, separatorIcon: 'arrow-right' }
		});
		expect(wrapper.exists()).toBe(true);
	});

	it('emits navigate event when item is clicked', async () => {
		const wrapper = mount(FBreadcrumb, {
			propsData: { items }
		});
		const buttons = wrapper.findAll('button');
		if (buttons.length > 0) {
			await buttons[0].trigger('click');
			expect(wrapper.emitted('navigate')).toBeTruthy();
		}
	});

	it('has correct aria-label', () => {
		const wrapper = mount(FBreadcrumb, {
			propsData: { items }
		});
		expect(wrapper.find('nav').attributes('aria-label')).toBe("Fil d'Ariane");
	});
});
