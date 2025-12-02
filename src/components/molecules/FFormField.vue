<template>
  <div class="f-form-field">
    <label
      v-if="label"
      :for="inputId"
      :class="['f-form-field__label', { 'f-form-field__label--required': required }]"
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
    <span v-if="errorMessage" class="f-form-field__error">
      {{ errorMessage }}
    </span>
    <span v-else-if="hint" class="f-form-field__hint">
      {{ hint }}
    </span>
  </div>
</template>

<script>
import FInput from '../atoms/FInput.vue'

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
      return `f-form-field-${this._uid}`
    }
  }
}
</script>

<style scoped>
.f-form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.f-form-field__label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.f-form-field__label--required::after {
  content: ' *';
  color: #ef4444;
}

.f-form-field__hint {
  font-size: 12px;
  color: #6b7280;
}

.f-form-field__error {
  font-size: 12px;
  color: #ef4444;
}
</style>
