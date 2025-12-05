/** Variants disponibles pour FButton */
export type FButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'ghost' | 'link';
/** Tailles disponibles pour FButton */
export type FButtonSize = 'xs' | 'small' | 'medium' | 'large' | 'xl';
/** Type de route pour router-link */
export interface RouteLocation {
    name?: string;
    path?: string;
    params?: Record<string, string>;
    query?: Record<string, string>;
}
/** Props du composant FButton */
export interface FButtonProps {
    variant?: FButtonVariant;
    size?: FButtonSize;
    type?: string;
    disabled?: boolean;
    loading?: boolean;
    loadingText?: string;
    block?: boolean;
    to?: string | RouteLocation | null;
    href?: string | null;
    target?: string | null;
}
/** Tailles disponibles pour FDataTable */
export type FDataTableSize = 'small' | 'medium' | 'large';
/** Direction de tri */
export type SortDirection = 'asc' | 'desc';
/** Alignement des colonnes */
export type ColumnAlign = 'left' | 'center' | 'right';
/** Définition d'une colonne */
export interface FDataTableColumn {
    key: string;
    label: string;
    sortable?: boolean;
    align?: ColumnAlign;
}
/** Événement de tri émis */
export interface SortEvent {
    key: string;
    direction: SortDirection;
}
/** Événement de sélection émis */
export interface SelectEvent<T = Record<string, unknown>> {
    row: T;
    selected: boolean;
}
/** Type pour les clés de lignes */
export type RowKey = string | number;
/** Props du composant FDataTable */
export interface FDataTableProps<T = Record<string, unknown>> {
    data?: T[];
    columns: FDataTableColumn[];
    rowKey?: string;
    selectable?: boolean;
    selected?: RowKey[];
    searchable?: boolean;
    searchPlaceholder?: string;
    paginated?: boolean;
    perPage?: number;
    page?: number;
    totalItems?: number | null;
    serverMode?: boolean;
    loading?: boolean;
    defaultSortKey?: string | null;
    defaultSortDirection?: SortDirection;
    size?: FDataTableSize;
    emptyIcon?: string;
    emptyTitle?: string;
    emptyDescription?: string;
    emptyActionLabel?: string;
    striped?: boolean;
    hoverable?: boolean;
    bordered?: boolean;
}
/** Événements émis par FDataTable */
export interface FDataTableEvents<T = Record<string, unknown>> {
    'row-click': (row: T) => void;
    sort: (event: SortEvent) => void;
    search: (query: string) => void;
    'page-change': (page: number) => void;
    select: (event: SelectEvent<T>) => void;
    'select-all': (checked: boolean) => void;
    'empty-action': () => void;
    'update:page': (page: number) => void;
    'update:selected': (keys: RowKey[]) => void;
}
