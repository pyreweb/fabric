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
/** Tailles disponibles pour FSelect */
export type FSelectSize = 'small' | 'medium' | 'large';
/** Type pour une option de sélection */
export type FSelectOption = string | number | Record<string, unknown>;
/** Fonction de filtrage personnalisée pour FSelect */
export type FSelectFilterMethod = (query: string, options: FSelectOption[]) => FSelectOption[];
/** Props du composant FSelect */
export interface FSelectProps {
    value?: FSelectOption | FSelectOption[] | null;
    options?: FSelectOption[];
    optionKey?: string;
    optionLabel?: string;
    optionDisabled?: string;
    placeholder?: string;
    size?: FSelectSize;
    multiple?: boolean;
    searchable?: boolean;
    searchPlaceholder?: string;
    emptyText?: string;
    loading?: boolean;
    loadingText?: string;
    disabled?: boolean;
    error?: boolean;
    labelId?: string | null;
    filterMethod?: FSelectFilterMethod | null;
}
/** Événements émis par FSelect */
export interface FSelectEvents {
    input: (value: FSelectOption | FSelectOption[]) => void;
    change: (value: FSelectOption | FSelectOption[]) => void;
    open: () => void;
    close: () => void;
    focus: (event: FocusEvent) => void;
    blur: (event: FocusEvent) => void;
}
/** Modes disponibles pour FDatePicker */
export type FDatePickerMode = 'single' | 'range';
/** Tailles disponibles pour FDatePicker */
export type FDatePickerSize = 'small' | 'medium' | 'large';
/** Props du composant FDatePicker */
export interface FDatePickerProps {
    value?: string | Date | Array<string | Date> | null;
    mode?: FDatePickerMode;
    placeholder?: string;
    format?: string;
    size?: FDatePickerSize;
    disabled?: boolean;
    readonly?: boolean;
    error?: boolean;
    showTimePicker?: boolean;
    minDate?: string | Date | null;
    maxDate?: string | Date | null;
    disabledDates?: Array<string | Date>;
    monthNames?: string[];
    dayNames?: string[];
    firstDayOfWeek?: number;
}
/** Événements émis par FDatePicker */
export interface FDatePickerEvents {
    input: (value: Date | Array<Date> | null) => void;
    change: (value: Date | Array<Date> | null) => void;
    focus: (event: FocusEvent) => void;
    blur: (event: FocusEvent) => void;
}
/** Tailles disponibles pour FInput */
export type FInputSize = 'small' | 'medium' | 'large';
/** Props du composant FInput */
export interface FInputProps {
    value?: string | number;
    type?: string;
    placeholder?: string;
    size?: FInputSize;
    disabled?: boolean;
    readonly?: boolean;
    error?: boolean;
}
/** Événements émis par FInput */
export interface FInputEvents {
    input: (value: string) => void;
    focus: (event: FocusEvent) => void;
    blur: (event: FocusEvent) => void;
}
/** Tailles disponibles pour FTextarea */
export type FTextareaSize = 'small' | 'medium' | 'large';
/** Props du composant FTextarea */
export interface FTextareaProps {
    value?: string;
    placeholder?: string;
    size?: FTextareaSize;
    disabled?: boolean;
    readonly?: boolean;
    error?: boolean;
    rows?: number;
    resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}
/** Événements émis par FTextarea */
export interface FTextareaEvents {
    input: (value: string) => void;
    focus: (event: FocusEvent) => void;
    blur: (event: FocusEvent) => void;
}
/** Props du composant FCheckbox */
export interface FCheckboxProps {
    value?: boolean;
    checked?: boolean;
    disabled?: boolean;
    label?: string;
    name?: string;
}
/** Événements émis par FCheckbox */
export interface FCheckboxEvents {
    input: (value: boolean) => void;
    change: (value: boolean) => void;
}
/** Props du composant FRadio */
export interface FRadioProps {
    value?: string | number | boolean;
    checked?: boolean;
    disabled?: boolean;
    label?: string;
    name?: string;
}
/** Événements émis par FRadio */
export interface FRadioEvents {
    input: (value: string | number | boolean) => void;
    change: (value: string | number | boolean) => void;
}
/** Tailles disponibles pour FToggle */
export type FToggleSize = 'small' | 'medium' | 'large';
/** Props du composant FToggle */
export interface FToggleProps {
    value?: boolean;
    disabled?: boolean;
    size?: FToggleSize;
    label?: string;
}
/** Événements émis par FToggle */
export interface FToggleEvents {
    input: (value: boolean) => void;
    change: (value: boolean) => void;
}
/** Variants disponibles pour FTabs */
export type FTabsVariant = 'default' | 'pills' | 'underline';
/** Position disponibles pour FTabs */
export type FTabsPosition = 'top' | 'bottom';
/** Props du composant FTabs */
export interface FTabsProps {
    value?: string;
    variant?: FTabsVariant;
    position?: FTabsPosition;
    ariaLabel?: string;
}
/** Événements émis par FTabs */
export interface FTabsEvents {
    input: (value: string) => void;
    change: (value: string) => void;
}
/** Props du composant FTab */
export interface FTabProps {
    name: string;
    label: string;
    disabled?: boolean;
}
/** Tailles disponibles pour FModal */
export type FModalSize = 'small' | 'medium' | 'large' | 'xl';
/** Props du composant FModal */
export interface FModalProps {
    value?: boolean;
    title?: string;
    size?: FModalSize;
    closeOnEscape?: boolean;
    closeOnBackdrop?: boolean;
    showCloseButton?: boolean;
    persistent?: boolean;
}
/** Événements émis par FModal */
export interface FModalEvents {
    input: (value: boolean) => void;
    close: () => void;
    open: () => void;
}
/** Slots disponibles pour FModal */
export interface FModalSlots {
    /** Slot par défaut pour le contenu du modal */
    default: void;
    /** Slot pour le header personnalisé */
    header?: void;
    /** Slot pour le footer avec actions */
    footer?: void;
}
/** Position disponibles pour FDrawer */
export type FDrawerPosition = 'left' | 'right' | 'top' | 'bottom';
/** Tailles disponibles pour FDrawer */
export type FDrawerSize = 'small' | 'medium' | 'large' | 'xl';
/** Props du composant FDrawer */
export interface FDrawerProps {
    value?: boolean;
    title?: string;
    position?: FDrawerPosition;
    size?: FDrawerSize;
    closeOnEscape?: boolean;
    closeOnBackdrop?: boolean;
    showCloseButton?: boolean;
    persistent?: boolean;
}
/** Événements émis par FDrawer */
export interface FDrawerEvents {
    input: (value: boolean) => void;
    close: () => void;
    open: () => void;
}
/** Slots disponibles pour FDrawer */
export interface FDrawerSlots {
    /** Slot par défaut pour le contenu du drawer */
    default: void;
    /** Slot pour le header personnalisé */
    header?: void;
    /** Slot pour le footer avec actions */
    footer?: void;
}
/** Props du composant FCard */
export interface FCardProps {
    title?: string;
    subtitle?: string;
    clickable?: boolean;
    bordered?: boolean;
}
/** Événements émis par FCard */
export interface FCardEvents {
    click: (event: MouseEvent) => void;
}
/** Slots disponibles pour FCard */
export interface FCardSlots {
    /** Slot par défaut pour le contenu principal */
    default: void;
    /** Slot pour le header personnalisé */
    header?: void;
    /** Slot pour les médias (images, vidéos) */
    media?: void;
    /** Slot pour les actions en bas de la carte */
    actions?: void;
}
/** Variants disponibles pour FAlert */
export type FAlertVariant = 'info' | 'success' | 'warning' | 'danger';
/** Props du composant FAlert */
export interface FAlertProps {
    variant?: FAlertVariant;
    title?: string;
    message?: string;
    dismissible?: boolean;
    icon?: string | null;
}
/** Événements émis par FAlert */
export interface FAlertEvents {
    close: () => void;
}
/** Slots disponibles pour FAlert */
export interface FAlertSlots {
    /** Slot par défaut pour le contenu du message */
    default?: void;
    /** Slot pour le titre */
    title?: void;
    /** Slot pour l'icône personnalisée */
    icon?: void;
}
/** Variants disponibles pour FToast */
export type FToastVariant = 'info' | 'success' | 'warning' | 'error';
/** Positions disponibles pour FToast */
export type FToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
/** Props du composant FToast */
export interface FToastProps {
    variant?: FToastVariant;
    title?: string;
    message?: string;
    duration?: number;
    dismissible?: boolean;
    icon?: string | null;
}
/** Événements émis par FToast */
export interface FToastEvents {
    close: () => void;
}
/** Configuration pour afficher un toast */
export interface ToastConfig {
    variant?: FToastVariant;
    title?: string;
    message: string;
    duration?: number;
    dismissible?: boolean;
    icon?: string | null;
}
/** Props du composant FPagination */
export interface FPaginationProps {
    currentPage?: number;
    totalPages: number;
    maxVisiblePages?: number;
    showFirstLast?: boolean;
    showPrevNext?: boolean;
}
/** Événements émis par FPagination */
export interface FPaginationEvents {
    'page-change': (page: number) => void;
    'update:currentPage': (page: number) => void;
}
/** Context pour le slot cell d'une table */
export interface FDataTableCellSlotContext<T = Record<string, unknown>> {
    /** Valeur de la cellule */
    value: unknown;
    /** Ligne complète de données */
    row: T;
    /** Définition de la colonne */
    column: FDataTableColumn;
}
/** Context pour le slot actions d'une table */
export interface FDataTableActionsSlotContext<T = Record<string, unknown>> {
    /** Éléments sélectionnés */
    selectedItems: T[];
}
/** Slots disponibles pour FDataTable */
export interface FDataTableSlots<T = Record<string, unknown>> {
    /** Slot dynamique pour personnaliser une cellule. Nom: `cell-{columnKey}` */
    [key: `cell-${string}`]: (context: FDataTableCellSlotContext<T>) => void;
    /** Slot pour les actions personnalisées dans la barre d'outils */
    actions?: (context: FDataTableActionsSlotContext<T>) => void;
}
/** Props du composant FEmptyState */
export interface FEmptyStateProps {
    icon?: string;
    title?: string;
    description?: string;
    actionLabel?: string;
}
/** Événements émis par FEmptyState */
export interface FEmptyStateEvents {
    action: () => void;
}
/** Slots disponibles pour FEmptyState */
export interface FEmptyStateSlots {
    /** Slot pour le contenu par défaut */
    default?: void;
    /** Slot pour l'icône personnalisée */
    icon?: void;
    /** Slot pour les actions personnalisées */
    actions?: void;
}
/** Tailles disponibles pour FSearchBar */
export type FSearchBarSize = 'small' | 'medium' | 'large';
/** Props du composant FSearchBar */
export interface FSearchBarProps {
    value?: string;
    placeholder?: string;
    size?: FSearchBarSize;
    disabled?: boolean;
    loading?: boolean;
}
/** Événements émis par FSearchBar */
export interface FSearchBarEvents {
    input: (value: string) => void;
    search: (value: string) => void;
    clear: () => void;
}
/** Item de breadcrumb */
export interface BreadcrumbItem {
    label: string;
    to?: string | RouteLocation;
    href?: string;
    disabled?: boolean;
}
/** Props du composant FBreadcrumb */
export interface FBreadcrumbProps {
    items: BreadcrumbItem[];
    separator?: string;
}
/** Événements émis par FBreadcrumb */
export interface FBreadcrumbEvents {
    click: (item: BreadcrumbItem, index: number) => void;
}
/** Tailles disponibles pour FAvatar */
export type FAvatarSize = 'xs' | 'small' | 'medium' | 'large' | 'xl' | '2xl';
/** Formes disponibles pour FAvatar */
export type FAvatarShape = 'circle' | 'square' | 'rounded';
/** Status disponibles pour FAvatar */
export type FAvatarStatus = 'online' | 'offline' | 'away' | 'busy' | null;
/** Props du composant FAvatar */
export interface FAvatarProps {
    src?: string;
    alt?: string;
    initials?: string;
    name?: string;
    size?: FAvatarSize;
    shape?: FAvatarShape;
    status?: FAvatarStatus;
    placeholderClass?: string;
}
/** Variants disponibles pour FBadge */
export type FBadgeVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral';
/** Tailles disponibles pour FBadge */
export type FBadgeSize = 'small' | 'medium' | 'large';
/** Props du composant FBadge */
export interface FBadgeProps {
    variant?: FBadgeVariant;
    size?: FBadgeSize;
    rounded?: boolean;
    outlined?: boolean;
}
/** Tailles disponibles pour FIcon */
export type FIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
/** Props du composant FIcon */
export interface FIconProps {
    name: string;
    size?: FIconSize;
}
/** Tailles disponibles pour FLoader */
export type FLoaderSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
/** Variants disponibles pour FLoader */
export type FLoaderVariant = 'spinner' | 'dots' | 'pulse';
/** Props du composant FLoader */
export interface FLoaderProps {
    size?: FLoaderSize;
    variant?: FLoaderVariant;
    text?: string;
}
/** Props du composant FFormField */
export interface FFormFieldProps {
    label?: string;
    hint?: string;
    error?: string;
    required?: boolean;
    optional?: boolean;
    labelFor?: string;
}
/** Slots disponibles pour FFormField */
export interface FFormFieldSlots {
    /** Slot par défaut pour le champ de formulaire */
    default: void;
    /** Slot pour le label personnalisé */
    label?: void;
    /** Slot pour l'indication (hint) */
    hint?: void;
    /** Slot pour le message d'erreur */
    error?: void;
}
