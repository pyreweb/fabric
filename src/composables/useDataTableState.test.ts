import { describe, it, expect, vi } from 'vitest';
import { effectScope } from 'vue';
import { useDataTableState } from './useDataTableState';

describe('useDataTableState', () => {
	const columns = [
		{ key: 'name', label: 'Name' },
		{ key: 'email', label: 'Email' },
		{ key: 'role', label: 'Role' }
	];

	const data = [
		{ id: 1, name: 'Alice', email: 'alice@test.com', role: 'Admin' },
		{ id: 2, name: 'Bob', email: 'bob@test.com', role: 'User' },
		{ id: 3, name: 'Charlie', email: 'charlie@test.com', role: 'User' },
		{ id: 4, name: 'David', email: 'david@test.com', role: 'Manager' }
	];

	it('initializes with default state', () => {
		const emit = vi.fn();
		const state = useDataTableState({ data, columns }, emit);

		expect(state.searchQuery.value).toBe('');
		expect(state.sortKey.value).toBe(null);
		expect(state.sortDirection.value).toBe('asc');
		expect(state.internalPage.value).toBe(1);
		expect(state.selectedKeys.value).toEqual([]);
	});

	it('initializes with custom options', () => {
		const emit = vi.fn();
		const state = useDataTableState(
			{
				data,
				columns,
				initialPage: 2,
				defaultSortKey: 'name',
				defaultSortDirection: 'desc',
				selected: [1, 2]
			},
			emit
		);

		expect(state.internalPage.value).toBe(2);
		expect(state.sortKey.value).toBe('name');
		expect(state.sortDirection.value).toBe('desc');
		expect(state.selectedKeys.value).toEqual([1, 2]);
	});

	describe('getCellValue', () => {
		it('gets direct property value', () => {
			const emit = vi.fn();
			const state = useDataTableState({ data, columns }, emit);
			const value = state.getCellValue(data[0], 'name');
			expect(value).toBe('Alice');
		});

		it('gets nested property value', () => {
			const emit = vi.fn();
			const nestedData = [{ user: { profile: { name: 'Test' } } }];
			const state = useDataTableState({ data: nestedData, columns }, emit);
			const value = state.getCellValue(nestedData[0], 'user.profile.name');
			expect(value).toBe('Test');
		});
	});

	describe('getRowKey', () => {
		it('gets row key using default rowKey prop', () => {
			const emit = vi.fn();
			const state = useDataTableState({ data, columns }, emit);
			const key = state.getRowKey(data[0]);
			expect(key).toBe(1);
		});

		it('uses index when row key is missing', () => {
			const emit = vi.fn();
			const state = useDataTableState({ data, columns }, emit);
			const key = state.getRowKey({}, 5);
			expect(key).toBe(5);
		});

		it('uses custom rowKey', () => {
			const emit = vi.fn();
			const customData = [{ customId: 'abc', name: 'Test' }];
			const state = useDataTableState(
				{ data: customData, columns, rowKey: 'customId' },
				emit
			);
			const key = state.getRowKey(customData[0]);
			expect(key).toBe('abc');
		});
	});

	describe('filtering', () => {
		it('filters data based on search query', () => {
			const emit = vi.fn();
			const state = useDataTableState({ data, columns }, emit);

			expect(state.filteredData.value.length).toBe(4);

			state.searchQuery.value = 'alice';
			expect(state.filteredData.value.length).toBe(1);
			expect(state.filteredData.value[0].name).toBe('Alice');
		});

		it('filters across multiple columns', () => {
			const emit = vi.fn();
			const state = useDataTableState({ data, columns }, emit);

			state.searchQuery.value = 'test.com';
			expect(state.filteredData.value.length).toBe(4);
		});

		it('is case insensitive', () => {
			const emit = vi.fn();
			const state = useDataTableState({ data, columns }, emit);

			state.searchQuery.value = 'ALICE';
			expect(state.filteredData.value.length).toBe(1);
		});

		it('does not filter in server mode', () => {
			const emit = vi.fn();
			const state = useDataTableState(
				{ data, columns, serverMode: true },
				emit
			);

			state.searchQuery.value = 'alice';
			expect(state.filteredData.value.length).toBe(4);
		});

		it('resets to first page when search changes', async () => {
			const emit = vi.fn();
			const state = useDataTableState({ data, columns }, emit);

			state.internalPage.value = 2;
			state.searchQuery.value = 'alice';
			// Wait for watcher to trigger
			await new Promise((resolve) => setTimeout(resolve, 0));
			expect(state.internalPage.value).toBe(1);
		});
	});

	describe('sorting', () => {
		it('sorts data in ascending order', () => {
			const emit = vi.fn();
			const state = useDataTableState({ data, columns }, emit);

			state.handleSort('name');
			expect(state.sortedData.value[0].name).toBe('Alice');
			expect(state.sortedData.value[3].name).toBe('David');
		});

		it('sorts data in descending order', () => {
			const emit = vi.fn();
			const state = useDataTableState({ data, columns }, emit);

			state.handleSort('name');
			state.handleSort('name');
			expect(state.sortedData.value[0].name).toBe('David');
			expect(state.sortedData.value[3].name).toBe('Alice');
		});

		it('emits sort event', () => {
			const emit = vi.fn();
			const state = useDataTableState({ data, columns }, emit);

			state.handleSort('name');
			expect(emit).toHaveBeenCalledWith('sort', {
				key: 'name',
				direction: 'asc'
			});
		});

		it('does not sort in server mode', () => {
			const emit = vi.fn();
			const state = useDataTableState(
				{ data, columns, serverMode: true },
				emit
			);

			state.handleSort('name');
			expect(state.sortedData.value).toEqual(data);
		});

		it('handles null and undefined values', () => {
			const emit = vi.fn();
			const dataWithNulls = [
				{ id: 1, name: 'Alice' },
				{ id: 2, name: null },
				{ id: 3, name: 'Bob' }
			];
			const state = useDataTableState({ data: dataWithNulls, columns }, emit);

			state.handleSort('name');
			// Nulls should be sorted to the end
			expect(state.sortedData.value[2].name).toBe(null);
		});

		it('accepts null as a valid sortDirection value', () => {
			const emit = vi.fn();
			const state = useDataTableState({ data, columns }, emit);

			state.sortDirection.value = null;
			expect(state.sortDirection.value).toBe(null);
		});
	});

	describe('pagination', () => {
		it('calculates total pages correctly', () => {
			const emit = vi.fn();
			const state = useDataTableState({ data, columns, perPage: 2 }, emit);

			expect(state.totalPages.value).toBe(2);
		});

		it('paginates data correctly', () => {
			const emit = vi.fn();
			const state = useDataTableState({ data, columns, perPage: 2 }, emit);

			expect(state.paginatedData.value.length).toBe(2);
			expect(state.paginatedData.value[0].name).toBe('Alice');

			state.internalPage.value = 2;
			expect(state.paginatedData.value.length).toBe(2);
			expect(state.paginatedData.value[0].name).toBe('Charlie');
		});

		it('generates pagination info text', () => {
			const emit = vi.fn();
			const state = useDataTableState({ data, columns, perPage: 2 }, emit);

			expect(state.paginationInfo.value).toBe('1 - 2 sur 4');

			state.internalPage.value = 2;
			expect(state.paginationInfo.value).toBe('3 - 4 sur 4');
		});

		it('disables pagination when virtual mode is enabled', () => {
			const emit = vi.fn();
			const state = useDataTableState({ data, columns, virtual: true }, emit);

			expect(state.effectivePaginated.value).toBe(false);
			expect(state.paginatedData.value.length).toBe(4);
		});

		it('emits page change events', async () => {
			const emit = vi.fn();
			const state = useDataTableState({ data, columns }, emit);

			state.internalPage.value = 2;
			// Wait for watcher to trigger
			await new Promise((resolve) => setTimeout(resolve, 0));
			expect(emit).toHaveBeenCalledWith('update:page', 2);
		});
	});

	describe('selection', () => {
		it('selects a single row', () => {
			const emit = vi.fn();
			const state = useDataTableState({ data, columns }, emit);

			state.handleRowSelect(data[0], true);
			expect(state.selectedKeys.value).toContain(1);
			expect(emit).toHaveBeenCalledWith('select', {
				row: data[0],
				selected: true
			});
		});

		it('deselects a row', () => {
			const emit = vi.fn();
			const state = useDataTableState({ data, columns, selected: [1] }, emit);

			state.handleRowSelect(data[0], false);
			expect(state.selectedKeys.value).not.toContain(1);
		});

		it('checks if row is selected', () => {
			const emit = vi.fn();
			const state = useDataTableState(
				{ data, columns, selected: [1, 2] },
				emit
			);

			expect(state.isRowSelected(data[0])).toBe(true);
			expect(state.isRowSelected(data[2])).toBe(false);
		});

		it('selects all rows on current page', () => {
			const emit = vi.fn();
			const state = useDataTableState({ data, columns, perPage: 2 }, emit);

			state.handleSelectAll(true);
			expect(state.selectedKeys.value).toContain(1);
			expect(state.selectedKeys.value).toContain(2);
			expect(state.selectedKeys.value).not.toContain(3);
		});

		it('deselects all rows on current page', () => {
			const emit = vi.fn();
			const state = useDataTableState(
				{ data, columns, perPage: 2, selected: [1, 2] },
				emit
			);

			state.handleSelectAll(false);
			expect(state.selectedKeys.value).toEqual([]);
		});

		it('determines if all rows are selected', () => {
			const emit = vi.fn();
			const state = useDataTableState({ data, columns, perPage: 2 }, emit);

			expect(state.isAllSelected.value).toBe(false);

			state.handleSelectAll(true);
			expect(state.isAllSelected.value).toBe(true);
		});

		it('clears selection', () => {
			const emit = vi.fn();
			const state = useDataTableState(
				{ data, columns, selected: [1, 2, 3] },
				emit
			);

			state.clearSelection();
			expect(state.selectedKeys.value).toEqual([]);
		});

		it('emits selection change events', async () => {
			const emit = vi.fn();
			const state = useDataTableState({ data, columns }, emit);

			state.selectedKeys.value = [1];
			// Wait for next tick for watcher to trigger
			await new Promise((resolve) => setTimeout(resolve, 0));
			expect(emit).toHaveBeenCalledWith('update:selected', [1]);
		});

		it('provides selected items', () => {
			const emit = vi.fn();
			const state = useDataTableState(
				{ data, columns, selected: [1, 3] },
				emit
			);

			expect(state.selectedItems.value.length).toBe(2);
			expect(state.selectedItems.value[0].name).toBe('Alice');
			expect(state.selectedItems.value[1].name).toBe('Charlie');
		});
	});

	describe('server mode', () => {
		it('uses external total items for pagination', () => {
			const emit = vi.fn();
			const state = useDataTableState(
				{
					data: data.slice(0, 2),
					columns,
					serverMode: true,
					totalItems: 100,
					perPage: 2
				},
				emit
			);

			expect(state.computedTotalItems.value).toBe(100);
			expect(state.totalPages.value).toBe(50);
		});

		it('does not filter or sort in server mode', () => {
			const emit = vi.fn();
			const state = useDataTableState(
				{ data, columns, serverMode: true },
				emit
			);

			state.searchQuery.value = 'alice';
			state.handleSort('name');

			expect(state.processedData.value).toEqual(data);
		});
	});

	describe('scope cleanup', () => {
		it('stops watchers when the parent effect scope is disposed', async () => {
			const emit = vi.fn();
			const scope = effectScope();

			let state: ReturnType<typeof useDataTableState> | undefined;
			scope.run(() => {
				state = useDataTableState({ data, columns }, emit);
			});

			// Verify watcher fires normally before scope disposal
			state!.internalPage.value = 2;
			await new Promise((resolve) => setTimeout(resolve, 0));
			expect(emit).toHaveBeenCalledWith('update:page', 2);

			// Stop the scope, which should also stop all child watchers
			scope.stop();
			emit.mockClear();

			// Changes after scope disposal must not trigger watchers
			state!.internalPage.value = 3;
			await new Promise((resolve) => setTimeout(resolve, 0));
			expect(emit).not.toHaveBeenCalledWith('update:page', 3);

			state!.searchQuery.value = 'alice';
			await new Promise((resolve) => setTimeout(resolve, 0));
			expect(state!.internalPage.value).toBe(3); // page must not reset

			state!.selectedKeys.value = [1];
			await new Promise((resolve) => setTimeout(resolve, 0));
			expect(emit).not.toHaveBeenCalledWith('update:selected', [1]);
		});
	});
});
