<template>
	<div :class="containerClasses" role="group" :aria-label="ariaLabel">
		<slot />
	</div>
</template>

<script>
export default {
	name: 'FButtonGroup',
	props: {
		ariaLabel: {
			type: String,
			default: 'Groupe de boutons'
		}
	},
	computed: {
		containerClasses() {
			const baseClasses = 'inline-flex';
			const childClasses = [
				'[&>*]:rounded-none',
				'[&>*:first-child]:rounded-l',
				'[&>*:last-child]:rounded-r',
				'[&>*:not(:first-child)]:-ml-px',
				'[&>*]:focus:z-10'
			].join(' ');

			return `${baseClasses} ${childClasses}`;
		}
	}
};
</script>
