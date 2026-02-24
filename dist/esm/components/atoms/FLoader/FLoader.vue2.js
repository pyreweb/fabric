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
	name: 'FLoader',
	props: {
		size: {
			type: String,
			default: 'md',
			validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
		},
		color: {
			type: String,
			default: ''
		},
		overlay: {
			type: Boolean,
			default: false
		},
		centered: {
			type: Boolean,
			default: false
		},
		label: {
			type: String,
			default: 'Chargement en cours'
		}
	},
	computed: {
		ariaLabel() {
			return this.label;
		},
		wrapperClasses() {
			const overlayClasses = this.overlay
				? 'fixed inset-0 flex items-center justify-center bg-black/50 z-50'
				: '';
			return [overlayClasses].filter(Boolean).join(' ');
		},
		containerClasses() {
			const baseClasses = 'inline-flex items-center justify-center';
			const centeredClasses =
				this.centered && !this.overlay ? 'absolute inset-0' : '';

			return [baseClasses, centeredClasses].filter(Boolean).join(' ');
		},
		spinnerClasses() {
			const baseClasses = 'animate-spin';

			const sizeClasses = {
				xs: 'w-4 h-4',
				sm: 'w-5 h-5',
				md: 'w-6 h-6',
				lg: 'w-8 h-8',
				xl: 'w-12 h-12'
			};

			const colorClasses = this.color ? '' : 'text-primary-500';

			return [baseClasses, sizeClasses[this.size], colorClasses]
				.filter(Boolean)
				.join(' ');
		},
		spinnerStyle() {
			if (this.color) {
				return { color: this.color };
			}
			return undefined;
		}
	}
};

export { script as default };
