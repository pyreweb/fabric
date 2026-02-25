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


var script = {
	name: 'FEmptyState',
	components: {
		FIcon,
		FTypography,
		FButton
	},
	props: {
		icon: {
			type: String,
			default: 'folder'
		},
		title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			default: ''
		},
		actionLabel: {
			type: String,
			default: ''
		},
		actionVariant: {
			type: String,
			default: 'primary',
			validator: (value) =>
				[
					'primary',
					'secondary',
					'danger',
					'success',
					'outline',
					'ghost',
					'link'
				].includes(value)
		}
	},
	computed: {
		containerClasses() {
			return 'flex flex-col items-center justify-center text-center py-12 px-4';
		},
		iconClasses() {
			return 'text-neutral-400 mb-4';
		},
		titleClasses() {
			return 'text-neutral-700 mb-2';
		},
		descriptionClasses() {
			return 'text-neutral-500 max-w-md mb-6';
		},
		actionClasses() {
			return 'mt-4';
		}
	},
	methods: {
		handleAction(event) {
			this.$emit('action', event);
		}
	}
};

export { script as default };
