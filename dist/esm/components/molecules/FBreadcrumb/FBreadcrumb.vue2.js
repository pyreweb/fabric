import FIcon from '../../atoms/FIcon/FIcon.vue.js';
import FTypography from '../../atoms/FTypography/FTypography.vue.js';

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
	name: 'FBreadcrumb',
	components: {
		FIcon,
		FTypography
	},
	props: {
		items: {
			type: Array,
			required: true,
			validator: (value) =>
				value.every(
					(item) =>
						typeof item.label === 'string' &&
						(item.href === undefined || typeof item.href === 'string') &&
						(item.icon === undefined || typeof item.icon === 'string')
				)
		},
		separatorIcon: {
			type: String,
			default: 'chevron-right'
		},
		ariaLabel: {
			type: String,
			default: "Fil d'Ariane"
		}
	},
	computed: {
		breadcrumbClasses() {
			return 'inline-flex';
		},
		separatorClasses() {
			return 'mx-2 text-neutral-400 flex-shrink-0';
		}
	},
	methods: {
		isCurrentItem(index) {
			return index === this.items.length - 1;
		},
		getItemClasses(index) {
			const baseClasses = 'inline-flex items-center';

			if (this.isCurrentItem(index)) {
				return [baseClasses, 'cursor-default'].join(' ');
			}

			return [
				baseClasses,
				'cursor-pointer',
				'hover:underline',
				'focus:outline-none',
				'focus:ring-2',
				'focus:ring-primary-500/20',
				'focus:rounded'
			].join(' ');
		},
		getTextClasses(index) {
			if (this.isCurrentItem(index)) {
				return 'font-semibold text-neutral-800';
			}
			return 'text-primary-600 hover:text-primary-800';
		},
		handleItemClick(event, item, index) {
			if (this.isCurrentItem(index)) {
				event.preventDefault();
				return;
			}

			this.$emit('navigate', { item, index, event });

			// If the item has no href, prevent default and let the parent handle navigation
			if (!item.href) {
				event.preventDefault();
			}
		}
	}
};

export { script as default };
