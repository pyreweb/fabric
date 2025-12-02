<template>
  <span
    :class="badgeClasses"
    :aria-label="ariaLabel"
  >
    <template v-if="!dot">
      <slot>{{ content }}</slot>
    </template>
  </span>
</template>

<script>
export default {
  name: 'FBadge',
  props: {
    content: {
      type: [String, Number],
      default: ''
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'success', 'warning', 'error', 'neutral'].includes(value)
    },
    shape: {
      type: String,
      default: 'pill',
      validator: (value) => ['pill', 'circle'].includes(value)
    },
    dot: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ariaLabel() {
      if (this.dot) {
        return `Status indicator: ${this.variant}`
      }
      return undefined
    },
    badgeClasses() {
      const baseClasses = 'inline-flex items-center justify-center font-sans font-medium'

      const variantClasses = {
        primary: 'bg-blue-500 text-white',
        success: 'bg-green-500 text-white',
        warning: 'bg-yellow-500 text-white',
        error: 'bg-red-500 text-white',
        neutral: 'bg-gray-500 text-white'
      }

      const shapeClasses = this.dot
        ? 'w-2 h-2 rounded-full'
        : this.shape === 'circle'
          ? 'w-5 h-5 text-xs rounded-full'
          : 'px-2 py-0.5 text-xs rounded-full'

      return [
        baseClasses,
        variantClasses[this.variant],
        shapeClasses
      ].filter(Boolean).join(' ')
    }
  }
}
</script>
