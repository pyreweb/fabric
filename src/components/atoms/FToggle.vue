<template>
  <label
    :class="containerClasses"
  >
    <button
      type="button"
      role="switch"
      :class="switchClasses"
      :aria-checked="String(value)"
      :disabled="disabled"
      @click="handleToggle"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    >
      <span
        :class="thumbClasses"
        aria-hidden="true"
      />
    </button>
    <span
      v-if="label"
      :class="labelClasses"
    >
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
      validator: (value) => ['blue', 'green', 'red', 'orange', 'purple'].includes(value)
    }
  },
  computed: {
    containerClasses() {
      const baseClasses = 'inline-flex items-center cursor-pointer font-sans'
      const disabledClasses = this.disabled ? 'cursor-not-allowed opacity-50' : ''

      return [
        baseClasses,
        disabledClasses
      ].filter(Boolean).join(' ')
    },
    switchClasses() {
      const baseClasses = 'relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 flex-shrink-0'

      const colorClasses = {
        blue: this.value
          ? 'bg-blue-500 focus:ring-blue-500/20'
          : 'bg-gray-300 focus:ring-blue-500/20',
        green: this.value
          ? 'bg-green-500 focus:ring-green-500/20'
          : 'bg-gray-300 focus:ring-green-500/20',
        red: this.value
          ? 'bg-red-500 focus:ring-red-500/20'
          : 'bg-gray-300 focus:ring-red-500/20',
        orange: this.value
          ? 'bg-orange-500 focus:ring-orange-500/20'
          : 'bg-gray-300 focus:ring-orange-500/20',
        purple: this.value
          ? 'bg-purple-500 focus:ring-purple-500/20'
          : 'bg-gray-300 focus:ring-purple-500/20'
      }

      const disabledClasses = this.disabled ? 'cursor-not-allowed' : 'cursor-pointer'

      return [
        baseClasses,
        colorClasses[this.color],
        disabledClasses
      ].filter(Boolean).join(' ')
    },
    thumbClasses() {
      const baseClasses = 'inline-block w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out'

      const positionClasses = this.value ? 'translate-x-6' : 'translate-x-1'

      return [
        baseClasses,
        positionClasses
      ].filter(Boolean).join(' ')
    },
    labelClasses() {
      const baseClasses = 'ml-2 text-sm text-gray-800 select-none'

      const disabledClasses = this.disabled ? 'text-gray-400' : ''

      return [
        baseClasses,
        disabledClasses
      ].filter(Boolean).join(' ')
    }
  },
  methods: {
    handleToggle() {
      if (!this.disabled) {
        this.$emit('input', !this.value)
        this.$emit('change', !this.value)
      }
    }
  }
}
</script>
