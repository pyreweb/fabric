<template>
	<label :class="wrapperClasses">
		<input
			type="checkbox"
			:class="inputClasses"
			:checked="checked"
			:disabled="disabled"
			:aria-invalid="error"
			@change="updateInput"
			@focus="$emit('focus', $event)"
			@blur="$emit('blur', $event)"
		/>
		<span v-if="label || $slots.default" :class="labelClasses">
			<slot>{{ label }}</slot>
		</span>
	</label>
</template>

<script>
export default {
	name: 'FCheckbox',
	model: {
		prop: 'checked',
		event: 'change'
	},
	props: {
		checked: {
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
		error: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		wrapperClasses() {
			return [
				'inline-flex items-center select-none',
				this.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
			];
		},
		inputClasses() {
			return [
				'shrink-0 w-4 h-4 rounded border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1',
				this.error
					? 'border-danger-500 text-danger-500 focus:ring-danger-500/20'
					: 'border-neutral-300 text-primary-600 focus:border-primary-600 focus:ring-primary-600/20',
				this.disabled ? 'cursor-not-allowed' : 'cursor-pointer'
			];
		},
		labelClasses() {
			return [
				'ml-2 font-sans text-sm',
				this.error ? 'text-danger-500' : 'text-neutral-700'
			];
		}
	},
	methods: {
		updateInput(event) {
			if (!this.disabled) {
				this.$emit('change', event.target.checked);
			}
		}
	}
};
</script>
