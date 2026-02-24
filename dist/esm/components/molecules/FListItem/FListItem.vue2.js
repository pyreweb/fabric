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
//
//
//
//


var script = {
	name: 'FListItem',
	components: {
		FTypography
	},
	props: {
		title: {
			type: String,
			default: ''
		},
		subtitle: {
			type: String,
			default: ''
		},
		clickable: {
			type: Boolean,
			default: false
		},
		selected: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		truncate: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		listItemClasses() {
			const baseClasses = 'flex items-center gap-3 px-4 py-3';
			const transitionClasses =
				'transition-all duration-[var(--transition-duration-base)] ease-[var(--transition-easing-standard)]';
			const clickableClasses =
				this.clickable && !this.disabled
					? 'cursor-pointer hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500/20'
					: '';
			const selectedClasses = this.selected ? 'bg-primary-50' : '';
			const disabledClasses = this.disabled
				? 'opacity-50 cursor-not-allowed'
				: '';

			return [
				baseClasses,
				transitionClasses,
				clickableClasses,
				selectedClasses,
				disabledClasses
			]
				.filter(Boolean)
				.join(' ');
		},
		titleClasses() {
			return this.disabled ? 'text-neutral-400' : '';
		},
		subtitleClasses() {
			return this.disabled ? 'text-neutral-300' : '';
		}
	},
	methods: {
		handleClick(event) {
			if (!this.disabled && this.clickable) {
				this.$emit('click', event);
			}
		}
	}
};

export { script as default };
