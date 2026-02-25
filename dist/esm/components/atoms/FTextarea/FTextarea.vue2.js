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

let idCounter = 0;

var script = {
	name: 'FTextarea',
	props: {
		value: {
			type: String,
			default: ''
		},
		label: {
			type: String,
			default: ''
		},
		placeholder: {
			type: String,
			default: ''
		},
		rows: {
			type: [Number, String],
			default: 3
		},
		disabled: {
			type: Boolean,
			default: false
		},
		readonly: {
			type: Boolean,
			default: false
		},
		error: {
			type: Boolean,
			default: false
		},
		errorMessage: {
			type: String,
			default: ''
		},
		maxlength: {
			type: [Number, String],
			default: null
		},
		showCounter: {
			type: Boolean,
			default: false
		}
	},
	data() {
		const id = ++idCounter;
		return {
			inputId: `ftextarea-${id}`,
			errorId: `ftextarea-error-${id}`
		};
	},
	computed: {
		wrapperClasses() {
			return 'flex flex-col';
		},
		labelClasses() {
			const baseClasses = 'font-sans text-sm text-neutral-700 mb-1';
			const errorClasses = this.error ? 'text-danger-500' : '';

			return [baseClasses, errorClasses].filter(Boolean).join(' ');
		},
		textareaClasses() {
			const baseClasses =
				'block w-full font-sans border rounded box-border focus:outline-none focus:ring-2 resize-y';

			const transitionClasses =
				'transition-all duration-[var(--transition-duration-base)] ease-[var(--transition-easing-standard)]';

			const stateClasses = this.error
				? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/20'
				: 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500/20';

			const disabledClasses = this.disabled
				? 'bg-neutral-100 cursor-not-allowed opacity-70'
				: '';

			const paddingClasses = 'py-2.5 px-3.5 text-sm';

			return [
				baseClasses,
				transitionClasses,
				paddingClasses,
				stateClasses,
				disabledClasses
			]
				.filter(Boolean)
				.join(' ');
		},
		footerClasses() {
			return 'flex justify-between items-center mt-1';
		},
		errorMessageClasses() {
			return 'font-sans text-xs text-danger-500';
		},
		counterClasses() {
			const baseClasses = 'font-sans text-xs';
			const stateClasses = this.isOverLimit
				? 'text-danger-500'
				: 'text-neutral-500';

			return [baseClasses, stateClasses].filter(Boolean).join(' ');
		},
		characterCount() {
			return this.value ? this.value.length : 0;
		},
		isOverLimit() {
			return this.maxlength && this.characterCount > Number(this.maxlength);
		},
		hasCounter() {
			return this.showCounter && this.maxlength;
		}
	},
	methods: {
		handleInput(event) {
			this.$emit('input', event.target.value);
		}
	}
};

export { script as default };
