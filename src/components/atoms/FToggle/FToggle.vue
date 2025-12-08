<template>
	<label :class="containerClasses">
		<button
			type="button"
			role="switch"
			:class="switchClasses"
			:aria-checked="String(value)"
			:disabled="disabled"
			@click="handleToggle"
			@keydown.space.prevent="handleToggle"
			@keydown.enter.prevent="handleToggle"
			@focus="$emit('focus', $event)"
			@blur="$emit('blur', $event)"
		>
			<span :class="thumbClasses" aria-hidden="true" />
		</button>
		<span v-if="label" :class="labelClasses">
			{{ label }}
		</span>
	</label>
</template>

<script>
export default {
	name: 'FToggle',
	props: {
		value: {
			type: Boolean,
			default: false
		},
		label: {
			type: String,
			default: ''
		},
		disabled: {
			type: Boolean,
			default: false
		},
		color: {
			type: String,
			default: 'blue',
			validator: (value) =>
				['blue', 'green', 'red', 'orange', 'purple'].includes(value)
		}
	},
	computed: {
		containerClasses() {
			const baseClasses = 'inline-flex items-center cursor-pointer font-sans';
			const disabledClasses = this.disabled
				? 'cursor-not-allowed opacity-50'
				: '';

			return [baseClasses, disabledClasses].filter(Boolean).join(' ');
		},
		switchClasses() {
			const baseClasses =
				'relative inline-flex items-center h-6 w-11 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 flex-shrink-0';

			const transitionClasses =
				'transition-colors duration-[var(--transition-duration-base)] ease-[var(--transition-easing-standard)]';

			const colorClasses = {
				blue: this.value
					? 'bg-primary-500 focus:ring-primary-500/20'
					: 'bg-neutral-300 focus:ring-primary-500/20',
				green: this.value
					? 'bg-success-500 focus:ring-success-500/20'
					: 'bg-neutral-300 focus:ring-success-500/20',
				red: this.value
					? 'bg-danger-500 focus:ring-danger-500/20'
					: 'bg-neutral-300 focus:ring-danger-500/20',
				orange: this.value
					? 'bg-warning-500 focus:ring-warning-500/20'
					: 'bg-neutral-300 focus:ring-warning-500/20',
				purple: this.value
					? 'bg-primary-500 focus:ring-primary-500/20'
					: 'bg-neutral-300 focus:ring-primary-500/20'
			};

			const disabledClasses = this.disabled
				? 'cursor-not-allowed'
				: 'cursor-pointer';

			return [
				baseClasses,
				transitionClasses,
				colorClasses[this.color],
				disabledClasses
			]
				.filter(Boolean)
				.join(' ');
		},
		thumbClasses() {
			const baseClasses =
				'inline-block w-4 h-4 rounded-full bg-white shadow transform';

			const transitionClasses =
				'transition-transform duration-[var(--transition-duration-base)] ease-[var(--transition-easing-standard)]';

			const positionClasses = this.value ? 'translate-x-6' : 'translate-x-1';

			return [baseClasses, transitionClasses, positionClasses]
				.filter(Boolean)
				.join(' ');
		},
		labelClasses() {
			const baseClasses = 'ml-2 text-sm text-neutral-800 select-none';

			const disabledClasses = this.disabled ? 'text-neutral-400' : '';

			return [baseClasses, disabledClasses].filter(Boolean).join(' ');
		}
	},
	methods: {
		handleToggle() {
			if (!this.disabled) {
				this.$emit('input', !this.value);
				this.$emit('change', !this.value);
			}
		}
	}
};
</script>
