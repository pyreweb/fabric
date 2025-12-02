<template>
  <input
    :class="['f-input', `f-input--${size}`, { 'f-input--error': error, 'f-input--disabled': disabled }]"
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
  methods: {
    handleInput(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style scoped>
.f-input {
  display: block;
  width: 100%;
  font-family: inherit;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.f-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.f-input--small {
  padding: 6px 10px;
  font-size: 12px;
}

.f-input--medium {
  padding: 10px 14px;
  font-size: 14px;
}

.f-input--large {
  padding: 14px 18px;
  font-size: 16px;
}

.f-input--error {
  border-color: #ef4444;
}

.f-input--error:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.f-input--disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
  opacity: 0.7;
}
</style>
