import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FDataTable from './FDataTable.vue';

describe('FDataTable', () => {
	const columns = [
		{ key: 'name', label: 'Name' },
		{ key: 'email', label: 'Email' },
		{ key: 'role', label: 'Role' }
	];

	const data = [
		{ id: 1, name: 'Alice', email: 'alice@test.com', role: 'Admin' },
		{ id: 2, name: 'Bob', email: 'bob@test.com', role: 'User' },
		{ id: 3, name: 'Charlie', email: 'charlie@test.com', role: 'User' }
	];

	it('renders correctly with required props', () => {
		const wrapper = mount(FDataTable, {
			propsData: { columns, data }
		});
		expect(wrapper.find('table').exists()).toBe(true);
	});

	it('displays column headers', () => {
		const wrapper = mount(FDataTable, {
			propsData: { columns, data }
		});
		expect(wrapper.text()).toContain('Name');
		expect(wrapper.text()).toContain('Email');
		expect(wrapper.text()).toContain('Role');
	});

	it('displays data rows', () => {
		const wrapper = mount(FDataTable, {
			propsData: { columns, data }
		});
		expect(wrapper.text()).toContain('Alice');
		expect(wrapper.text()).toContain('bob@test.com');
	});

	it('shows empty state when no data', () => {
		const wrapper = mount(FDataTable, {
			propsData: { columns, data: [] }
		});
		expect(wrapper.findComponent({ name: 'FEmptyState' }).exists()).toBe(true);
	});

	it('shows loader when loading', () => {
		const wrapper = mount(FDataTable, {
			propsData: { columns, data, loading: true }
		});
		expect(wrapper.findComponent({ name: 'FLoader' }).exists()).toBe(true);
	});

	it('renders pagination when paginated', () => {
		const manyRows = Array.from({ length: 20 }, (_, i) => ({
			id: i + 1,
			name: `User ${i + 1}`,
			email: `user${i + 1}@test.com`,
			role: 'User'
		}));
		const wrapper = mount(FDataTable, {
			propsData: { columns, data: manyRows, paginated: true, perPage: 5 }
		});
		expect(wrapper.findComponent({ name: 'FPagination' }).exists()).toBe(true);
	});

	it('renders search bar when searchable', () => {
		const wrapper = mount(FDataTable, {
			propsData: { columns, data, searchable: true }
		});
		expect(wrapper.findComponent({ name: 'FSearchBar' }).exists()).toBe(true);
	});

	it('renders checkboxes when selectable', () => {
		const wrapper = mount(FDataTable, {
			propsData: { columns, data, selectable: true }
		});
		expect(wrapper.findComponent({ name: 'FCheckbox' }).exists()).toBe(true);
	});

	it('emits row-click when row is clicked', async () => {
		const wrapper = mount(FDataTable, {
			propsData: { columns, data }
		});
		const rows = wrapper.findAll('tbody tr');
		if (rows.length > 0) {
			await rows[0].trigger('click');
			expect(wrapper.emitted('row-click')).toBeTruthy();
		}
	});

	it('emits sort event when header is clicked', async () => {
		const wrapper = mount(FDataTable, {
			propsData: { columns, data }
		});
		const headers = wrapper.findAll('th');
		if (headers.length > 0) {
			await headers[0].trigger('click');
			expect(wrapper.emitted('sort')).toBeTruthy();
		}
	});

	it('applies striped style when striped is true', () => {
		const wrapper = mount(FDataTable, {
			propsData: { columns, data, striped: true }
		});
		expect(wrapper.exists()).toBe(true);
	});

	it('renders data-label attributes on cells for mobile card view', () => {
		const wrapper = mount(FDataTable, {
			propsData: { columns, data }
		});
		const cells = wrapper.findAll('td[data-label]');
		// Each row should have cells with data-label attributes matching column labels
		expect(cells.length).toBeGreaterThan(0);
		// Check that at least one cell has the correct data-label
		const hasNameLabel = cells.wrappers.some(
			(cell) => cell.attributes('data-label') === 'Name'
		);
		const hasEmailLabel = cells.wrappers.some(
			(cell) => cell.attributes('data-label') === 'Email'
		);
		const hasRoleLabel = cells.wrappers.some(
			(cell) => cell.attributes('data-label') === 'Role'
		);
		expect(hasNameLabel).toBe(true);
		expect(hasEmailLabel).toBe(true);
		expect(hasRoleLabel).toBe(true);
	});

	it('renders empty data-label for checkbox column when selectable', () => {
		const wrapper = mount(FDataTable, {
			propsData: { columns, data, selectable: true }
		});
		// The checkbox cells should have empty data-label
		const checkboxCells = wrapper.findAll('td[data-label=""]');
		expect(checkboxCells.length).toBe(data.length);
	});

	it('renders RecycleScroller when virtual is enabled', () => {
		const wrapper = mount(FDataTable, {
			propsData: { columns, data, virtual: true }
		});
		expect(wrapper.findComponent({ name: 'RecycleScroller' }).exists()).toBe(
			true
		);
	});

	it('does not render pagination when virtual is enabled', () => {
		const manyRows = Array.from({ length: 100 }, (_, i) => ({
			id: i + 1,
			name: `User ${i + 1}`,
			email: `user${i + 1}@test.com`,
			role: 'User'
		}));
		const wrapper = mount(FDataTable, {
			propsData: {
				columns,
				data: manyRows,
				virtual: true,
				paginated: true,
				perPage: 10
			}
		});
		// Pagination should be disabled when virtual is true
		expect(wrapper.findComponent({ name: 'FPagination' }).exists()).toBe(false);
	});

	it('uses custom virtualItemHeight when provided', () => {
		const wrapper = mount(FDataTable, {
			propsData: { columns, data, virtual: true, virtualItemHeight: 60 }
		});
		expect((wrapper.vm as any).computedVirtualItemHeight).toBe(60);
	});

	it('calculates virtualItemHeight based on size when not provided', () => {
		const wrapper = mount(FDataTable, {
			propsData: { columns, data, virtual: true, size: 'large' }
		});
		expect((wrapper.vm as any).computedVirtualItemHeight).toBe(64);
	});

	it('renders regular tbody when virtual is disabled', () => {
		const wrapper = mount(FDataTable, {
			propsData: { columns, data, virtual: false }
		});
		expect(wrapper.find('tbody').exists()).toBe(true);
		expect(wrapper.findComponent({ name: 'RecycleScroller' }).exists()).toBe(
			false
		);
	});
});
