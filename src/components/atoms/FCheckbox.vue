<template>
  <label
    :class="wrapperClasses"
  >
    <input
      type="checkbox"
      :class="inputClasses"
      :checked="value"
      :disabled="disabled"
      :aria-invalid="error"
      @change="handleChange"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    />
    <slot>
      <span v-if="label !== ''" :class="labelClasses">{{ label }}</span>
    </slot>
  </label>
</template>

<script>
export default {
  name: 'FCheckbox',
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
    error: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    wrapperClasses() {
      const baseClasses = 'inline-flex items-center cursor-pointer select-none'
      const disabledClasses = this.disabled ? 'cursor-not-allowed opacity-50' : ''

      return [
        baseClasses,
        disabledClasses
      ].filter(Boolean).join(' ')
    },
    inputClasses() {
      const baseClasses = 'w-4 h-4 rounded border transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1'

      const stateClasses = this.error
        ? 'border-red-500 text-red-500 focus:ring-red-500/20'
        : 'border-gray-300 text-blue-500 focus:border-blue-500 focus:ring-blue-500/20'

      const disabledClasses = this.disabled ? 'cursor-not-allowed' : ''

      return [
        baseClasses,
        stateClasses,
        disabledClasses
      ].filter(Boolean).join(' ')
    },
    labelClasses() {
      const baseClasses = 'ml-2 font-sans text-sm text-gray-800'
      const errorClasses = this.error ? 'text-red-500' : ''

      return [
        baseClasses,
        errorClasses
      ].filter(Boolean).join(' ')
    }
  },
  methods: {
    handleChange(event) {
      if (!this.disabled) {
        this.$emit('input', event.target.checked)
        this.$emit('change', event.target.checked)
      }
    }
  }
}
</script>
