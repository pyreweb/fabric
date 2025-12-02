<template>
  <label
    :class="containerClasses"
  >
    <input
      type="radio"
      :class="inputClasses"
      :name="name"
      :value="value"
      :checked="isChecked"
      :disabled="disabled"
      @change="handleChange"
    />
    <span
      :class="radioClasses"
      aria-hidden="true"
    >
      <span
        v-if="isChecked"
        :class="dotClasses"
      />
    </span>
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
      return this.modelValue === this.value
    },
    containerClasses() {
      const baseClasses = 'inline-flex items-center cursor-pointer font-sans'
      const disabledClasses = this.disabled ? 'cursor-not-allowed opacity-70' : ''

      return [
        baseClasses,
        disabledClasses
      ].filter(Boolean).join(' ')
    },
    inputClasses() {
      return 'sr-only'
    },
    radioClasses() {
      const baseClasses = 'inline-flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all duration-200 flex-shrink-0'

      let stateClasses
      if (this.error) {
        stateClasses = this.isChecked
          ? 'border-red-500 bg-red-500'
          : 'border-red-500 bg-white'
      } else if (this.disabled) {
        stateClasses = this.isChecked
          ? 'border-gray-300 bg-gray-300'
          : 'border-gray-300 bg-gray-100'
      } else {
        stateClasses = this.isChecked
          ? 'border-blue-500 bg-blue-500'
          : 'border-gray-300 bg-white hover:border-blue-400'
      }

      return [
        baseClasses,
        stateClasses
      ].filter(Boolean).join(' ')
    },
    dotClasses() {
      return 'w-2 h-2 rounded-full bg-white'
    },
    labelClasses() {
      const baseClasses = 'ml-2 text-sm text-gray-800 select-none'
      const disabledClasses = this.disabled ? 'text-gray-400' : ''
      const errorClasses = this.error ? 'text-red-500' : ''

      return [
        baseClasses,
        disabledClasses,
        errorClasses
      ].filter(Boolean).join(' ')
    }
  },
  methods: {
    handleChange() {
      if (!this.disabled) {
        this.$emit('change', this.value)
      }
    }
  }
}
</script>
