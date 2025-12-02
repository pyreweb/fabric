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
      default: 'gray-300'
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
      return `bg-${this.color}`
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
      const alignGrow = {
        left: 'flex-none w-4',
        center: 'flex-1',
        right: 'flex-1'
      }

      const verticalAlignGrow = {
        left: 'flex-none h-4',
        center: 'flex-1',
        right: 'flex-1'
      }

      const grow = this.orientation === 'vertical'
        ? verticalAlignGrow[this.align]
        : alignGrow[this.align]

      return [
        grow,
        this.thicknessClass,
        this.colorClass
      ].filter(Boolean).join(' ')
    },
    endLineClasses() {
      const alignGrow = {
        left: 'flex-1',
        center: 'flex-1',
        right: 'flex-none w-4'
      }

      const verticalAlignGrow = {
        left: 'flex-1',
        center: 'flex-1',
        right: 'flex-none h-4'
      }

      const grow = this.orientation === 'vertical'
        ? verticalAlignGrow[this.align]
        : alignGrow[this.align]

      return [
        grow,
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
