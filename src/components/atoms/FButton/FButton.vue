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

		<span v-if="$slots.iconRight && !loading" class="ml-2 flex items-center">
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
					'border-transparent text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-500',
				secondary:
					'border-transparent text-primary-700 bg-primary-100 hover:bg-primary-200 focus:ring-primary-500',
				danger:
					'border-transparent text-white bg-danger-600 hover:bg-danger-700 focus:ring-danger-500',
				success:
					'border-transparent text-white bg-success-600 hover:bg-success-700 focus:ring-success-500',
				outline:
					'border-neutral-300 text-neutral-700 bg-white hover:bg-neutral-50 focus:ring-primary-500',
				ghost:
					'border-transparent text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 focus:ring-neutral-500 shadow-none',
				link: 'border-transparent text-primary-600 hover:text-primary-800 underline shadow-none px-0 bg-transparent'
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
