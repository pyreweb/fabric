<template>
	<form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
		<slot />
		<div v-if="$slots.actions" class="flex gap-2 mt-2">
			<slot name="actions" />
		</div>
	</form>
</template>

<script>
export default {
	name: 'FForm',
	methods: {
		handleSubmit(event) {
			this.$emit('submit', event);
		}
	}
};
</script>
