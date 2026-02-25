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


var script = {
	name: 'FCard',
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
		bordered: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		cardClasses() {
			const baseClasses = 'bg-white rounded-lg overflow-hidden';
			const transitionClasses =
				'transition-all duration-[var(--transition-duration-base)] ease-[var(--transition-easing-standard)]';
			const borderedClasses = this.bordered ? 'border border-neutral-200' : '';
			const clickableClasses = this.clickable
				? 'cursor-pointer hover:shadow-lg hover:-translate-y-0.5'
				: '';

			return [baseClasses, transitionClasses, borderedClasses, clickableClasses]
				.filter(Boolean)
				.join(' ');
		}
	},
	methods: {
		handleClick(event) {
			if (this.clickable) {
				this.$emit('click', event);
			}
		}
	}
};

export { script as default };
