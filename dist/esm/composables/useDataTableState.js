import { ref, computed, watch } from 'vue';

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Composable for managing data table state and logic
 *
 * Handles filtering, sorting, pagination, and row selection for data tables.
 *
 * @param options - Configuration options for the data table state
 * @param emit - Emit function from the component setup
 * @returns Object containing reactive state and methods for table operations
 *
 * @example
 * ```ts
 * const tableState = useDataTableState({
 *   data: myData,
 *   columns: myColumns,
 *   perPage: 10
 * }, emit);
 * ```
 */
function useDataTableState(options, emit) {
    const { data, columns, rowKey = 'id', initialPage = 1, perPage = 10, paginated = true, virtual = false, defaultSortKey = null, defaultSortDirection = 'asc', serverMode = false, totalItems = null, selected = [] } = options;
    // Reactive state
    const searchQuery = ref('');
    const sortKey = ref(defaultSortKey);
    const sortDirection = ref(defaultSortDirection);
    const internalPage = ref(initialPage);
    const selectedKeys = ref([...selected]);
    // Helper: Get cell value with support for nested keys
    const getCellValue = (row, key) => {
        return key.split('.').reduce((obj, k) => obj?.[k], row);
    };
    // Helper: Get row key
    const getRowKey = (row, index) => {
        return row[rowKey] ?? index;
    };
    // Computed: Filtered data (client-side only)
    const filteredData = computed(() => {
        if (serverMode || !searchQuery.value) {
            return data;
        }
        const query = searchQuery.value.toLowerCase();
        return data.filter((row) => {
            return columns.some((column) => {
                const value = getCellValue(row, column.key);
                return String(value).toLowerCase().includes(query);
            });
        });
    });
    // Computed: Sorted data (client-side only)
    const sortedData = computed(() => {
        if (serverMode || !sortKey.value) {
            return filteredData.value;
        }
        return [...filteredData.value].sort((a, b) => {
            const aValue = getCellValue(a, sortKey.value);
            const bValue = getCellValue(b, sortKey.value);
            let comparison = 0;
            if (aValue === null || aValue === undefined)
                comparison = 1;
            else if (bValue === null || bValue === undefined)
                comparison = -1;
            else if (typeof aValue === 'string') {
                comparison = aValue.localeCompare(bValue);
            }
            else {
                comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            }
            return sortDirection.value === 'desc' ? -comparison : comparison;
        });
    });
    // Computed: Processed data after filtering and sorting
    const processedData = computed(() => sortedData.value);
    // Computed: Total items for pagination
    const computedTotalItems = computed(() => {
        if (serverMode && totalItems !== null) {
            return totalItems;
        }
        return processedData.value.length;
    });
    // Computed: Effective pagination (disabled when virtual mode is enabled)
    const effectivePaginated = computed(() => (virtual ? false : paginated));
    // Computed: Total pages
    const totalPages = computed(() => {
        if (!effectivePaginated.value)
            return 1;
        return Math.max(1, Math.ceil(computedTotalItems.value / perPage));
    });
    // Computed: Paginated data (client-side only)
    const paginatedData = computed(() => {
        if (serverMode || !effectivePaginated.value) {
            return processedData.value;
        }
        const start = (internalPage.value - 1) * perPage;
        const end = start + perPage;
        return processedData.value.slice(start, end);
    });
    // Computed: Pagination info text
    const paginationInfo = computed(() => {
        if (!effectivePaginated.value) {
            return `${computedTotalItems.value} élément(s)`;
        }
        const start = Math.min((internalPage.value - 1) * perPage + 1, computedTotalItems.value);
        const end = Math.min(internalPage.value * perPage, computedTotalItems.value);
        return `${start} - ${end} sur ${computedTotalItems.value}`;
    });
    // Computed: Selected keys as a Set for efficient lookups
    const selectedKeysSet = computed(() => new Set(selectedKeys.value));
    // Computed: Selected items
    const selectedItems = computed(() => {
        return data.filter((row) => selectedKeysSet.value.has(getRowKey(row)));
    });
    // Computed: Is all selected
    const isAllSelected = computed(() => {
        if (paginatedData.value.length === 0)
            return false;
        return paginatedData.value.every((row) => isRowSelected(row));
    });
    // Method: Check if row is selected
    const isRowSelected = (row) => {
        return selectedKeysSet.value.has(getRowKey(row));
    };
    // Method: Handle sort
    const handleSort = (key) => {
        if (sortKey.value === key) {
            sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
        }
        else {
            sortKey.value = key;
            sortDirection.value = 'asc';
        }
        emit('sort', { key: sortKey.value, direction: sortDirection.value });
    };
    // Method: Handle row selection
    const handleRowSelect = (row, checked) => {
        const key = getRowKey(row);
        if (checked) {
            if (!selectedKeysSet.value.has(key)) {
                selectedKeys.value = [...selectedKeys.value, key];
            }
        }
        else {
            selectedKeys.value = selectedKeys.value.filter((k) => k !== key);
        }
        emit('select', { row, selected: checked });
    };
    // Method: Handle select all
    const handleSelectAll = (checked) => {
        if (checked) {
            const currentKeys = paginatedData.value.map((row) => getRowKey(row));
            const newKeys = currentKeys.filter((k) => !selectedKeys.value.includes(k));
            selectedKeys.value = [...selectedKeys.value, ...newKeys];
        }
        else {
            const currentKeys = paginatedData.value.map((row) => getRowKey(row));
            selectedKeys.value = selectedKeys.value.filter((k) => !currentKeys.includes(k));
        }
        emit('select-all', checked);
    };
    // Method: Clear selection
    const clearSelection = () => {
        selectedKeys.value = [];
    };
    // Watch: Reset to first page when search changes (client-side only)
    watch(searchQuery, () => {
        if (!serverMode) {
            internalPage.value = 1;
        }
    });
    // Watch: Emit page changes
    watch(internalPage, (newVal) => {
        emit('update:page', newVal);
    });
    // Watch: Emit selection changes
    watch(selectedKeys, (newVal) => {
        emit('update:selected', newVal);
    }, { deep: true });
    return {
        // Search state
        searchQuery,
        // Sort state
        sortKey,
        sortDirection,
        // Pagination state
        internalPage,
        totalPages,
        paginationInfo,
        effectivePaginated,
        // Selection state
        selectedKeys,
        selectedKeysSet,
        selectedItems,
        isAllSelected,
        // Data processing
        filteredData,
        sortedData,
        processedData,
        paginatedData,
        computedTotalItems,
        // Methods
        getCellValue,
        getRowKey,
        handleSort,
        isRowSelected,
        handleRowSelect,
        handleSelectAll,
        clearSelection
    };
}

export { useDataTableState };
