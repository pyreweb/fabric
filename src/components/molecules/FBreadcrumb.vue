<template>
  <nav
    :class="breadcrumbClasses"
    :aria-label="ariaLabel"
  >
    <ol class="flex items-center flex-wrap gap-1">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="flex items-center"
      >
        <!-- Separator (displayed before all items except the first) -->
        <f-icon
          v-if="index > 0"
          :name="separatorIcon"
          size="sm"
          :class="separatorClasses"
        />
        
        <!-- Breadcrumb Item -->
        <component
          :is="isCurrentItem(index) ? 'span' : 'a'"
          :href="isCurrentItem(index) ? undefined : item.href"
          :class="getItemClasses(index)"
          :aria-current="isCurrentItem(index) ? 'page' : undefined"
          @click="handleItemClick($event, item, index)"
        >
          <f-icon
            v-if="item.icon"
            :name="item.icon"
            size="sm"
            class="mr-1"
          />
          <f-typography
            variant="body"
            tag="span"
            :class="getTextClasses(index)"
          >
            {{ item.label }}
          </f-typography>
        </component>
      </li>
    </ol>
  </nav>
</template>

<script>
import FIcon from '../atoms/FIcon.vue'
import FTypography from '../atoms/FTypography.vue'

export default {
  name: 'FBreadcrumb',
  components: {
    FIcon,
    FTypography
  },
  props: {
    items: {
      type: Array,
      required: true,
      validator: (value) => value.every(item => 
        typeof item.label === 'string' &&
        (item.href === undefined || typeof item.href === 'string') &&
        (item.icon === undefined || typeof item.icon === 'string')
      )
    },
    separatorIcon: {
      type: String,
      default: 'chevron-right'
    },
    ariaLabel: {
      type: String,
      default: 'Fil d\'Ariane'
    }
  },
  computed: {
    breadcrumbClasses() {
      return 'inline-flex'
    },
    separatorClasses() {
      return 'mx-2 text-gray-400 flex-shrink-0'
    }
  },
  methods: {
    isCurrentItem(index) {
      return index === this.items.length - 1
    },
    getItemClasses(index) {
      const baseClasses = 'inline-flex items-center'
      
      if (this.isCurrentItem(index)) {
        return [
          baseClasses,
          'cursor-default'
        ].join(' ')
      }
      
      return [
        baseClasses,
        'cursor-pointer',
        'hover:underline',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-blue-500/20',
        'focus:rounded'
      ].join(' ')
    },
    getTextClasses(index) {
      if (this.isCurrentItem(index)) {
        return 'font-semibold text-gray-800'
      }
      return 'text-blue-600 hover:text-blue-800'
    },
    handleItemClick(event, item, index) {
      if (this.isCurrentItem(index)) {
        event.preventDefault()
        return
      }
      
      this.$emit('navigate', { item, index, event })
      
      // If the item has no href, prevent default and let the parent handle navigation
      if (!item.href) {
        event.preventDefault()
      }
    }
  }
}
</script>
