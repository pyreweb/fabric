<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    :type="type"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'FButton',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'outline', 'text'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    type: {
      type: String,
      default: 'button',
      validator: (value) => ['button', 'submit', 'reset'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    buttonClasses() {
      const baseClasses = 'inline-flex items-center justify-center font-medium rounded cursor-pointer transition-all duration-200 border-2 border-transparent'
      
      const sizeClasses = {
        small: 'py-1.5 px-3 text-xs',
        medium: 'py-2.5 px-5 text-sm',
        large: 'py-3.5 px-7 text-base'
      }
      
      const variantClasses = {
        primary: 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600 hover:border-blue-600',
        secondary: 'bg-gray-500 text-white border-gray-500 hover:bg-gray-600 hover:border-gray-600',
        outline: 'bg-transparent text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white',
        text: 'bg-transparent text-blue-500 border-transparent hover:bg-blue-500/10'
      }
      
      const disabledClasses = this.disabled ? 'opacity-50 cursor-not-allowed' : ''
      
      return [
        baseClasses,
        sizeClasses[this.size],
        variantClasses[this.variant],
        disabledClasses
      ].filter(Boolean).join(' ')
    }
  },
  methods: {
    handleClick(event) {
      if (!this.disabled) {
        this.$emit('click', event)
      }
    }
  }
}
</script>
