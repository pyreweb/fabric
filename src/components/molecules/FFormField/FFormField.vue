<template>
	<div class="flex flex-col gap-1.5">
		<label
			v-if="label"
			:for="inputId"
			:class="[
				'text-sm font-medium text-gray-700',
				{ 'after:content-[\'_*\'] after:text-red-500': required }
			]"
		>
			{{ label }}
		</label>
		<f-input
			:id="inputId"
			:value="value"
			:type="type"
			:placeholder="placeholder"
			:size="size"
			:disabled="disabled"
			:readonly="readonly"
			:error="!!errorMessage"
			@input="$emit('input', $event)"
			@focus="$emit('focus', $event)"
			@blur="$emit('blur', $event)"
		/>
		<span v-if="errorMessage" class="text-xs text-red-500">
			{{ errorMessage }}
		</span>
		<span v-else-if="hint" class="text-xs text-gray-500">
			{{ hint }}
		</span>
	</div>
</template>

<script>
import FInput from '../../atoms/FInput/FInput.vue';

export default {
	name: 'FFormField',
	components: {
		FInput
	},
	props: {
		label: {
			type: String,
			default: ''
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
			default: 'medium'
		},
		disabled: {
			type: Boolean,
			default: false
		},
		readonly: {
			type: Boolean,
			default: false
		},
		required: {
			type: Boolean,
			default: false
		},
		hint: {
			type: String,
			default: ''
		},
		errorMessage: {
			type: String,
			default: ''
		}
	},
	computed: {
		inputId() {
			return `f-form-field-${this._uid}`;
		}
	}
};
</script>
