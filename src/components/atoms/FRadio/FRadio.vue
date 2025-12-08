<template>
	<label :class="containerClasses">
		<input
			type="radio"
			:class="inputClasses"
			:name="name"
			:value="value"
			:checked="isChecked"
			:disabled="disabled"
			@change="handleChange"
		/>
		<span :class="radioClasses" aria-hidden="true">
			<span v-if="isChecked" :class="dotClasses" />
		</span>
		<span v-if="label" :class="labelClasses">
			{{ label }}
		</span>
	</label>
</template>

<script>
export default {
	name: 'FRadio',
	model: {
		prop: 'modelValue',
		event: 'change'
	},
	props: {
		label: {
			type: String,
			default: ''
		},
		value: {
			type: [String, Number, Boolean],
			required: true
		},
		modelValue: {
			type: [String, Number, Boolean],
			default: null
		},
		name: {
			type: String,
			required: true
		},
		disabled: {
			type: Boolean,
			default: false
		},
		error: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		isChecked() {
			return this.modelValue === this.value;
		},
		containerClasses() {
			const baseClasses = 'inline-flex items-center cursor-pointer font-sans';
			const disabledClasses = this.disabled
				? 'cursor-not-allowed opacity-70'
				: '';

			return [baseClasses, disabledClasses].filter(Boolean).join(' ');
		},
		inputClasses() {
			return 'sr-only';
		},
		radioClasses() {
			const baseClasses =
				'inline-flex items-center justify-center w-5 h-5 rounded-full border-2 flex-shrink-0';

			const transitionClasses =
				'transition-all duration-[var(--transition-duration-base)] ease-[var(--transition-easing-standard)]';

			let stateClasses;
			if (this.error) {
				stateClasses = this.isChecked
					? 'border-danger-500 bg-danger-500'
					: 'border-danger-500 bg-white';
			} else if (this.disabled) {
				stateClasses = this.isChecked
					? 'border-neutral-300 bg-neutral-300'
					: 'border-neutral-300 bg-neutral-100';
			} else {
				stateClasses = this.isChecked
					? 'border-primary-500 bg-primary-500'
					: 'border-neutral-300 bg-white hover:border-primary-400';
			}

			return [baseClasses, transitionClasses, stateClasses]
				.filter(Boolean)
				.join(' ');
		},
		dotClasses() {
			return 'w-2 h-2 rounded-full bg-white';
		},
		labelClasses() {
			const baseClasses = 'ml-2 text-sm text-neutral-800 select-none';

			let stateClasses = '';
			if (this.disabled) {
				stateClasses = 'text-neutral-400';
			} else if (this.error) {
				stateClasses = 'text-danger-500';
			}

			return [baseClasses, stateClasses].filter(Boolean).join(' ');
		}
	},
	methods: {
		handleChange() {
			if (!this.disabled) {
				this.$emit('change', this.value);
			}
		}
	}
};
</script>
