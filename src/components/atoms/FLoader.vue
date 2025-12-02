<template>
  <div :class="wrapperClasses">
    <div
      :class="containerClasses"
      role="status"
      :aria-label="ariaLabel"
    >
      <svg
        :class="spinnerClasses"
        :style="spinnerStyle"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FLoader',
  props: {
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
    },
    color: {
      type: String,
      default: ''
    },
    overlay: {
      type: Boolean,
      default: false
    },
    centered: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'Chargement en cours'
    }
  },
  computed: {
    ariaLabel() {
      return this.label
    },
    wrapperClasses() {
      if (this.overlay) {
        return 'fixed inset-0 flex items-center justify-center bg-black/50 z-50'
      }
      return ''
    },
    containerClasses() {
      const baseClasses = 'inline-flex items-center justify-center'
      const centeredClasses = this.centered && !this.overlay ? 'absolute inset-0' : ''
      
      return [
        baseClasses,
        centeredClasses
      ].filter(Boolean).join(' ')
    },
    spinnerClasses() {
      const baseClasses = 'animate-spin'
      
      const sizeClasses = {
        xs: 'w-4 h-4',
        sm: 'w-5 h-5',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-12 h-12'
      }
      
      const colorClasses = this.color ? '' : 'text-blue-500'
      
      return [
        baseClasses,
        sizeClasses[this.size],
        colorClasses
      ].filter(Boolean).join(' ')
    },
    spinnerStyle() {
      if (this.color) {
        return { color: this.color }
      }
      return undefined
    }
  }
}
</script>
