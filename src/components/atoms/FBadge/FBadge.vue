<template>
	<component
		:is="tag"
		:class="computedClasses"
		:aria-label="computedAriaLabel"
	>
		<template v-if="!dot">
			<slot>{{ content }}</slot>
		</template>
	</component>
</template>

<script>
export default {
	name: 'FBadge',
	props: {
		content: {
			type: [String, Number],
			default: ''
		},
		variant: {
			type: String,
			default: 'primary',
			validator: (value) =>
				['primary', 'success', 'warning', 'error', 'neutral'].includes(
					value
				)
		},
		shape: {
			type: String,
			default: 'pill',
			validator: (value) => ['pill', 'circle', 'rounded'].includes(value)
		},
		size: {
			type: String,
			default: 'md',
			validator: (value) => ['sm', 'md', 'lg'].includes(value)
		},
		dot: {
			type: Boolean,
			default: false
		},
		outlined: {
			type: Boolean,
			default: false
		},
		tag: {
			type: String,
			default: 'span'
		}
	},
	computed: {
		computedAriaLabel() {
			if (this.dot) {
				return `Status: ${this.variant}`;
			}
			return null;
		},
		computedClasses() {
			const base =
				'inline-flex items-center justify-center font-sans font-medium transition-colors duration-200';

			const variants = {
				primary: this.outlined
					? 'border border-blue-500 text-blue-500 bg-transparent'
					: 'bg-blue-500 text-white',
				success: this.outlined
					? 'border border-green-500 text-green-500 bg-transparent'
					: 'bg-green-500 text-white',
				warning: this.outlined
					? 'border border-yellow-600 text-yellow-600 bg-transparent'
					: 'bg-yellow-600 text-white',
				error: this.outlined
					? 'border border-red-500 text-red-500 bg-transparent'
					: 'bg-red-500 text-white',
				neutral: this.outlined
					? 'border border-gray-500 text-gray-500 bg-transparent'
					: 'bg-gray-500 text-white'
			};

			if (this.dot) {
				return [
					base,
					variants[this.variant].split(' ')[0],
					this.outlined
						? ''
						: variants[this.variant]
								.split(' ')[0]
								.replace('bg-', 'bg-'),
					'rounded-full',
					this.size === 'sm'
						? 'w-1.5 h-1.5'
						: this.size === 'lg'
						? 'w-3 h-3'
						: 'w-2 h-2'
				].join(' ');
			}

			const sizes = {
				sm:
					this.shape === 'circle'
						? 'w-4 h-4 text-[10px]'
						: 'px-1.5 py-0.5 text-[10px]',
				md:
					this.shape === 'circle'
						? 'w-6 h-6 text-xs'
						: 'px-2.5 py-0.5 text-xs',
				lg:
					this.shape === 'circle'
						? 'w-8 h-8 text-sm'
						: 'px-3 py-1 text-sm'
			};

			const shapes = {
				pill: 'rounded-full',
				circle: 'rounded-full',
				rounded: 'rounded-md'
			};

			return [
				base,
				variants[this.variant],
				sizes[this.size],
				shapes[this.shape]
			].join(' ');
		}
	}
};
</script>
