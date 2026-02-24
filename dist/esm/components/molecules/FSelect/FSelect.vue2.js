import FIcon from '../../atoms/FIcon/FIcon.vue.js';
import FLoader from '../../atoms/FLoader/FLoader.vue.js';
import FCheckbox from '../../atoms/FCheckbox/FCheckbox.vue.js';

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


let selectCounter = 0;

var script = {
	name: 'FSelect',
	components: {
		FIcon,
		FLoader,
		FCheckbox
	},
	props: {
		/**
		 * Valeur sélectionnée (v-model)
		 * Pour sélection simple: string | number | object
		 * Pour sélection multiple: Array
		 */
		value: {
			type: [String, Number, Object, Array],
			default: null
		},
		/**
		 * Liste des options
		 */
		options: {
			type: Array,
			default: () => []
		},
		/**
		 * Clé pour identifier une option (si options sont des objets)
		 */
		optionKey: {
			type: String,
			default: 'value'
		},
		/**
		 * Clé pour le label d'une option (si options sont des objets)
		 */
		optionLabel: {
			type: String,
			default: 'label'
		},
		/**
		 * Clé pour désactiver une option (si options sont des objets)
		 */
		optionDisabled: {
			type: String,
			default: 'disabled'
		},
		/**
		 * Texte affiché quand aucune valeur n'est sélectionnée
		 */
		placeholder: {
			type: String,
			default: 'Sélectionner...'
		},
		/**
		 * Taille du composant
		 */
		size: {
			type: String,
			default: 'medium',
			validator: (value) => ['small', 'medium', 'large'].includes(value)
		},
		/**
		 * Activer la sélection multiple
		 */
		multiple: {
			type: Boolean,
			default: false
		},
		/**
		 * Activer le champ de recherche
		 */
		searchable: {
			type: Boolean,
			default: false
		},
		/**
		 * Placeholder du champ de recherche
		 */
		searchPlaceholder: {
			type: String,
			default: 'Rechercher...'
		},
		/**
		 * Texte affiché quand aucune option ne correspond à la recherche
		 */
		emptyText: {
			type: String,
			default: 'Aucune option trouvée'
		},
		/**
		 * État de chargement (pour options asynchrones)
		 */
		loading: {
			type: Boolean,
			default: false
		},
		/**
		 * Texte affiché pendant le chargement
		 */
		loadingText: {
			type: String,
			default: 'Chargement...'
		},
		/**
		 * État désactivé
		 */
		disabled: {
			type: Boolean,
			default: false
		},
		/**
		 * État d'erreur
		 */
		error: {
			type: Boolean,
			default: false
		},
		/**
		 * ID du label associé (pour accessibilité)
		 */
		labelId: {
			type: String,
			default: null
		},
		/**
		 * Fonction de filtrage personnalisée
		 */
		filterMethod: {
			type: Function,
			default: null
		}
	},
	data() {
		return {
			uniqueId: ++selectCounter,
			isOpen: false,
			searchQuery: '',
			focusedIndex: -1
		};
	},
	computed: {
		triggerId() {
			return `fselect-trigger-${this.uniqueId}`;
		},
		containerClasses() {
			return 'relative inline-block w-full';
		},
		triggerClasses() {
			const baseClasses =
				'flex items-center justify-between w-full font-sans border rounded box-border focus:outline-none focus:ring-2 text-left';

			const transitionClasses =
				'transition-all duration-[var(--transition-duration-base)] ease-[var(--transition-easing-standard)]';

			const sizeClasses = {
				small: 'py-1.5 px-2.5 text-xs',
				medium: 'py-2.5 px-3.5 text-sm',
				large: 'py-3.5 px-4.5 text-base'
			};

			const stateClasses = this.error
				? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/20'
				: 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500/20';

			const disabledClasses = this.disabled
				? 'bg-neutral-100 cursor-not-allowed opacity-70'
				: 'bg-white cursor-pointer hover:border-neutral-400';

			return [
				baseClasses,
				transitionClasses,
				sizeClasses[this.size],
				stateClasses,
				disabledClasses
			]
				.filter(Boolean)
				.join(' ');
		},
		valueClasses() {
			const baseClasses = 'flex-1 truncate';
			const placeholderClasses = !this.hasValue
				? 'text-neutral-400'
				: 'text-neutral-900';
			return [baseClasses, placeholderClasses].join(' ');
		},
		iconClasses() {
			const baseClasses = 'ml-2 flex-shrink-0';
			const transitionClasses =
				'transition-transform duration-[var(--transition-duration-base)] ease-[var(--transition-easing-standard)]';
			const colorClasses = this.disabled
				? 'text-neutral-400'
				: 'text-neutral-500';
			return [baseClasses, transitionClasses, colorClasses].join(' ');
		},
		dropdownClasses() {
			return 'absolute z-50 w-full mt-1 bg-white border border-neutral-200 rounded shadow-lg max-h-60 overflow-hidden';
		},
		searchInputClasses() {
			return 'w-full pl-8 pr-2.5 py-1.5 text-sm border border-neutral-300 rounded focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20';
		},
		optionsListClasses() {
			return 'max-h-48 overflow-y-auto';
		},
		optionLabelClasses() {
			return 'flex-1';
		},
		hasValue() {
			if (this.multiple) {
				return Array.isArray(this.value) && this.value.length > 0;
			}
			return (
				this.value !== null && this.value !== undefined && this.value !== ''
			);
		},
		displayValue() {
			if (!this.hasValue) {
				return this.placeholder;
			}

			if (this.multiple && Array.isArray(this.value)) {
				const labels = this.value.map((val) => {
					const option = this.options.find(
						(opt) => this.getOptionValue(opt) === this.getOptionValue(val)
					);
					return option
						? this.getOptionLabel(option)
						: this.getOptionLabel(val);
				});
				return labels.join(', ');
			}

			const selectedOption = this.options.find(
				(opt) => this.getOptionValue(opt) === this.getOptionValue(this.value)
			);
			return selectedOption
				? this.getOptionLabel(selectedOption)
				: this.getOptionLabel(this.value);
		},
		filteredOptions() {
			if (!this.searchQuery) {
				return this.options;
			}

			if (this.filterMethod) {
				return this.filterMethod(this.searchQuery, this.options);
			}

			const query = this.searchQuery.toLowerCase();
			return this.options.filter((option) => {
				const label = this.getOptionLabel(option).toLowerCase();
				return label.includes(query);
			});
		}
	},
	watch: {
		isOpen(newValue) {
			if (newValue) {
				this.$nextTick(() => {
					if (this.searchable && this.$refs.searchInput) {
						this.$refs.searchInput.focus();
					}
					this.setupClickOutside();
				});
				this.$emit('open');
			} else {
				this.searchQuery = '';
				this.focusedIndex = -1;
				this.removeClickOutside();
				this.$emit('close');
			}
		}
	},
	beforeDestroy() {
		this.removeClickOutside();
	},
	methods: {
		getOptionKey(option, index) {
			if (typeof option === 'object' && option !== null) {
				return option[this.optionKey] || index;
			}
			return option || index;
		},
		getOptionValue(option) {
			if (typeof option === 'object' && option !== null) {
				return option[this.optionKey];
			}
			return option;
		},
		getOptionLabel(option) {
			if (typeof option === 'object' && option !== null) {
				return option[this.optionLabel] || '';
			}
			return String(option);
		},
		isDisabled(option) {
			if (typeof option === 'object' && option !== null) {
				return option[this.optionDisabled] || false;
			}
			return false;
		},
		isSelected(option) {
			const optionValue = this.getOptionValue(option);

			if (this.multiple && Array.isArray(this.value)) {
				return this.value.some(
					(val) => this.getOptionValue(val) === optionValue
				);
			}

			return this.getOptionValue(this.value) === optionValue;
		},
		getOptionClasses(option, index) {
			const baseClasses = 'flex items-center gap-2 px-3 py-2 cursor-pointer';
			const transitionClasses =
				'transition-colors duration-[var(--transition-duration-fast)] ease-[var(--transition-easing-standard)]';
			const hoverClasses = 'hover:bg-neutral-50';
			const focusedClasses =
				this.focusedIndex === index ? 'bg-neutral-100' : '';
			const selectedClasses = this.isSelected(option)
				? 'bg-primary-50 text-primary-700'
				: '';
			const disabledClasses = this.isDisabled(option)
				? 'opacity-50 cursor-not-allowed'
				: '';

			return [
				baseClasses,
				transitionClasses,
				!this.isDisabled(option) && hoverClasses,
				focusedClasses,
				selectedClasses,
				disabledClasses
			]
				.filter(Boolean)
				.join(' ');
		},
		toggleDropdown() {
			if (this.disabled) return;
			this.isOpen = !this.isOpen;
		},
		openDropdown() {
			if (this.disabled) return;
			this.isOpen = true;
		},
		closeDropdown() {
			this.isOpen = false;
		},
		handleOptionClick(option) {
			if (this.isDisabled(option)) return;

			const optionValue = this.getOptionValue(option);

			if (this.multiple) {
				let newValue = Array.isArray(this.value) ? [...this.value] : [];
				const index = newValue.findIndex(
					(val) => this.getOptionValue(val) === optionValue
				);

				if (index > -1) {
					newValue.splice(index, 1);
				} else {
					newValue.push(optionValue);
				}

				this.$emit('input', newValue);
				this.$emit('change', newValue);
			} else {
				this.$emit('input', optionValue);
				this.$emit('change', optionValue);
				this.closeDropdown();
			}
		},
		handleKeyboardNavigation(direction) {
			const maxIndex = this.filteredOptions.length - 1;

			if (direction === 'down') {
				this.focusedIndex =
					this.focusedIndex < maxIndex ? this.focusedIndex + 1 : 0;
			} else if (direction === 'up') {
				this.focusedIndex =
					this.focusedIndex > 0 ? this.focusedIndex - 1 : maxIndex;
			}

			this.scrollToFocusedOption();
		},
		handleEnterKey() {
			if (
				this.focusedIndex >= 0 &&
				this.focusedIndex < this.filteredOptions.length
			) {
				const option = this.filteredOptions[this.focusedIndex];
				this.handleOptionClick(option);
			}
		},
		scrollToFocusedOption() {
			this.$nextTick(() => {
				const optionsList = this.$refs.optionsList;
				// Dynamic refs in v-for return an array, so we access [0]
				const focusedOption = this.$refs[`option-${this.focusedIndex}`];

				if (optionsList && focusedOption && focusedOption[0]) {
					const optionElement = focusedOption[0];
					const optionTop = optionElement.offsetTop;
					const optionHeight = optionElement.offsetHeight;
					const listScrollTop = optionsList.scrollTop;
					const listHeight = optionsList.clientHeight;

					if (optionTop < listScrollTop) {
						optionsList.scrollTop = optionTop;
					} else if (optionTop + optionHeight > listScrollTop + listHeight) {
						optionsList.scrollTop = optionTop + optionHeight - listHeight;
					}
				}
			});
		},
		setupClickOutside() {
			this.clickOutsideHandler = (event) => {
				const dropdown = this.$refs.dropdown;
				const trigger = this.$refs.trigger;
				const target = event.target;

				if (
					target instanceof Node &&
					dropdown &&
					!dropdown.contains(target) &&
					trigger &&
					!trigger.contains(target)
				) {
					this.closeDropdown();
				}
			};

			document.addEventListener('click', this.clickOutsideHandler);
		},
		removeClickOutside() {
			if (this.clickOutsideHandler) {
				document.removeEventListener('click', this.clickOutsideHandler);
			}
		}
	}
};

export { script as default };
