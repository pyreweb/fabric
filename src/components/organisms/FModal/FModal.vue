<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Overlay -->
    <div
      class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
      @click="handleOverlayClick"
    ></div>

    <!-- Modal Container -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div
        :class="modalClasses"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
      >
        <!-- Header -->
        <div v-if="$slots.header || title" class="flex items-center justify-between px-4 pt-4">
          <div class="flex-1 min-w-0">
            <slot name="header">
              <f-typography :id="titleId" variant="h5">{{ title }}</f-typography>
              <f-typography v-if="subtitle" variant="caption" class="text-gray-500">
                {{ subtitle }}
              </f-typography>
            </slot>
          </div>
          <f-button
            v-if="closable"
            variant="ghost"
            size="small"
            class="flex-shrink-0 -mr-2"
            @click="handleClose"
          >
            <f-icon name="close" size="sm" />
            <span class="sr-only">Fermer la modale</span>
          </f-button>
        </div>

        <!-- Body -->
        <div class="p-4">
          <slot name="body">
            <slot />
          </slot>
        </div>

        <!-- Actions -->
        <div v-if="$slots.actions" class="px-4 pb-4 flex gap-2 justify-end">
          <slot name="actions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FTypography from '../../atoms/FTypography/FTypography.vue'
import FButton from '../../atoms/FButton/FButton.vue'
import FIcon from '../../atoms/FIcon/FIcon.vue'

let idCounter = 0

export default {
  name: 'FModal',
  components: {
    FTypography,
    FButton,
    FIcon
  },
  props: {
    /**
     * Controls the visibility of the modal.
     * Use v-model for two-way binding.
     */
    value: {
      type: Boolean,
      default: false
    },
    /**
     * Modal title displayed in the header
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * Optional subtitle displayed below the title
     */
    subtitle: {
      type: String,
      default: ''
    },
    /**
     * Show the close button in the header
     */
    closable: {
      type: Boolean,
      default: true
    },
    /**
     * Close the modal when clicking the overlay
     */
    closeOnOverlay: {
      type: Boolean,
      default: true
    },
    /**
     * Close the modal when pressing Escape key
     */
    closeOnEscape: {
      type: Boolean,
      default: true
    },
    /**
     * Modal size variant
     */
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large', 'full'].includes(value)
    },
    /**
     * Whether the modal has a border
     */
    bordered: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      uid: idCounter++
    }
  },
  computed: {
    /**
     * Computed property for v-model support
     */
    isOpen: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    /**
     * Unique ID for the modal title (accessibility)
     */
    titleId() {
      return `f-modal-title-${this.uid}`
    },
    /**
     * Modal container classes
     */
    modalClasses() {
      const baseClasses = 'relative bg-white rounded-lg overflow-hidden shadow-xl transition-all'
      const borderedClasses = this.bordered ? 'border border-gray-200' : ''
      
      const sizeClasses = {
        small: 'w-full max-w-sm',
        medium: 'w-full max-w-lg',
        large: 'w-full max-w-2xl',
        full: 'w-full max-w-full m-4'
      }
      
      return [
        baseClasses,
        borderedClasses,
        sizeClasses[this.size]
      ].filter(Boolean).join(' ')
    }
  },
  watch: {
    /**
     * Watch for modal open/close to manage body scroll
     */
    isOpen: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.lockBodyScroll()
          this.$nextTick(() => {
            if (this.closeOnEscape) {
              document.addEventListener('keydown', this.handleKeydown)
            }
          })
        } else {
          this.unlockBodyScroll()
          document.removeEventListener('keydown', this.handleKeydown)
        }
      }
    }
  },
  beforeDestroy() {
    this.unlockBodyScroll()
    document.removeEventListener('keydown', this.handleKeydown)
  },
  methods: {
    /**
     * Handle overlay click
     */
    handleOverlayClick() {
      if (this.closeOnOverlay) {
        this.handleClose()
      }
    },
    /**
     * Handle close action
     */
    handleClose() {
      this.isOpen = false
      this.$emit('close')
    },
    /**
     * Handle keyboard events
     */
    handleKeydown(event) {
      if (event.key === 'Escape' && this.closeOnEscape) {
        this.handleClose()
      }
    },
    /**
     * Lock body scroll when modal is open
     */
    lockBodyScroll() {
      document.body.style.overflow = 'hidden'
    },
    /**
     * Unlock body scroll when modal is closed
     */
    unlockBodyScroll() {
      document.body.style.overflow = ''
    }
  }
}
</script>
