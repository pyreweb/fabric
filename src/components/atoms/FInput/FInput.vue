<template>
	<input
		:id="computedId"
		:class="inputClasses"
		:type="type"
		:value="value"
		:placeholder="placeholder"
		:disabled="disabled"
		:readonly="readonly"
		@input="handleInput"
		@focus="$emit('focus', $event)"
		@blur="$emit('blur', $event)"
	/>
</template>

<script>
let idCounter = 0;

export default {
	name: 'FInput',
	props: {
		id: {
			type: String,
			default: undefined
		},
		value: {
			type: [String, Number],
			default: ''
		},
		type: {
			type: String,
			default: 'text'
		},
		placeholder: {
			type: String,
			default: ''
		},
		size: {
			type: String,
			default: 'medium',
			validator: (value) => ['small', 'medium', 'large'].includes(value)
		},
		disabled: {
			type: Boolean,
			default: false
		},
		readonly: {
			type: Boolean,
			default: false
		},
		error: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			generatedId: ''
		};
	},
	computed: {
		computedId() {
			return this.id || this.generatedId;
		},
		inputClasses() {
			const baseClasses =
				'block w-full font-sans border rounded box-border focus:outline-none focus:ring-2';

			const transitionClasses =
				'transition-all duration-[var(--transition-duration-base)] ease-[var(--transition-easing-standard)]';

			const sizeClasses = {
				small: 'py-1.5 px-2.5 text-xs',
				medium: 'py-2.5 px-3.5 text-sm',
				large: 'py-3.5 px-4.5 text-base'
			};

			const stateClasses = this.error
				? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/20'
				: 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500/20';

			const disabledClasses = this.disabled
				? 'bg-neutral-100 text-gray-500 cursor-not-allowed'
				: '';

			return [
				baseClasses,
				transitionClasses,
				sizeClasses[this.size],
				stateClasses,
				disabledClasses
			]
				.filter(Boolean)
				.join(' ');
		}
	},
	methods: {
		handleInput(event) {
			this.$emit('input', event.target.value);
		}
	},
	created() {
		if (!this.id) {
			this.generatedId = `f-input-${++idCounter}`;
		}
	}
};
</script>
