<script setup lang="ts">
import { computed } from 'vue';
import FLoader from '../FLoader/FLoader.vue';

interface Props {
	variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link';
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	loading?: boolean;
	block?: boolean;
	rounded?: boolean;
	iconLeft?: string;
	iconRight?: string;
}

const props = withDefaults(defineProps<Props>(), {
	variant: 'primary',
	size: 'md',
	type: 'button',
	disabled: false,
	loading: false,
	block: false,
	rounded: false,
	iconLeft: undefined,
	iconRight: undefined
});

const emit = defineEmits<{
	(e: 'click', event: MouseEvent): void;
}>();

const handleClick = (event: MouseEvent) => {
	if (props.disabled || props.loading) {
		event.preventDefault();
		return;
	}
	emit('click', event);
};

const baseClasses =
	'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

const variantClasses = computed(() => {
	const variants: Record<string, string> = {
		primary:
			'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 border border-transparent',
		secondary:
			'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-primary-500',
		outline:
			'bg-transparent text-primary-600 border border-primary-600 hover:bg-primary-50 focus:ring-primary-500',
		ghost:
			'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500',
		danger:
			'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 border border-transparent',
		link: 'text-primary-600 underline-offset-4 hover:underline p-0 h-auto focus:ring-0'
	};
	return variants[props.variant];
});

const sizeClasses = computed(() => {
	if (props.variant === 'link') return '';

	const sizes: Record<string, string> = {
		xs: 'text-xs px-2.5 py-1.5',
		sm: 'text-sm px-3 py-2',
		md: 'text-sm px-4 py-2',
		lg: 'text-base px-4 py-2',
		xl: 'text-base px-6 py-3'
	};
	return sizes[props.size];
});

const classes = computed(() => [
	baseClasses,
	variantClasses.value,
	sizeClasses.value,
	props.block ? 'w-full flex' : '',
	props.rounded ? 'rounded-full' : 'rounded-md',
	props.loading
		? 'cursor-wait relative text-transparent hover:text-transparent transition-none'
		: ''
]);
</script>

<template>
	<button
		:type="type"
		:class="classes"
		:disabled="disabled || loading"
		:aria-disabled="disabled || loading"
		@click="handleClick"
	>
		<div
			v-if="loading"
			class="absolute inset-0 flex items-center justify-center text-current"
		>
			<FLoader size="sm" class="text-current opacity-100" />
		</div>

		<span :class="{ 'opacity-0': loading }" class="flex items-center gap-2">
			<slot name="prefix">
				<span v-if="iconLeft" :class="iconLeft" aria-hidden="true" />
			</slot>

			<slot />

			<slot name="suffix">
				<span v-if="iconRight" :class="iconRight" aria-hidden="true" />
			</slot>
		</span>
	</button>
</template>
