<template>
	<div :class="cardClasses" @click="handleClick">
		<div v-if="slots.header || title" class="px-4 pt-4">
			<slot name="header">
				<f-typography v-if="title" variant="h5">{{ title }}</f-typography>
				<f-typography v-if="subtitle" variant="caption">{{
					subtitle
				}}</f-typography>
			</slot>
		</div>
		<div
			v-if="slots.media"
			class="w-full [&_img]:w-full [&_img]:h-auto [&_img]:block"
		>
			<slot name="media" />
		</div>
		<div class="p-4">
			<slot />
		</div>
		<div v-if="slots.actions" class="px-4 pb-4 flex gap-2">
			<slot name="actions" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import type { VNode } from 'vue';
import FTypography from '../../atoms/FTypography/FTypography.vue';

interface Props {
	title?: string;
	subtitle?: string;
	clickable?: boolean;
	bordered?: boolean;
}

type FCardSlots = {
	default?: () => VNode[];
	header?: () => VNode[];
	media?: () => VNode[];
	actions?: () => VNode[];
};

const props = withDefaults(defineProps<Props>(), {
	title: '',
	subtitle: '',
	clickable: false,
	bordered: true
});

const emit = defineEmits<{
	(e: 'click', event: MouseEvent): void;
}>();

const slots = useSlots() as FCardSlots;

const cardClasses = computed(() => {
	const baseClasses = 'bg-white rounded-lg overflow-hidden';
	const transitionClasses =
		'transition-all duration-[var(--transition-duration-base)] ease-[var(--transition-easing-standard)]';
	const borderedClasses = props.bordered ? 'border border-neutral-200' : '';
	const clickableClasses = props.clickable
		? 'cursor-pointer hover:shadow-lg hover:-translate-y-0.5'
		: '';

	return [baseClasses, transitionClasses, borderedClasses, clickableClasses]
		.filter(Boolean)
		.join(' ');
});

const handleClick = (event: MouseEvent) => {
	if (props.clickable) {
		emit('click', event);
	}
};
</script>
