<template>
  <div
    :class="listItemClasses"
    :tabindex="clickable ? 0 : undefined"
    :role="clickable ? 'button' : undefined"
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <div v-if="$slots.left" class="flex-shrink-0">
      <slot name="left" />
    </div>

    <div class="flex-1 min-w-0">
      <f-typography
        v-if="title"
        variant="body"
        :truncate="truncate"
        :class="titleClasses"
      >
        {{ title }}
      </f-typography>
      <f-typography
        v-if="subtitle"
        variant="caption"
        :truncate="truncate"
        :class="subtitleClasses"
      >
        {{ subtitle }}
      </f-typography>
      <slot name="content" />
    </div>

    <div v-if="$slots.right" class="flex-shrink-0">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
import FTypography from '../../atoms/FTypography/FTypography.vue'

export default {
  name: 'FListItem',
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
    selected: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    truncate: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    listItemClasses() {
      const baseClasses = 'flex items-center gap-3 px-4 py-3 transition-all duration-200'
      const clickableClasses = this.clickable && !this.disabled
        ? 'cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20'
        : ''
      const selectedClasses = this.selected ? 'bg-blue-50' : ''
      const disabledClasses = this.disabled ? 'opacity-50 cursor-not-allowed' : ''

      return [
        baseClasses,
        clickableClasses,
        selectedClasses,
        disabledClasses
      ].filter(Boolean).join(' ')
    },
    titleClasses() {
      return this.disabled ? 'text-gray-400' : ''
    },
    subtitleClasses() {
      return this.disabled ? 'text-gray-300' : ''
    }
  },
  methods: {
    handleClick(event) {
      if (!this.disabled && this.clickable) {
        this.$emit('click', event)
      }
    }
  }
}
</script>
