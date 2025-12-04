<template>
	<component
		:is="componentTag"
		:class="computedClasses"
		:type="isButton ? type : null"
		:disabled="isDisabled"
		:to="to"
		:href="href"
		:target="target"
		:aria-disabled="isDisabled"
		@click="handleClick"
		v-on="$listeners"
	>
		<f-loader
			v-if="loading"
			size="xs"
			color="currentColor"
			class="-ml-1 mr-2"
		/>

		<span v-if="$slots.iconLeft && !loading" class="mr-2 flex items-center">
			<slot name="iconLeft" />
		</span>

		<span :class="{ 'opacity-0': loading && !loadingText }">
			<slot>{{ loadingText }}</slot>
		</span>

		<span
			v-if="$slots.iconRight && !loading"
			class="ml-2 flex items-center"
		>
			<slot name="iconRight" />
		</span>
	</component>
</template>

<script>
import FLoader from '../FLoader/FLoader.vue';

export default {
	name: 'FButton',
	components: {
		FLoader
	},
	props: {
		variant: {
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
		},
		size: {
			type: String,
			default: 'medium',
			validator: (value) =>
				['xs', 'small', 'medium', 'large', 'xl'].includes(value)
		},
		type: {
			type: String,
			default: 'button'
		},
		disabled: {
			type: Boolean,
			default: false
		},
		loading: {
			type: Boolean,
			default: false
		},
		loadingText: {
			type: String,
			default: ''
		},
		block: {
			type: Boolean,
			default: false
		},
		to: {
			type: [String, Object],
			default: null
		},
		href: {
			type: String,
			default: null
		},
		target: {
			type: String,
			default: null
		}
	},
	computed: {
		isButton() {
			return !this.to && !this.href;
		},
		componentTag() {
			if (this.to) return 'router-link';
			if (this.href) return 'a';
			return 'button';
		},
		isDisabled() {
			return this.disabled || this.loading;
		},
		computedClasses() {
			const base =
				'inline-flex items-center justify-center border font-medium rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200';

			const sizes = {
				xs: 'px-2.5 py-1.5 text-xs',
				small: 'px-3 py-2 text-sm leading-4',
				medium: 'px-4 py-2 text-sm',
				large: 'px-4 py-2 text-base',
				xl: 'px-6 py-3 text-base'
			};

			const variants = {
				primary:
					'border-transparent text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
				secondary:
					'border-transparent text-blue-700 bg-blue-100 hover:bg-blue-200 focus:ring-blue-500',
				danger: 'border-transparent text-white bg-red-600 hover:bg-red-700 focus:ring-red-500',
				success:
					'border-transparent text-white bg-green-600 hover:bg-green-700 focus:ring-green-500',
				outline:
					'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500',
				ghost: 'border-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500 shadow-none',
				link: 'border-transparent text-blue-600 hover:text-blue-800 underline shadow-none px-0 bg-transparent'
			};

			const stateClasses = this.isDisabled
				? 'opacity-60 cursor-not-allowed pointer-events-none'
				: 'cursor-pointer';

			const widthClass = this.block ? 'w-full' : '';

			return [
				base,
				sizes[this.size],
				variants[this.variant],
				stateClasses,
				widthClass
			];
		}
	},
	methods: {
		handleClick(event) {
			if (this.isDisabled) {
				event.preventDefault();
				event.stopPropagation();
				return;
			}
			this.$emit('click', event);
		}
	}
};
</script>
