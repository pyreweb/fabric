import { Ref, ComputedRef } from 'vue';
/**
 * Configuration options for useDataTableState
 */
export interface DataTableStateOptions {
    /**
     * Table data
     */
    data: any[];
    /**
     * Column definitions
     */
    columns: Array<{
        key: string;
        label: string;
        sortable?: boolean;
        align?: string;
    }>;
    /**
     * Unique key property in data objects
     */
    rowKey?: string;
    /**
     * Initial page number
     */
    initialPage?: number;
    /**
     * Items per page
     */
    perPage?: number;
    /**
     * Enable pagination
     */
    paginated?: boolean;
    /**
     * Enable virtualization (disables pagination)
     */
    virtual?: boolean;
    /**
     * Default sort key
     */
    defaultSortKey?: string | null;
    /**
     * Default sort direction
     */
    defaultSortDirection?: 'asc' | 'desc';
    /**
     * Server mode (external data fetching)
     */
    serverMode?: boolean;
    /**
     * Total items for server-side pagination
     */
    totalItems?: number | null;
    /**
     * Initially selected row keys
     */
    selected?: any[];
}
/**
 * Return type for useDataTableState
 */
export interface DataTableState {
    searchQuery: Ref<string>;
    sortKey: Ref<string | null>;
    sortDirection: Ref<'asc' | 'desc'>;
    internalPage: Ref<number>;
    totalPages: ComputedRef<number>;
    paginationInfo: ComputedRef<string>;
    effectivePaginated: ComputedRef<boolean>;
    selectedKeys: Ref<any[]>;
    selectedKeysSet: ComputedRef<Set<any>>;
    selectedItems: ComputedRef<any[]>;
    isAllSelected: ComputedRef<boolean>;
    filteredData: ComputedRef<any[]>;
    sortedData: ComputedRef<any[]>;
    processedData: ComputedRef<any[]>;
    paginatedData: ComputedRef<any[]>;
    computedTotalItems: ComputedRef<number>;
    getCellValue: (row: any, key: string) => any;
    getRowKey: (row: any, index?: number) => any;
    handleSort: (key: string) => void;
    isRowSelected: (row: any) => boolean;
    handleRowSelect: (row: any, checked: boolean) => void;
    handleSelectAll: (checked: boolean) => void;
    clearSelection: () => void;
}
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
export declare function useDataTableState(options: DataTableStateOptions, emit: (event: string, ...args: any[]) => void): DataTableState;
