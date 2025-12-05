<script setup lang="ts">
import { computed } from 'vue';

interface Props {
	content?: string | number;
	variant?: 'primary' | 'success' | 'warning' | 'error' | 'neutral';
	shape?: 'pill' | 'circle' | 'rounded';
	size?: 'sm' | 'md' | 'lg';
	dot?: boolean;
	outlined?: boolean;
	tag?: string;
}

const props = withDefaults(defineProps<Props>(), {
	content: '',
	variant: 'primary',
	shape: 'pill',
	size: 'md',
	dot: false,
	outlined: false,
	tag: 'span'
});

const computedAriaLabel = computed(() => {
	return props.dot ? `Status: ${props.variant}` : undefined;
});

const computedClasses = computed(() => {
	const base =
		'inline-flex items-center justify-center font-sans font-medium transition-colors duration-200';

	const variantStyles = {
		primary: props.outlined
			? 'border border-primary-500 text-primary-500 bg-transparent'
			: 'bg-primary-500 text-white',
		success: props.outlined
			? 'border border-success-500 text-success-500 bg-transparent'
			: 'bg-success-500 text-white',
		warning: props.outlined
			? 'border border-warning-600 text-warning-600 bg-transparent'
			: 'bg-warning-600 text-white',
		error: props.outlined
			? 'border border-danger-500 text-danger-500 bg-transparent'
			: 'bg-danger-500 text-white',
		neutral: props.outlined
			? 'border border-neutral-500 text-neutral-500 bg-transparent'
			: 'bg-neutral-500 text-white'
	};

	if (props.dot) {
		const dotSizes = {
			sm: 'w-1.5 h-1.5',
			md: 'w-2 h-2',
			lg: 'w-3 h-3'
		};

		const dotColors = {
			primary: 'bg-primary-500',
			success: 'bg-success-500',
			warning: 'bg-warning-600',
			error: 'bg-danger-500',
			neutral: 'bg-neutral-500'
		};

		return [
			base,
			'rounded-full',
			dotSizes[props.size],
			dotColors[props.variant]
		].join(' ');
	}

	const sizeStyles = {
		sm:
			props.shape === 'circle'
				? 'w-4 h-4 text-[10px]'
				: 'px-1.5 py-0.5 text-[10px]',
		md: props.shape === 'circle' ? 'w-6 h-6 text-xs' : 'px-2.5 py-0.5 text-xs',
		lg: props.shape === 'circle' ? 'w-8 h-8 text-sm' : 'px-3 py-1 text-sm'
	};

	const shapeStyles = {
		pill: 'rounded-full',
		circle: 'rounded-full',
		rounded: 'rounded-md'
	};

	return [
		base,
		variantStyles[props.variant],
		sizeStyles[props.size],
		shapeStyles[props.shape]
	].join(' ');
});
</script>

<template>
	<component :is="tag" :class="computedClasses" :aria-label="computedAriaLabel">
		<template v-if="!dot">
			<slot>{{ content }}</slot>
		</template>
	</component>
</template>
