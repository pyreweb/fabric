<template>
  <div :class="cardClasses">
    <div :class="iconContainerClasses">
      <f-icon
        :name="icon"
        size="md"
        :decorative="true"
      />
    </div>
    <div :class="contentClasses">
      <f-typography
        variant="caption"
        :class="labelClasses"
      >
        {{ label }}
      </f-typography>
      <f-typography
        variant="h4"
        :class="valueClasses"
      >
        {{ value }}
      </f-typography>
    </div>
  </div>
</template>

<script>
import FIcon from '../../atoms/FIcon/FIcon.vue'
import FTypography from '../../atoms/FTypography/FTypography.vue'

const VARIANT_COLORS = {
  primary: {
    iconContainer: 'bg-blue-100 text-blue-600'
  },
  success: {
    iconContainer: 'bg-green-100 text-green-600'
  },
  danger: {
    iconContainer: 'bg-red-100 text-red-600'
  },
  info: {
    iconContainer: 'bg-cyan-100 text-cyan-600'
  }
}

export default {
  name: 'FStatCard',
  components: {
    FIcon,
    FTypography
  },
  props: {
    icon: {
      type: String,
      default: 'info'
    },
    label: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'success', 'danger', 'info'].includes(value)
    },
    layout: {
      type: String,
      default: 'horizontal',
      validator: (value) => ['horizontal', 'vertical'].includes(value)
    },
    bordered: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    variantColors() {
      return VARIANT_COLORS[this.variant]
    },
    cardClasses() {
      const baseClasses = 'bg-white rounded-lg p-4'
      const borderedClasses = this.bordered ? 'border border-gray-200' : ''
      const layoutClasses = this.layout === 'vertical' 
        ? 'flex flex-col items-center text-center' 
        : 'flex items-center gap-4'
      
      return [baseClasses, borderedClasses, layoutClasses].filter(Boolean).join(' ')
    },
    iconContainerClasses() {
      const baseClasses = 'flex items-center justify-center rounded-lg w-12 h-12 flex-shrink-0'
      return `${baseClasses} ${this.variantColors.iconContainer}`
    },
    contentClasses() {
      const baseClasses = 'min-w-0'
      const verticalClasses = this.layout === 'vertical' ? 'mt-3' : ''
      
      return [baseClasses, verticalClasses].filter(Boolean).join(' ')
    },
    labelClasses() {
      return 'text-gray-500'
    },
    valueClasses() {
      return 'text-gray-900 font-bold'
    }
  }
}
</script>
