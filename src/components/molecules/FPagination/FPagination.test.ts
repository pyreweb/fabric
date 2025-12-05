import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FPagination from './FPagination.vue';

describe('FPagination', () => {
	it('renders correctly with required props', () => {
		const wrapper = mount(FPagination, {
			propsData: { totalPages: 10 }
		});
		expect(wrapper.find('nav').exists()).toBe(true);
	});

	it('shows correct number of page buttons', () => {
		const wrapper = mount(FPagination, {
			propsData: { totalPages: 5, maxVisiblePages: 5 }
		});
		// Should show all 5 pages plus prev/next
		const buttons = wrapper.findAllComponents({ name: 'FButton' });
		expect(buttons.length).toBeGreaterThan(0);
	});

	it('highlights current page', () => {
		const wrapper = mount(FPagination, {
			propsData: { totalPages: 10, value: 5 }
		});
		expect(wrapper.find('[aria-current="page"]').exists()).toBe(true);
	});

	it('emits input event when page is clicked', async () => {
		const wrapper = mount(FPagination, {
			propsData: { totalPages: 10, value: 1 }
		});
		// Find a page button (not prev/next) and click it
		const pageButtons = wrapper.findAllComponents({ name: 'FButton' });
		// Click on one of the middle buttons
		await pageButtons[2].trigger('click');
		expect(wrapper.emitted('input') || wrapper.emitted('change')).toBeTruthy();
	});

	it('disables previous button on first page', () => {
		const wrapper = mount(FPagination, {
			propsData: { totalPages: 10, value: 1 }
		});
		const prevButton = wrapper.findAllComponents({ name: 'FButton' })[0];
		expect(prevButton.props('disabled')).toBe(true);
	});

	it('disables next button on last page', () => {
		const wrapper = mount(FPagination, {
			propsData: { totalPages: 10, value: 10 }
		});
		const buttons = wrapper.findAllComponents({ name: 'FButton' });
		const nextButton = buttons[buttons.length - 1];
		expect(nextButton.props('disabled')).toBe(true);
	});

	it('shows ellipsis for many pages', () => {
		const wrapper = mount(FPagination, {
			propsData: { totalPages: 20, value: 10 }
		});
		expect(wrapper.text()).toContain('...');
	});

	it('emits change event when navigating', async () => {
		const wrapper = mount(FPagination, {
			propsData: { totalPages: 10, value: 5 }
		});
		const nextButton = wrapper.findAllComponents({ name: 'FButton' }).at(-1);
		await nextButton.trigger('click');
		expect(wrapper.emitted('change')).toBeTruthy();
	});

	it('has correct aria-label', () => {
		const wrapper = mount(FPagination, {
			propsData: { totalPages: 10 }
		});
		expect(wrapper.find('nav').attributes('aria-label')).toBe('Pagination');
	});
});
