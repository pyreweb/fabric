import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FDataTable from './FDataTable.vue';

// Mock child components to simplify testing
const stubs = {
	FSearchBar: true,
	FPagination: true,
	FEmptyState: true,
	FCheckbox: true,
	FIcon: true,
	FLoader: true
};

describe('FDataTable', () => {
	const columns = [
		{ key: 'id', label: 'ID' },
		{ key: 'name', label: 'Name', sortable: true }
	];

	const data = [
		{ id: 1, name: 'Item 1' },
		{ id: 2, name: 'Item 2' },
		{ id: 3, name: 'Item 3' }
	];

	describe('row-click event', () => {
		it('emits row-click event when row is clicked', async () => {
			const wrapper = mount(FDataTable, {
				propsData: { columns, data },
				stubs
			});

			const rows = wrapper.findAll('tbody tr');
			await rows.at(0).trigger('click');

			expect(wrapper.emitted('row-click')).toBeTruthy();
			expect(wrapper.emitted('row-click')[0][0]).toEqual({ id: 1, name: 'Item 1' });
		});

		it('emits row-click with correct row data for different rows', async () => {
			const wrapper = mount(FDataTable, {
				propsData: { columns, data },
				stubs
			});

			const rows = wrapper.findAll('tbody tr');
			await rows.at(1).trigger('click');

			expect(wrapper.emitted('row-click')).toBeTruthy();
			expect(wrapper.emitted('row-click')[0][0]).toEqual({ id: 2, name: 'Item 2' });
		});
	});

	describe('sort event', () => {
		it('emits sort event when sortable column header is clicked', async () => {
			const wrapper = mount(FDataTable, {
				propsData: { columns, data },
				stubs
			});

			const headers = wrapper.findAll('thead th');
			// Click on the 'name' column header (sortable)
			await headers.at(1).trigger('click');

			expect(wrapper.emitted('sort')).toBeTruthy();
			expect(wrapper.emitted('sort')[0][0]).toEqual({ key: 'name', direction: 'asc' });
		});

		it('toggles sort direction when same column is clicked twice', async () => {
			const wrapper = mount(FDataTable, {
				propsData: { columns, data },
				stubs
			});

			const headers = wrapper.findAll('thead th');
			const nameHeader = headers.at(1);

			// First click - ascending
			await nameHeader.trigger('click');
			expect(wrapper.emitted('sort')[0][0]).toEqual({ key: 'name', direction: 'asc' });

			// Second click - descending
			await nameHeader.trigger('click');
			expect(wrapper.emitted('sort')[1][0]).toEqual({ key: 'name', direction: 'desc' });
		});

		it('resets to ascending when different column is clicked', async () => {
			const columnsWithMultipleSortable = [
				{ key: 'id', label: 'ID', sortable: true },
				{ key: 'name', label: 'Name', sortable: true }
			];

			const wrapper = mount(FDataTable, {
				propsData: { columns: columnsWithMultipleSortable, data },
				stubs
			});

			const headers = wrapper.findAll('thead th');
			
			// Click on 'id' column
			await headers.at(0).trigger('click');
			expect(wrapper.emitted('sort')[0][0]).toEqual({ key: 'id', direction: 'asc' });

			// Click on 'name' column - should reset to ascending
			await headers.at(1).trigger('click');
			expect(wrapper.emitted('sort')[1][0]).toEqual({ key: 'name', direction: 'asc' });
		});
	});
});
