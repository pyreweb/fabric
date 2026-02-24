import FIcon from '../../atoms/FIcon/FIcon.vue.js';
import FButton from '../../atoms/FButton/FButton.vue.js';

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


var script = {
	name: 'FSearchBar',
	components: {
		FIcon,
		FButton
	},
	props: {
		value: {
			type: [String, Number],
			default: ''
		},
		placeholder: {
			type: String,
			default: 'Rechercher...'
		},
		size: {
			type: String,
			default: 'medium',
			validator: (value) => ['small', 'medium', 'large'].includes(value)
		},
		iconPosition: {
			type: String,
			default: 'inside',
			validator: (value) => ['inside', 'outside'].includes(value)
		},
		buttonMode: {
			type: Boolean,
			default: false
		},
		buttonLabel: {
			type: String,
			default: 'Rechercher'
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		containerClasses() {
			return 'flex items-center gap-2';
		},
		inputWrapperClasses() {
			return 'relative flex-1';
		},
		inputClasses() {
			const baseClasses =
				'block w-full font-sans border rounded transition-all duration-200 box-border focus:outline-none focus:ring-2 border-neutral-300 focus:border-primary-500 focus:ring-primary-500/20';

			const sizeClasses = {
				small: 'py-1.5 px-2.5 text-xs',
				medium: 'py-2.5 px-3.5 text-sm',
				large: 'py-3.5 px-4.5 text-base'
			};

			const paddingLeftClasses = {
				small: 'pl-8',
				medium: 'pl-10',
				large: 'pl-12'
			};

			const disabledClasses = this.disabled
				? 'bg-neutral-100 cursor-not-allowed opacity-70'
				: '';

			const hasInsideIcon = this.iconPosition === 'inside' && !this.buttonMode;

			return [
				baseClasses,
				sizeClasses[this.size],
				hasInsideIcon ? paddingLeftClasses[this.size] : '',
				disabledClasses
			]
				.filter(Boolean)
				.join(' ');
		},
		iconButtonClasses() {
			const baseClasses =
				'inline-flex items-center justify-center rounded transition-all duration-200 text-neutral-500 hover:text-primary-500 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500/20';

			const sizeClasses = {
				small: 'p-1.5',
				medium: 'p-2.5',
				large: 'p-3.5'
			};

			const disabledClasses = this.disabled
				? 'opacity-50 cursor-not-allowed'
				: 'cursor-pointer';

			return [baseClasses, sizeClasses[this.size], disabledClasses]
				.filter(Boolean)
				.join(' ');
		},
		iconSize() {
			const sizeMap = {
				small: 'sm',
				medium: 'md',
				large: 'lg'
			};
			return sizeMap[this.size];
		},
		insideIconClasses() {
			const baseClasses =
				'absolute top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none';

			const leftPositionClasses = {
				small: 'left-2.5',
				medium: 'left-3',
				large: 'left-4'
			};

			return [baseClasses, leftPositionClasses[this.size]]
				.filter(Boolean)
				.join(' ');
		}
	},
	methods: {
		handleInput(event) {
			this.$emit('input', event.target.value);
		},
		handleSubmit() {
			if (!this.disabled) {
				this.$emit('search', this.value);
			}
		},
		focus() {
			this.$refs.input.focus();
		}
	}
};

export { script as default };
