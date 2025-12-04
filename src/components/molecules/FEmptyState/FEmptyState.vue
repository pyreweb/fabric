<template>
	<div :class="containerClasses" role="status" aria-live="polite">
		<f-icon :name="icon" size="xl" :decorative="true" :class="iconClasses" />
		<f-typography variant="h5" :class="titleClasses">
			{{ title }}
		</f-typography>
		<f-typography v-if="description" variant="body" :class="descriptionClasses">
			{{ description }}
		</f-typography>
		<slot />
		<f-button
			v-if="actionLabel"
			:variant="actionVariant"
			:class="actionClasses"
			@click="handleAction"
		>
			{{ actionLabel }}
		</f-button>
	</div>
</template>

<script>
import FIcon from '../../atoms/FIcon/FIcon.vue';
import FTypography from '../../atoms/FTypography/FTypography.vue';
import FButton from '../../atoms/FButton/FButton.vue';

export default {
	name: 'FEmptyState',
	components: {
		FIcon,
		FTypography,
		FButton
	},
	props: {
		icon: {
			type: String,
			default: 'folder'
		},
		title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			default: ''
		},
		actionLabel: {
			type: String,
			default: ''
		},
		actionVariant: {
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
		}
	},
	computed: {
		containerClasses() {
			return 'flex flex-col items-center justify-center text-center py-12 px-4';
		},
		iconClasses() {
			return 'text-neutral-400 mb-4';
		},
		titleClasses() {
			return 'text-neutral-700 mb-2';
		},
		descriptionClasses() {
			return 'text-neutral-500 max-w-md mb-6';
		},
		actionClasses() {
			return 'mt-4';
		}
	},
	methods: {
		handleAction(event) {
			this.$emit('action', event);
		}
	}
};
</script>
