import FIcon from '../../atoms/FIcon/FIcon.vue.js';
import FTypography from '../../atoms/FTypography/FTypography.vue.js';
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


const VARIANT_COLORS = {
	success: {
		container: 'bg-success-50 border-success-200 text-success-800',
		title: 'text-success-800',
		message: 'text-success-700',
		closeButton: 'text-success-600 hover:text-success-800'
	},
	error: {
		container: 'bg-danger-50 border-danger-200 text-danger-800',
		title: 'text-danger-800',
		message: 'text-danger-700',
		closeButton: 'text-danger-600 hover:text-danger-800'
	},
	info: {
		container: 'bg-primary-50 border-primary-200 text-primary-800',
		title: 'text-primary-800',
		message: 'text-primary-700',
		closeButton: 'text-primary-600 hover:text-primary-800'
	}
};

var script = {
	name: 'FAlert',
	components: {
		FIcon,
		FTypography,
		FButton
	},
	props: {
		variant: {
			type: String,
			default: 'info',
			validator: (value) => ['success', 'error', 'info'].includes(value)
		},
		title: {
			type: String,
			default: ''
		},
		message: {
			type: String,
			default: ''
		},
		closable: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			isVisible: true
		};
	},
	computed: {
		variantColors() {
			return VARIANT_COLORS[this.variant];
		},
		alertClasses() {
			const baseClasses = 'flex items-start gap-3 p-4 rounded-lg border';
			return `${baseClasses} ${this.variantColors.container}`;
		},
		titleClasses() {
			return this.variantColors.title;
		},
		messageClasses() {
			return this.variantColors.message;
		},
		closeButtonClasses() {
			return `flex-shrink-0 ${this.variantColors.closeButton}`;
		}
	},
	methods: {
		handleClose() {
			this.isVisible = false;
			this.$emit('close');
		}
	}
};

export { script as default };
