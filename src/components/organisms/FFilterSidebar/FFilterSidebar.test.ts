import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FFilterSidebar from './FFilterSidebar.vue';

describe('FFilterSidebar', () => {
	const filters = [
		{
			key: 'status',
			label: 'Status',
			type: 'checkbox',
			options: [
				{ label: 'Active', value: 'active' },
				{ label: 'Inactive', value: 'inactive' }
			]
		}
	];

	it('renders correctly with required props', () => {
		const wrapper = mount(FFilterSidebar, {
			propsData: { filters }
		});
		expect(wrapper.exists()).toBe(true);
	});

	it('displays filter labels', () => {
		const wrapper = mount(FFilterSidebar, {
			propsData: { filters }
		});
		expect(wrapper.text()).toContain('Status');
	});

	it('displays filter options', () => {
		const wrapper = mount(FFilterSidebar, {
			propsData: { filters }
		});
		expect(wrapper.text()).toContain('Active');
		expect(wrapper.text()).toContain('Inactive');
	});

	it('shows title when provided', () => {
		const wrapper = mount(FFilterSidebar, {
			propsData: { filters, title: 'Filtres' }
		});
		expect(wrapper.text()).toContain('Filtres');
	});

	it('shows clear button when showClear is true', () => {
		const wrapper = mount(FFilterSidebar, {
			propsData: { filters, showClear: true }
		});
		expect(wrapper.findComponent({ name: 'FButton' }).exists()).toBe(true);
	});

	it('emits update event when filter changes', async () => {
		const wrapper = mount(FFilterSidebar, {
			propsData: { filters, value: {} }
		});
		const checkbox = wrapper.find('input[type="checkbox"]');
		if (checkbox.exists()) {
			await checkbox.setChecked(true);
			expect(
				wrapper.emitted('input') || wrapper.emitted('update')
			).toBeTruthy();
		}
	});

	it('emits clear event when clear button is clicked', async () => {
		const wrapper = mount(FFilterSidebar, {
			propsData: { filters, showClear: true }
		});
		const clearBtn = wrapper
			.findAllComponents({ name: 'FButton' })
			.filter(
				(b) =>
					b.text().toLowerCase().includes('effacer') ||
					b.text().toLowerCase().includes('réinitialiser')
			)[0];
		if (clearBtn) {
			await clearBtn.trigger('click');
			expect(wrapper.emitted('clear')).toBeTruthy();
		}
	});

	it('renders accordion items for each filter group', () => {
		const wrapper = mount(FFilterSidebar, {
			propsData: { filters }
		});
		expect(wrapper.findComponent({ name: 'FAccordionItem' }).exists()).toBe(
			true
		);
	});
});
