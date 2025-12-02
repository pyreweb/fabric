<template>
  <div
    :class="avatarClasses"
    role="img"
    :aria-label="ariaLabel"
  >
    <img
      v-if="showImage"
      :src="src"
      :alt="alt"
      class="w-full h-full object-cover"
      @error="handleImageError"
    />
    <span
      v-else
      :class="initialsClasses"
    >
      {{ displayInitials }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'FAvatar',
  props: {
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    initials: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
    },
    shape: {
      type: String,
      default: 'circle',
      validator: (value) => ['circle', 'square'].includes(value)
    }
  },
  data() {
    return {
      imageError: false
    }
  },
  computed: {
    showImage() {
      return this.src && !this.imageError
    },
    displayInitials() {
      if (this.initials) {
        return this.initials.substring(0, 2).toUpperCase()
      }
      if (this.name) {
        return this.computeInitialsFromName(this.name)
      }
      return ''
    },
    ariaLabel() {
      if (this.alt) {
        return this.alt
      }
      if (this.name) {
        return this.name
      }
      if (this.initials) {
        return `Avatar with initials ${this.initials}`
      }
      return 'Avatar'
    },
    avatarClasses() {
      const baseClasses = 'inline-flex items-center justify-center overflow-hidden flex-shrink-0'

      const sizeClasses = {
        xs: 'w-6 h-6',
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16'
      }

      const shapeClasses = {
        circle: 'rounded-full',
        square: 'rounded-lg'
      }

      const fallbackClasses = !this.showImage ? 'bg-gray-400 text-white' : ''

      return [
        baseClasses,
        sizeClasses[this.size],
        shapeClasses[this.shape],
        fallbackClasses
      ].filter(Boolean).join(' ')
    },
    initialsClasses() {
      const baseFontClasses = 'font-sans font-medium uppercase select-none'

      const fontSizeClasses = {
        xs: 'text-xs',
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
        xl: 'text-lg'
      }

      return [
        baseFontClasses,
        fontSizeClasses[this.size]
      ].filter(Boolean).join(' ')
    }
  },
  watch: {
    src() {
      this.imageError = false
    }
  },
  methods: {
    handleImageError() {
      this.imageError = true
    },
    computeInitialsFromName(name) {
      if (!name) return ''
      const parts = name.trim().split(/\s+/).filter(part => part.length > 0)
      if (parts.length === 0) return ''
      if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      }
      return parts[0].substring(0, 2).toUpperCase()
    }
  }
}
</script>
