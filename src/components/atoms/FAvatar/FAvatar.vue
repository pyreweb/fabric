<template>
	<div
		class="relative inline-flex flex-shrink-0"
		:class="[sizeClasses.wrapper]"
		@click="handleClick"
	>
		<div
			:class="containerClasses"
			:role="showImage ? undefined : 'img'"
			:aria-label="computedAriaLabel"
		>
			<img
				v-if="showImage"
				:src="src"
				:alt="computedAlt"
				:title="computedAlt ? computedAlt : undefined"
				class="w-full h-full object-cover"
				loading="lazy"
				@error="handleImageError"
			/>

			<span
				v-else
				:class="[
					'flex items-center justify-center w-full h-full',
					fontSizeClasses
				]"
			>
				<template v-if="displayInitials">
					{{ displayInitials }}
				</template>
				<svg
					v-else
					class="w-3/5 h-3/5 text-white opacity-90"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
						clip-rule="evenodd"
					/>
				</svg>
			</span>
		</div>

		<span v-if="status" :class="statusClasses" />
	</div>
</template>

<script setup lang="ts">
import { computed, ref, watch, type PropType } from 'vue';

const props = defineProps({
	src: {
		type: String,
		default: ''
	},
	alt: {
		type: String as PropType<string>,
		default: null
	},
	initials: {
		type: String,
		default: ''
	},
	name: {
		type: String,
		default: ''
	},
	size: {
		type: String as PropType<'xs' | 'sm' | 'md' | 'lg' | 'xl'>,
		default: 'md',
		validator: (value: string) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
	},
	shape: {
		type: String as PropType<'circle' | 'square'>,
		default: 'circle',
		validator: (value: string) => ['circle', 'square'].includes(value)
	},
	status: {
		type: String as PropType<'online' | 'busy' | 'away' | 'offline'>,
		default: null,
		validator: (value: string | null) =>
			value === null || ['online', 'busy', 'away', 'offline'].includes(value)
	},
	placeholderClass: {
		type: String,
		default: 'bg-neutral-400 text-white'
	}
});

const emit = defineEmits<{
	(e: 'click', event: MouseEvent): void;
}>();

const imageError = ref(false);

watch(
	() => props.src,
	() => {
		imageError.value = false;
	}
);

const showImage = computed(() => {
	return props.src && !imageError.value;
});

const computeInitialsFromName = (name: string): string => {
	if (!name) return '';
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) return '';
	if (parts.length >= 2) {
		return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
	}
	return parts[0].substring(0, 2).toUpperCase();
};

const displayInitials = computed(() => {
	if (props.initials) {
		return props.initials.substring(0, 2).toUpperCase();
	}
	if (props.name) {
		return computeInitialsFromName(props.name);
	}
	return '';
});

const computedAriaLabel = computed(() => {
	if (props.alt !== null) return props.alt;
	if (props.name) return props.name;
	if (props.initials) return `Avatar ${props.initials}`;
	return 'Avatar';
});

const computedAlt = computed(() => {
	if (props.alt !== null) return props.alt;
	if (props.name) return props.name;
	return '';
});

const sizeClasses = computed(() => {
	const sizes = {
		xs: { wrapper: 'w-6 h-6', status: 'w-1.5 h-1.5' },
		sm: { wrapper: 'w-8 h-8', status: 'w-2 h-2' },
		md: { wrapper: 'w-10 h-10', status: 'w-2.5 h-2.5' },
		lg: { wrapper: 'w-12 h-12', status: 'w-3 h-3' },
		xl: { wrapper: 'w-16 h-16', status: 'w-4 h-4' }
	};
	return sizes[props.size];
});

const fontSizeClasses = computed(() => {
	const fonts = {
		xs: 'text-xs',
		sm: 'text-xs',
		md: 'text-sm',
		lg: 'text-base',
		xl: 'text-lg'
	};
	return [fonts[props.size], 'font-sans font-medium select-none'].join(' ');
});

const containerClasses = computed(() => {
	const shapes = {
		circle: 'rounded-full',
		square: 'rounded-lg'
	};

	const background = !showImage.value ? props.placeholderClass : '';

	return [
		'w-full h-full overflow-hidden flex items-center justify-center',
		shapes[props.shape],
		background
	]
		.filter(Boolean)
		.join(' ');
});

const statusClasses = computed(() => {
	if (!props.status) return '';

	const colors = {
		online: 'bg-success-500',
		busy: 'bg-danger-500',
		away: 'bg-warning-500',
		offline: 'bg-neutral-500'
	};

	const position =
		props.shape === 'circle' ? '-bottom-0.5 -right-0.5' : '-bottom-1 -right-1';
	const border = 'border-2 border-white';

	return [
		'absolute rounded-full box-content',
		position,
		border,
		sizeClasses.value.status,
		colors[props.status]
	].join(' ');
});

const handleImageError = () => {
	imageError.value = true;
};

const handleClick = (event: MouseEvent) => {
	emit('click', event);
};
</script>
