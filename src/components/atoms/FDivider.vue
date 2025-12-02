<template>
  <div
    role="separator"
    :aria-orientation="orientation"
    :class="dividerClasses"
  >
    <template v-if="hasContent">
      <span :class="startLineClasses"></span>
      <span :class="contentClasses">
        <slot />
      </span>
      <span :class="endLineClasses"></span>
    </template>
    <span v-else :class="simpleLineClasses"></span>
  </div>
</template>

<script>
const ALLOWED_COLORS = [
  'gray-100', 'gray-200', 'gray-300', 'gray-400', 'gray-500',
  'blue-300', 'blue-400', 'blue-500',
  'red-300', 'red-400', 'red-500',
  'green-300', 'green-400', 'green-500',
  'yellow-300', 'yellow-400', 'yellow-500'
]

const CONTENT_OFFSET_WIDTH = 'w-4'
const CONTENT_OFFSET_HEIGHT = 'h-4'

export default {
  name: 'FDivider',
  props: {
    orientation: {
      type: String,
      default: 'horizontal',
      validator: (value) => ['horizontal', 'vertical'].includes(value)
    },
    align: {
      type: String,
      default: 'center',
      validator: (value) => ['left', 'center', 'right'].includes(value)
    },
    color: {
      type: String,
      default: 'gray-300',
      validator: (value) => ALLOWED_COLORS.includes(value)
    },
    margin: {
      type: String,
      default: 'md',
      validator: (value) => ['none', 'sm', 'md', 'lg'].includes(value)
    },
    thickness: {
      type: String,
      default: 'thin',
      validator: (value) => ['thin', 'medium', 'thick'].includes(value)
    }
  },
  computed: {
    hasContent() {
      return !!this.$slots.default
    },
    dividerClasses() {
      const baseClasses = 'flex items-center'

      const orientationClasses = this.orientation === 'vertical'
        ? 'flex-col h-full'
        : 'flex-row w-full'

      const marginClasses = {
        none: '',
        sm: this.orientation === 'vertical' ? 'mx-2' : 'my-2',
        md: this.orientation === 'vertical' ? 'mx-4' : 'my-4',
        lg: this.orientation === 'vertical' ? 'mx-6' : 'my-6'
      }

      return [
        baseClasses,
        orientationClasses,
        marginClasses[this.margin]
      ].filter(Boolean).join(' ')
    },
    thicknessClass() {
      const thicknessClasses = {
        thin: this.orientation === 'vertical' ? 'w-px' : 'h-px',
        medium: this.orientation === 'vertical' ? 'w-0.5' : 'h-0.5',
        thick: this.orientation === 'vertical' ? 'w-1' : 'h-1'
      }
      return thicknessClasses[this.thickness]
    },
    colorClass() {
      const colorClasses = {
        'gray-100': 'bg-gray-100',
        'gray-200': 'bg-gray-200',
        'gray-300': 'bg-gray-300',
        'gray-400': 'bg-gray-400',
        'gray-500': 'bg-gray-500',
        'blue-300': 'bg-blue-300',
        'blue-400': 'bg-blue-400',
        'blue-500': 'bg-blue-500',
        'red-300': 'bg-red-300',
        'red-400': 'bg-red-400',
        'red-500': 'bg-red-500',
        'green-300': 'bg-green-300',
        'green-400': 'bg-green-400',
        'green-500': 'bg-green-500',
        'yellow-300': 'bg-yellow-300',
        'yellow-400': 'bg-yellow-400',
        'yellow-500': 'bg-yellow-500'
      }
      return colorClasses[this.color]
    },
    simpleLineClasses() {
      const fullSize = this.orientation === 'vertical' ? 'h-full' : 'w-full'

      return [
        fullSize,
        this.thicknessClass,
        this.colorClass
      ].filter(Boolean).join(' ')
    },
    startLineClasses() {
      const offsetClass = this.orientation === 'vertical' ? CONTENT_OFFSET_HEIGHT : CONTENT_OFFSET_WIDTH

      const alignGrow = {
        left: `flex-none ${offsetClass}`,
        center: 'flex-1',
        right: 'flex-1'
      }

      return [
        alignGrow[this.align],
        this.thicknessClass,
        this.colorClass
      ].filter(Boolean).join(' ')
    },
    endLineClasses() {
      const offsetClass = this.orientation === 'vertical' ? CONTENT_OFFSET_HEIGHT : CONTENT_OFFSET_WIDTH

      const alignGrow = {
        left: 'flex-1',
        center: 'flex-1',
        right: `flex-none ${offsetClass}`
      }

      return [
        alignGrow[this.align],
        this.thicknessClass,
        this.colorClass
      ].filter(Boolean).join(' ')
    },
    contentClasses() {
      const baseClasses = 'font-sans text-sm text-gray-500'

      const spacingClasses = this.orientation === 'vertical'
        ? 'py-2'
        : 'px-3'

      return [
        baseClasses,
        spacingClasses
      ].filter(Boolean).join(' ')
    }
  }
}
</script>
