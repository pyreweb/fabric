<template>
	<div :class="containerClasses" role="group" :aria-label="ariaLabel" @keydown="handleKeydown">
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
	},
	methods: {
		handleKeydown(event) {
			if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
				return;
			}

			event.preventDefault();

			const focusable = Array.from(
				this.$el.querySelectorAll('button:not([disabled])')
			);

			if (focusable.length === 0) {
				return;
			}

			const currentIndex = focusable.indexOf(document.activeElement);

			let nextIndex;
			if (event.key === 'ArrowRight') {
				nextIndex =
					currentIndex === -1 ? 0 : (currentIndex + 1) % focusable.length;
			} else {
				nextIndex =
					currentIndex <= 0 ? focusable.length - 1 : currentIndex - 1;
			}

			focusable[nextIndex].focus();
		}
	}
};
</script>
