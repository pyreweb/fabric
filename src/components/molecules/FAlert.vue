<template>
  <div
    v-if="isVisible"
    :class="alertClasses"
    role="alert"
  >
    <f-icon
      :name="variant"
      size="md"
    />
    <div class="flex-1 min-w-0">
      <f-typography
        v-if="title"
        variant="h6"
        :class="titleClasses"
      >
        {{ title }}
      </f-typography>
      <f-typography
        v-if="message"
        variant="body"
        :class="messageClasses"
      >
        {{ message }}
      </f-typography>
      <slot />
    </div>
    <f-button
      v-if="closable"
      variant="text"
      size="small"
      :class="closeButtonClasses"
      @click="handleClose"
    >
      <f-icon name="close" size="sm" />
    </f-button>
  </div>
</template>

<script>
import FIcon from '../atoms/FIcon.vue'
import FTypography from '../atoms/FTypography.vue'
import FButton from '../atoms/FButton.vue'

const VARIANT_COLORS = {
  success: {
    container: 'bg-green-50 border-green-200 text-green-800',
    title: 'text-green-800',
    message: 'text-green-700',
    closeButton: 'text-green-600 hover:text-green-800'
  },
  error: {
    container: 'bg-red-50 border-red-200 text-red-800',
    title: 'text-red-800',
    message: 'text-red-700',
    closeButton: 'text-red-600 hover:text-red-800'
  },
  info: {
    container: 'bg-blue-50 border-blue-200 text-blue-800',
    title: 'text-blue-800',
    message: 'text-blue-700',
    closeButton: 'text-blue-600 hover:text-blue-800'
  }
}

export default {
  name: 'FAlert',
  components: {
    FIcon,
    FTypography,
    FButton
  },
  props: {
    variant: {
      type: String,
      default: 'info',
      validator: (value) => ['success', 'error', 'info'].includes(value)
    },
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    closable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isVisible: true
    }
  },
  computed: {
    variantColors() {
      return VARIANT_COLORS[this.variant]
    },
    alertClasses() {
      const baseClasses = 'flex items-start gap-3 p-4 rounded-lg border'
      return `${baseClasses} ${this.variantColors.container}`
    },
    titleClasses() {
      return this.variantColors.title
    },
    messageClasses() {
      return this.variantColors.message
    },
    closeButtonClasses() {
      return `flex-shrink-0 ${this.variantColors.closeButton}`
    }
  },
  methods: {
    handleClose() {
      this.isVisible = false
      this.$emit('close')
    }
  }
}
</script>
