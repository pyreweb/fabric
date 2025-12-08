<template>
	<div :class="containerClasses">
		<!-- Toolbar section: Search and Actions -->
		<div v-if="showToolbar" :class="toolbarClasses">
			<div class="flex-1">
				<f-search-bar
					v-if="searchable"
					v-model="searchQuery"
					:placeholder="searchPlaceholder"
					:size="size"
					:disabled="loading"
					@search="handleSearch"
				/>
			</div>
			<div v-if="$slots.actions" class="flex-shrink-0">
				<slot name="actions" :selected-items="selectedItems" />
			</div>
		</div>

		<!-- Table wrapper -->
		<div :class="tableWrapperClasses">
			<!-- Loading overlay -->
			<div v-if="loading" :class="loadingOverlayClasses">
				<f-loader size="large" />
			</div>

			<!-- Table -->
			<table v-if="processedData.length > 0 || loading" :class="tableClasses">
				<thead>
					<tr>
						<!-- Selection checkbox column -->
						<th v-if="selectable" :class="headerCellClasses">
							<f-checkbox :checked="isAllSelected" @change="handleSelectAll" />
						</th>
						<!-- Data columns -->
						<th
							v-for="column in columns"
							:key="column.key"
							:class="getHeaderCellClasses(column)"
							:aria-sort="getAriaSort(column.key, column.sortable)"
							@click="column.sortable !== false && handleSort(column.key)"
						>
							<div class="flex items-center gap-1">
								<span>{{ column.label }}</span>
								<f-icon
									v-if="column.sortable !== false"
									:name="getSortIcon(column.key)"
									size="sm"
									:class="getSortIconClasses(column.key)"
								/>
							</div>
						</th>
					</tr>
				</thead>
				<tbody v-if="!virtual">
					<tr
						v-for="(row, rowIndex) in paginatedData"
						:key="getRowKey(row, rowIndex)"
						:class="getRowClasses(row)"
						@click="handleRowClick(row)"
					>
						<!-- Selection checkbox -->
						<td v-if="selectable" :class="cellClasses" data-label="">
							<f-checkbox
								:checked="isRowSelected(row)"
								@change="handleRowSelect(row, $event)"
								@click.stop
							/>
						</td>
						<!-- Data cells -->
						<td
							v-for="column in columns"
							:key="column.key"
							:class="getCellClasses(column)"
							:data-label="column.label"
						>
							<slot
								:name="'cell-' + column.key"
								:value="getCellValue(row, column.key)"
								:row="row"
								:column="column"
							>
								{{ getCellValue(row, column.key) }}
							</slot>
						</td>
					</tr>
				</tbody>
			</table>

			<!-- Virtual scrolling table body -->
			<div
				v-if="virtual && (processedData.length > 0 || loading)"
				class="virtual-table-body"
			>
				<RecycleScroller
					:items="paginatedData"
					:item-size="computedVirtualItemHeight"
					:key-field="rowKey"
					:buffer="200"
					class="scroller"
					:style="{ height: virtualHeight + 'px' }"
				>
					<template #default="{ item: row }">
						<div
							:class="['virtual-row', getRowClasses(row)]"
							@click="handleRowClick(row)"
						>
							<!-- Selection checkbox -->
							<div v-if="selectable" :class="['virtual-cell', cellClasses]">
								<f-checkbox
									:checked="isRowSelected(row)"
									@change="handleRowSelect(row, $event)"
									@click.stop
								/>
							</div>
							<!-- Data cells -->
							<div
								v-for="column in columns"
								:key="column.key"
								:class="['virtual-cell', getCellClasses(column)]"
							>
								<slot
									:name="'cell-' + column.key"
									:value="getCellValue(row, column.key)"
									:row="row"
									:column="column"
								>
									{{ getCellValue(row, column.key) }}
								</slot>
							</div>
						</div>
					</template>
				</RecycleScroller>
			</div>

			<!-- Empty state -->
			<f-empty-state
				v-if="!loading && processedData.length === 0"
				:icon="emptyIcon"
				:title="emptyTitle"
				:description="emptyDescription"
				:action-label="emptyActionLabel"
				@action="$emit('empty-action')"
			/>
		</div>

		<!-- Footer section: Info and Pagination -->
		<div v-if="showFooter" :class="footerClasses">
			<div :class="infoClasses">
				<span v-if="selectable && selectedItems.length > 0">
					{{ selectedItems.length }} élément(s) sélectionné(s) sur
					{{ totalItems }}
				</span>
				<span v-else>
					{{ paginationInfo }}
				</span>
			</div>
			<f-pagination
				v-if="effectivePaginated && totalPages > 1"
				v-model="internalPage"
				:total-pages="totalPages"
				:size="size"
				:show-labels="false"
				@change="handlePageChange"
			/>
		</div>
	</div>
</template>

<script>
import FSearchBar from '../../molecules/FSearchBar/FSearchBar.vue';
import FPagination from '../../molecules/FPagination/FPagination.vue';
import FEmptyState from '../../molecules/FEmptyState/FEmptyState.vue';
import FCheckbox from '../../atoms/FCheckbox/FCheckbox.vue';
import FIcon from '../../atoms/FIcon/FIcon.vue';
import FLoader from '../../atoms/FLoader/FLoader.vue';
import { RecycleScroller } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

export default {
	name: 'FDataTable',
	components: {
		FSearchBar,
		FPagination,
		FEmptyState,
		FCheckbox,
		FIcon,
		FLoader,
		RecycleScroller
	},
	props: {
		/**
		 * Array of data objects to display
		 */
		data: {
			type: Array,
			default: () => []
		},
		/**
		 * Column definitions
		 * Each column: { key: string, label: string, sortable?: boolean, align?: 'left'|'center'|'right' }
		 */
		columns: {
			type: Array,
			required: true,
			validator: (columns) => columns.every((col) => col.key && col.label)
		},
		/**
		 * Unique key property in data objects
		 */
		rowKey: {
			type: String,
			default: 'id'
		},
		/**
		 * Enable row selection with checkboxes
		 */
		selectable: {
			type: Boolean,
			default: false
		},
		/**
		 * Selected row keys (v-model:selected)
		 */
		selected: {
			type: Array,
			default: () => []
		},
		/**
		 * Enable search functionality
		 */
		searchable: {
			type: Boolean,
			default: false
		},
		/**
		 * Search input placeholder
		 */
		searchPlaceholder: {
			type: String,
			default: 'Rechercher...'
		},
		/**
		 * Enable pagination
		 */
		paginated: {
			type: Boolean,
			default: true
		},
		/**
		 * Number of items per page
		 */
		perPage: {
			type: Number,
			default: 10
		},
		/**
		 * Current page (v-model:page)
		 */
		page: {
			type: Number,
			default: 1
		},
		/**
		 * Total items count for server-side pagination
		 */
		totalItems: {
			type: Number,
			default: null
		},
		/**
		 * Server mode - data fetching is handled externally
		 */
		serverMode: {
			type: Boolean,
			default: false
		},
		/**
		 * Loading state
		 */
		loading: {
			type: Boolean,
			default: false
		},
		/**
		 * Default sort column key
		 */
		defaultSortKey: {
			type: String,
			default: null
		},
		/**
		 * Default sort direction
		 */
		defaultSortDirection: {
			type: String,
			default: 'asc',
			validator: (value) => ['asc', 'desc'].includes(value)
		},
		/**
		 * Component size
		 */
		size: {
			type: String,
			default: 'medium',
			validator: (value) => ['small', 'medium', 'large'].includes(value)
		},
		/**
		 * Empty state icon
		 */
		emptyIcon: {
			type: String,
			default: 'folder'
		},
		/**
		 * Empty state title
		 */
		emptyTitle: {
			type: String,
			default: 'Aucune donnée'
		},
		/**
		 * Empty state description
		 */
		emptyDescription: {
			type: String,
			default: "Il n'y a aucun élément à afficher."
		},
		/**
		 * Empty state action button label
		 */
		emptyActionLabel: {
			type: String,
			default: ''
		},
		/**
		 * Striped row style
		 */
		striped: {
			type: Boolean,
			default: false
		},
		/**
		 * Hoverable rows
		 */
		hoverable: {
			type: Boolean,
			default: true
		},
		/**
		 * Bordered table
		 */
		bordered: {
			type: Boolean,
			default: false
		},
		/**
		 * Enable virtualization for large datasets (improves performance with 1000+ rows)
		 * When enabled, only visible rows are rendered. Pagination is automatically disabled.
		 */
		virtual: {
			type: Boolean,
			default: false
		},
		/**
		 * Height of each virtualized row in pixels
		 * Used only when virtual is enabled
		 */
		virtualItemHeight: {
			type: Number,
			default: null
		},
		/**
		 * Height of the virtual scroller container in pixels
		 * Used only when virtual is enabled
		 */
		virtualHeight: {
			type: Number,
			default: 500
		}
	},
	data() {
		return {
			searchQuery: '',
			sortKey: this.defaultSortKey,
			sortDirection: this.defaultSortDirection,
			internalPage: this.page,
			selectedKeys: [...this.selected]
		};
	},
	computed: {
		containerClasses() {
			return 'flex flex-col gap-4 bg-white rounded-lg';
		},
		toolbarClasses() {
			return 'flex items-center gap-4 flex-wrap';
		},
		tableWrapperClasses() {
			const baseClasses = 'relative overflow-x-auto';
			const borderClasses = this.bordered
				? 'border border-neutral-200 rounded-lg'
				: '';
			return [baseClasses, borderClasses].filter(Boolean).join(' ');
		},
		loadingOverlayClasses() {
			return 'absolute inset-0 bg-white/80 flex items-center justify-center z-10';
		},
		tableClasses() {
			return 'w-full text-left';
		},
		headerCellClasses() {
			const sizeClasses = {
				small: 'px-3 py-2 text-xs',
				medium: 'px-4 py-3 text-sm',
				large: 'px-6 py-4 text-base'
			};
			return [
				'font-semibold text-neutral-700 bg-neutral-50 border-b border-neutral-200',
				sizeClasses[this.size]
			].join(' ');
		},
		cellClasses() {
			const sizeClasses = {
				small: 'px-3 py-2 text-xs',
				medium: 'px-4 py-3 text-sm',
				large: 'px-6 py-4 text-base'
			};
			return [
				'text-neutral-600 border-b border-neutral-100',
				sizeClasses[this.size]
			].join(' ');
		},
		footerClasses() {
			return 'flex items-center justify-between gap-4 flex-wrap';
		},
		infoClasses() {
			const sizeClasses = {
				small: 'text-xs',
				medium: 'text-sm',
				large: 'text-base'
			};
			return ['text-neutral-500', sizeClasses[this.size]].join(' ');
		},
		showToolbar() {
			return this.searchable || this.$slots.actions;
		},
		showFooter() {
			return this.effectivePaginated || this.selectable;
		},
		// Filter data based on search query (client-side only)
		filteredData() {
			if (this.serverMode || !this.searchQuery) {
				return this.data;
			}
			const query = this.searchQuery.toLowerCase();
			return this.data.filter((row) => {
				return this.columns.some((column) => {
					const value = this.getCellValue(row, column.key);
					return String(value).toLowerCase().includes(query);
				});
			});
		},
		// Sort filtered data (client-side only)
		sortedData() {
			if (this.serverMode || !this.sortKey) {
				return this.filteredData;
			}
			return [...this.filteredData].sort((a, b) => {
				const aValue = this.getCellValue(a, this.sortKey);
				const bValue = this.getCellValue(b, this.sortKey);

				let comparison = 0;
				if (aValue === null || aValue === undefined) comparison = 1;
				else if (bValue === null || bValue === undefined) comparison = -1;
				else if (typeof aValue === 'string') {
					comparison = aValue.localeCompare(bValue);
				} else {
					comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
				}

				return this.sortDirection === 'desc' ? -comparison : comparison;
			});
		},
		// Processed data after filtering and sorting
		processedData() {
			return this.sortedData;
		},
		// Calculate total items for pagination
		computedTotalItems() {
			if (this.serverMode && this.totalItems !== null) {
				return this.totalItems;
			}
			return this.processedData.length;
		},
		// Total pages
		totalPages() {
			if (!this.effectivePaginated) return 1;
			return Math.max(1, Math.ceil(this.computedTotalItems / this.perPage));
		},
		// Data for current page (client-side pagination only)
		paginatedData() {
			if (this.serverMode || !this.effectivePaginated) {
				return this.processedData;
			}
			const start = (this.internalPage - 1) * this.perPage;
			const end = start + this.perPage;
			return this.processedData.slice(start, end);
		},
		// Pagination info text
		paginationInfo() {
			if (!this.effectivePaginated) {
				return `${this.computedTotalItems} élément(s)`;
			}
			const start = Math.min(
				(this.internalPage - 1) * this.perPage + 1,
				this.computedTotalItems
			);
			const end = Math.min(
				this.internalPage * this.perPage,
				this.computedTotalItems
			);
			return `${start} - ${end} sur ${this.computedTotalItems}`;
		},
		// Set for efficient key lookups
		selectedKeysSet() {
			return new Set(this.selectedKeys);
		},
		// Selection state
		selectedItems() {
			return this.data.filter((row) =>
				this.selectedKeysSet.has(this.getRowKey(row))
			);
		},
		isAllSelected() {
			if (this.paginatedData.length === 0) return false;
			return this.paginatedData.every((row) => this.isRowSelected(row));
		},
		// Calculate virtual item height based on size
		computedVirtualItemHeight() {
			if (this.virtualItemHeight !== null) {
				return this.virtualItemHeight;
			}
			// Auto-calculate based on size prop
			const sizeHeights = {
				small: 40,
				medium: 52,
				large: 64
			};
			return sizeHeights[this.size] || sizeHeights.medium;
		},
		// When virtual mode is enabled, don't paginate
		effectivePaginated() {
			return this.virtual ? false : this.paginated;
		}
	},
	watch: {
		page: {
			handler(newVal) {
				this.internalPage = newVal;
			},
			immediate: true
		},
		internalPage(newVal) {
			this.$emit('update:page', newVal);
		},
		selected: {
			handler(newVal) {
				this.selectedKeys = [...newVal];
			},
			deep: true,
			immediate: true
		},
		selectedKeys: {
			handler(newVal) {
				this.$emit('update:selected', newVal);
			},
			deep: true
		},
		searchQuery() {
			// Reset to first page when search changes
			if (!this.serverMode) {
				this.internalPage = 1;
			}
		}
	},
	methods: {
		getCellValue(row, key) {
			// Support nested keys like 'user.name'
			return key.split('.').reduce((obj, k) => obj?.[k], row);
		},
		getRowKey(row, index) {
			return row[this.rowKey] ?? index;
		},
		getHeaderCellClasses(column) {
			const alignClasses = {
				left: 'text-left',
				center: 'text-center',
				right: 'text-right'
			};
			const sortableClasses =
				column.sortable !== false
					? 'cursor-pointer select-none hover:bg-neutral-100'
					: '';
			return [
				this.headerCellClasses,
				alignClasses[column.align] || 'text-left',
				sortableClasses
			]
				.filter(Boolean)
				.join(' ');
		},
		getCellClasses(column) {
			const alignClasses = {
				left: 'text-left',
				center: 'text-center',
				right: 'text-right'
			};
			return [this.cellClasses, alignClasses[column.align] || 'text-left'].join(
				' '
			);
		},
		getRowClasses(row) {
			const baseClasses = 'transition-colors duration-[var(--transition-duration-fast)] ease-[var(--transition-easing-standard)]';
			const hoverClasses = this.hoverable ? 'hover:bg-neutral-50' : '';
			const selectedClasses = this.isRowSelected(row) ? 'bg-primary-50' : '';
			const stripedClasses = this.striped ? 'even:bg-neutral-50/50' : '';
			return [baseClasses, hoverClasses, selectedClasses, stripedClasses]
				.filter(Boolean)
				.join(' ');
		},
		getSortIcon(key) {
			if (this.sortKey !== key) return 'chevron-down';
			return this.sortDirection === 'asc' ? 'chevron-up' : 'chevron-down';
		},
		getSortIconClasses(key) {
			const isActive = this.sortKey === key;
			return isActive ? 'text-primary-500' : 'text-neutral-400';
		},
		getAriaSort(key, sortable) {
			// Don't add aria-sort if column is not sortable
			if (sortable === false) {
				return undefined;
			}
			// If this column is currently sorted, indicate direction
			if (this.sortKey === key) {
				return this.sortDirection === 'asc' ? 'ascending' : 'descending';
			}
			// Column is sortable but not currently sorted
			return 'none';
		},
		handleSort(key) {
			if (this.sortKey === key) {
				this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
			} else {
				this.sortKey = key;
				this.sortDirection = 'asc';
			}
			this.$emit('sort', { key: this.sortKey, direction: this.sortDirection });
		},
		handleSearch(query) {
			this.$emit('search', query);
		},
		handlePageChange(page) {
			this.$emit('page-change', page);
		},
		handleRowClick(row) {
			this.$emit('row-click', row);
		},
		isRowSelected(row) {
			return this.selectedKeysSet.has(this.getRowKey(row));
		},
		handleRowSelect(row, checked) {
			const key = this.getRowKey(row);
			if (checked) {
				if (!this.selectedKeysSet.has(key)) {
					this.selectedKeys = [...this.selectedKeys, key];
				}
			} else {
				this.selectedKeys = this.selectedKeys.filter((k) => k !== key);
			}
			this.$emit('select', { row, selected: checked });
		},
		handleSelectAll(checked) {
			if (checked) {
				const currentKeys = this.paginatedData.map((row) =>
					this.getRowKey(row)
				);
				const newKeys = currentKeys.filter(
					(k) => !this.selectedKeys.includes(k)
				);
				this.selectedKeys = [...this.selectedKeys, ...newKeys];
			} else {
				const currentKeys = this.paginatedData.map((row) =>
					this.getRowKey(row)
				);
				this.selectedKeys = this.selectedKeys.filter(
					(k) => !currentKeys.includes(k)
				);
			}
			this.$emit('select-all', checked);
		},
		clearSelection() {
			this.selectedKeys = [];
		}
	}
};
</script>

<style scoped>
/* Virtual table styling */
.virtual-table-body {
	border: 1px solid var(--color-neutral-200, #e5e7eb);
	border-radius: 0.5rem;
	overflow: hidden;
}

.virtual-table-body .scroller {
	width: 100%;
}

.virtual-row {
	display: flex;
	align-items: center;
	border-bottom: 1px solid var(--color-neutral-100, #f3f4f6);
	transition: background-color 0.15s;
}

.virtual-row:last-child {
	border-bottom: none;
}

.virtual-cell {
	flex: 1;
	min-width: 0;
	display: flex;
	align-items: center;
}

/* Mobile Card View - transforms table rows into cards on small screens */
@media (max-width: 640px) {
	/* Hide table header on mobile */
	table thead {
		display: none;
	}

	/* Make table body a flex container for cards */
	table tbody {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	/* Transform each row into a card */
	table tbody tr {
		display: flex;
		flex-direction: column;
		background-color: white;
		border: 1px solid var(--color-neutral-200, #e5e7eb);
		border-radius: 0.5rem;
		padding: 0.75rem;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
	}

	/* Style each cell as a row in the card */
	table tbody tr td {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding: 0.5rem 0;
		border-bottom: 1px solid var(--color-neutral-100, #f3f4f6);
		text-align: right;
	}

	/* Remove border from last cell */
	table tbody tr td:last-child {
		border-bottom: none;
	}

	/* Display column label before cell content */
	table tbody tr td::before {
		content: attr(data-label);
		font-weight: 600;
		color: var(--color-neutral-700, #374151);
		text-align: left;
		flex-shrink: 0;
		margin-right: 1rem;
	}

	/* Hide empty labels (for checkbox column) */
	table tbody tr td[data-label='']::before {
		display: none;
	}

	/* Checkbox cell styling */
	table tbody tr td[data-label=''] {
		justify-content: flex-start;
		border-bottom: 1px solid var(--color-neutral-200, #e5e7eb);
		margin-bottom: 0.25rem;
		padding-bottom: 0.75rem;
	}

	/* Ensure table is full width */
	table {
		width: 100%;
	}
}
</style>
