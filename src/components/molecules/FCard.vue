<template>
  <div :class="cardClasses" @click="handleClick">
    <div v-if="$slots.header || title" class="px-4 pt-4">
      <slot name="header">
        <f-typography v-if="title" variant="h5">{{ title }}</f-typography>
        <f-typography v-if="subtitle" variant="caption">{{ subtitle }}</f-typography>
      </slot>
    </div>
    <div v-if="$slots.media" class="w-full [&_img]:w-full [&_img]:h-auto [&_img]:block">
      <slot name="media" />
    </div>
    <div class="p-4">
      <slot />
    </div>
    <div v-if="$slots.actions" class="px-4 pb-4 flex gap-2">
      <slot name="actions" />
    </div>
  </div>
</template>

<script>
import FTypography from '../atoms/FTypography.vue'

export default {
  name: 'FCard',
  components: {
    FTypography
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    clickable: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    cardClasses() {
      const baseClasses = 'bg-white rounded-lg overflow-hidden transition-all duration-200'
      const borderedClasses = this.bordered ? 'border border-gray-200' : ''
      const clickableClasses = this.clickable ? 'cursor-pointer hover:shadow-lg hover:-translate-y-0.5' : ''
      
      return [baseClasses, borderedClasses, clickableClasses].join(' ')
    }
  },
  methods: {
    handleClick(event) {
      if (this.clickable) {
        this.$emit('click', event)
      }
    }
  }
}
</script>
