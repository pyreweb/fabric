<template>
	<aside
		:class="sidebarClasses"
		:style="getSidebarStyle()"
		:aria-hidden="!isOpen"
		role="complementary"
		aria-label="Barre latérale de filtres"
	>
		<!-- Mobile Overlay -->
		<div
			v-if="isMobile && isOpen"
			class="fixed inset-0 bg-black bg-opacity-50 z-40"
			@click="closeSidebar"
		></div>

		<!-- Sidebar Content -->
		<div :class="contentClasses">
			<!-- Header -->
			<div
				class="flex items-center justify-between p-4 border-b border-neutral-200"
			>
				<f-typography variant="h5">
					{{ title }}
				</f-typography>
				<f-button
					v-if="closable"
					variant="ghost"
					size="small"
					@click="closeSidebar"
				>
					<f-icon name="close" size="sm" />
					<span class="sr-only">Fermer les filtres</span>
				</f-button>
			</div>

			<!-- Filter Form -->
			<f-form class="flex-1 overflow-y-auto" @submit="handleSubmit">
				<div class="p-4 space-y-4">
					<slot>
						<!-- Default filter groups using accordion -->
						<f-accordion-item
							v-for="(group, index) in filterGroups"
							:key="group.id || index"
							:title="group.title"
							:default-open="group.defaultOpen !== false"
						>
							<div class="space-y-3">
								<!-- Checkbox filters -->
								<template v-if="group.type === 'checkbox'">
									<f-checkbox
										v-for="option in group.options"
										:key="option.value"
										:label="option.label"
										:checked="isChecked(group.name, option.value)"
										:disabled="option.disabled"
										@change="
											handleCheckboxChange(group.name, option.value, $event)
										"
									/>
								</template>

								<!-- Radio filters -->
								<template v-else-if="group.type === 'radio'">
									<f-radio
										v-for="option in group.options"
										:key="option.value"
										:label="option.label"
										:value="option.value"
										:name="group.name"
										:model-value="getFilterValue(group.name)"
										:disabled="option.disabled"
										@change="handleRadioChange(group.name, $event)"
									/>
								</template>

								<!-- Toggle filters -->
								<template v-else-if="group.type === 'toggle'">
									<f-toggle
										v-for="option in group.options"
										:key="option.value"
										:label="option.label"
										:value="getToggleValue(group.name, option.value)"
										:disabled="option.disabled"
										@input="
											handleToggleChange(group.name, option.value, $event)
										"
									/>
								</template>

								<!-- Text/Input filters -->
								<template v-else-if="group.type === 'text'">
									<f-form-field
										v-for="option in group.options"
										:key="option.value"
										:label="option.label"
										:placeholder="option.placeholder"
										:value="getFilterValue(group.name + '.' + option.value)"
										@input="handleInputChange(group.name, option.value, $event)"
									/>
								</template>
							</div>
						</f-accordion-item>
					</slot>
				</div>

				<!-- Actions -->
				<template #actions>
					<div class="p-4 border-t border-neutral-200 space-y-2">
						<f-button type="submit" variant="primary" block>
							{{ applyLabel }}
						</f-button>
						<f-button
							type="button"
							variant="outline"
							block
							@click="handleReset"
						>
							{{ resetLabel }}
						</f-button>
					</div>
				</template>
			</f-form>
		</div>
	</aside>
</template>

<script>
import FTypography from '../../atoms/FTypography/FTypography.vue';
import FButton from '../../atoms/FButton/FButton.vue';
import FIcon from '../../atoms/FIcon/FIcon.vue';
import FCheckbox from '../../atoms/FCheckbox/FCheckbox.vue';
import FRadio from '../../atoms/FRadio/FRadio.vue';
import FToggle from '../../atoms/FToggle/FToggle.vue';
import FForm from '../FForm/FForm.vue';
import FAccordionItem from '../../molecules/FAccordionItem/FAccordionItem.vue';
import FFormField from '../../molecules/FFormField/FFormField.vue';

export default {
	name: 'FFilterSidebar',
	components: {
		FTypography,
		FButton,
		FIcon,
		FCheckbox,
		FRadio,
		FToggle,
		FForm,
		FAccordionItem,
		FFormField
	},
	props: {
		/**
		 * Controls the visibility of the sidebar.
		 * Use v-model for two-way binding.
		 */
		value: {
			type: Boolean,
			default: true
		},
		/**
		 * Title displayed in the sidebar header
		 */
		title: {
			type: String,
			default: 'Filtres'
		},
		/**
		 * Label for the apply button
		 */
		applyLabel: {
			type: String,
			default: 'Appliquer les filtres'
		},
		/**
		 * Label for the reset button
		 */
		resetLabel: {
			type: String,
			default: 'Réinitialiser'
		},
		/**
		 * Show the close button in the header
		 */
		closable: {
			type: Boolean,
			default: true
		},
		/**
		 * Sidebar position
		 */
		position: {
			type: String,
			default: 'left',
			validator: (value) => ['left', 'right'].includes(value)
		},
		/**
		 * Width of the sidebar
		 */
		width: {
			type: String,
			default: '280px'
		},
		/**
		 * Filter groups configuration
		 * Each group has: { id, title, name, type, options, defaultOpen }
		 * type: 'checkbox' | 'radio' | 'toggle' | 'text'
		 * options: [{ value, label, placeholder?, disabled? }]
		 */
		filterGroups: {
			type: Array,
			default: () => []
		},
		/**
		 * Initial filter values
		 * Object with group names as keys
		 */
		filters: {
			type: Object,
			default: () => ({})
		},
		/**
		 * Enable mobile-responsive overlay behavior
		 */
		mobileBreakpoint: {
			type: Number,
			default: 768
		}
	},
	data() {
		return {
			localFilters: {},
			isMobile: false
		};
	},
	computed: {
		/**
		 * Computed property for v-model support
		 */
		isOpen: {
			get() {
				return this.value;
			},
			set(val) {
				this.$emit('input', val);
			}
		},
		/**
		 * Sidebar wrapper classes
		 */
		sidebarClasses() {
			const baseClasses = 'flex flex-col bg-white';

			const positionClasses = this.isMobile
				? this.getMobilePositionClasses()
				: this.getDesktopPositionClasses();

			const visibilityClasses = this.isOpen
				? 'translate-x-0'
				: this.position === 'left'
				? '-translate-x-full'
				: 'translate-x-full';

			return [
				baseClasses,
				positionClasses,
				this.isMobile ? visibilityClasses : '',
				'transition-transform duration-[var(--transition-duration-slow)] ease-[var(--transition-easing-emphasized)]'
			]
				.filter(Boolean)
				.join(' ');
		},
		/**
		 * Content wrapper classes
		 */
		contentClasses() {
			const baseClasses = 'flex flex-col h-full bg-white border-neutral-200';
			const borderClasses = this.position === 'left' ? 'border-r' : 'border-l';

			return [baseClasses, borderClasses].filter(Boolean).join(' ');
		}
	},
	watch: {
		filters: {
			immediate: true,
			deep: true,
			handler(newFilters) {
				this.localFilters = JSON.parse(JSON.stringify(newFilters || {}));
			}
		},
		isOpen(newValue) {
			if (this.isMobile) {
				if (newValue) {
					document.body.style.overflow = 'hidden';
				} else {
					document.body.style.overflow = '';
				}
			}
		}
	},
	mounted() {
		this.checkMobile();
		window.addEventListener('resize', this.checkMobile);
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.checkMobile);
		document.body.style.overflow = '';
	},
	methods: {
		/**
		 * Get desktop position classes
		 */
		getDesktopPositionClasses() {
			return 'relative flex-shrink-0';
		},
		/**
		 * Get sidebar inline styles
		 */
		getSidebarStyle() {
			if (!this.isMobile) {
				return { width: this.width };
			}
			return {};
		},
		/**
		 * Get mobile position classes
		 */
		getMobilePositionClasses() {
			const positionClasses = this.position === 'left' ? 'left-0' : 'right-0';

			return `fixed top-0 ${positionClasses} bottom-0 z-50 w-80 max-w-full`;
		},
		/**
		 * Check if viewport is mobile
		 */
		checkMobile() {
			this.isMobile = window.innerWidth < this.mobileBreakpoint;
		},
		/**
		 * Close the sidebar
		 */
		closeSidebar() {
			this.isOpen = false;
			this.$emit('close');
		},
		/**
		 * Get filter value for a specific key
		 */
		getFilterValue(key) {
			const keys = key.split('.');
			let value = this.localFilters;
			for (const k of keys) {
				if (value === undefined || value === null) return null;
				value = value[k];
			}
			return value;
		},
		/**
		 * Check if a checkbox option is checked
		 */
		isChecked(groupName, optionValue) {
			const groupValues = this.localFilters[groupName];
			if (Array.isArray(groupValues)) {
				return groupValues.includes(optionValue);
			}
			return false;
		},
		/**
		 * Get toggle value for a specific option
		 */
		getToggleValue(groupName, optionValue) {
			const groupValues = this.localFilters[groupName];
			if (typeof groupValues === 'object' && groupValues !== null) {
				return Boolean(groupValues[optionValue]);
			}
			return false;
		},
		/**
		 * Handle checkbox change
		 */
		handleCheckboxChange(groupName, optionValue, checked) {
			if (!this.localFilters[groupName]) {
				this.$set(this.localFilters, groupName, []);
			}

			const values = [...this.localFilters[groupName]];
			const index = values.indexOf(optionValue);

			if (checked && index === -1) {
				values.push(optionValue);
			} else if (!checked && index !== -1) {
				values.splice(index, 1);
			}

			this.$set(this.localFilters, groupName, values);
			this.$emit('filter-change', { group: groupName, value: values });
		},
		/**
		 * Handle radio change
		 */
		handleRadioChange(groupName, value) {
			this.$set(this.localFilters, groupName, value);
			this.$emit('filter-change', { group: groupName, value });
		},
		/**
		 * Handle toggle change
		 */
		handleToggleChange(groupName, optionValue, checked) {
			if (!this.localFilters[groupName]) {
				this.$set(this.localFilters, groupName, {});
			}

			this.$set(this.localFilters[groupName], optionValue, checked);
			this.$emit('filter-change', {
				group: groupName,
				option: optionValue,
				value: checked
			});
		},
		/**
		 * Handle input change
		 */
		handleInputChange(groupName, optionValue, value) {
			const key = `${groupName}.${optionValue}`;
			const keys = key.split('.');
			let current = this.localFilters;

			for (let i = 0; i < keys.length - 1; i++) {
				if (!current[keys[i]]) {
					this.$set(current, keys[i], {});
				}
				current = current[keys[i]];
			}

			this.$set(current, keys[keys.length - 1], value);
			this.$emit('filter-change', {
				group: groupName,
				option: optionValue,
				value
			});
		},
		/**
		 * Handle form submission
		 */
		handleSubmit() {
			this.$emit('apply', this.localFilters);
			this.$emit('submit', this.localFilters);
		},
		/**
		 * Handle reset action
		 */
		handleReset() {
			this.localFilters = {};
			this.$emit('reset');
			this.$emit('update:filters', {});
		}
	}
};
</script>
