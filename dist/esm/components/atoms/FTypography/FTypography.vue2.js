//
//
//
//
//
//

var script = {
	name: 'FTypography',
	props: {
		variant: {
			type: String,
			default: 'body',
			validator: (value) =>
				[
					'h1',
					'h2',
					'h3',
					'h4',
					'h5',
					'h6',
					'body',
					'caption',
					'overline'
				].includes(value)
		},
		tag: {
			type: String,
			default: null
		},
		truncate: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		computedTag() {
			if (this.tag) return this.tag;
			const tagMap = {
				h1: 'h1',
				h2: 'h2',
				h3: 'h3',
				h4: 'h4',
				h5: 'h5',
				h6: 'h6',
				body: 'p',
				caption: 'span',
				overline: 'span'
			};
			return tagMap[this.variant] || 'p';
		},
		typographyClasses() {
			const baseClasses = 'm-0 font-sans text-neutral-800';

			const variantClasses = {
				h1: 'text-4xl font-bold leading-tight',
				h2: 'text-3xl font-bold leading-snug',
				h3: 'text-2xl font-semibold leading-normal',
				h4: 'text-xl font-semibold leading-normal',
				h5: 'text-lg font-medium leading-relaxed',
				h6: 'text-base font-medium leading-normal',
				body: 'text-base font-normal leading-relaxed',
				caption: 'text-sm font-normal leading-normal text-neutral-500',
				overline:
					'text-xs font-semibold leading-normal uppercase tracking-wider text-neutral-500'
			};

			const truncateClasses = this.truncate
				? 'overflow-hidden text-ellipsis whitespace-nowrap'
				: '';

			return [baseClasses, variantClasses[this.variant], truncateClasses]
				.filter(Boolean)
				.join(' ');
		}
	}
};

export { script as default };
