<template>
	<input
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
export default {
	name: 'FInput',
	props: {
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
	computed: {
		inputClasses() {
			const baseClasses =
				'block w-full font-sans border rounded transition-all duration-200 box-border focus:outline-none focus:ring-2';

			const sizeClasses = {
				small: 'py-1.5 px-2.5 text-xs',
				medium: 'py-2.5 px-3.5 text-sm',
				large: 'py-3.5 px-4.5 text-base'
			};

			const stateClasses = this.error
				? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
				: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20';

			const disabledClasses = this.disabled
				? 'bg-gray-100 cursor-not-allowed opacity-70'
				: '';

			return [
				baseClasses,
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
	}
};
</script>
