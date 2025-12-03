<template>
  <nav
    :class="containerClasses"
    role="navigation"
    aria-label="Pagination"
  >
    <f-button
      :variant="buttonVariant"
      :size="size"
      :disabled="currentPage <= 1"
      @click="goToPreviousPage"
    >
      <template #iconLeft>
        <f-icon name="chevron-left" :size="iconSize" />
      </template>
      <span :class="{ 'sr-only': !showLabels }">{{ previousLabel }}</span>
    </f-button>

    <div class="flex items-center gap-1">
      <template v-for="(page, index) in visiblePages">
        <span
          v-if="page === '...'"
          :key="'ellipsis-' + index"
          class="px-2 text-gray-400"
        >
          ...
        </span>
        <template v-else>
          <span
            v-if="page === currentPage"
            :key="page"
            aria-current="page"
          >
            <f-button
              :variant="activeVariant"
              :size="size"
              @click="goToPage(page)"
            >
              {{ page }}
            </f-button>
          </span>
          <f-button
            v-else
            :key="page"
            :variant="buttonVariant"
            :size="size"
            @click="goToPage(page)"
          >
            {{ page }}
          </f-button>
        </template>
      </template>
    </div>

    <f-button
      :variant="buttonVariant"
      :size="size"
      :disabled="currentPage >= totalPages"
      @click="goToNextPage"
    >
      <span :class="{ 'sr-only': !showLabels }">{{ nextLabel }}</span>
      <template #iconRight>
        <f-icon name="chevron-right" :size="iconSize" />
      </template>
    </f-button>
  </nav>
</template>

<script>
import FButton from '../atoms/FButton.vue'
import FIcon from '../atoms/FIcon.vue'

export default {
  name: 'FPagination',
  components: {
    FButton,
    FIcon
  },
  props: {
    value: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      required: true,
      validator: (value) => value >= 1
    },
    maxVisiblePages: {
      type: Number,
      default: 5,
      validator: (value) => value >= 3
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    variant: {
      type: String,
      default: 'outline',
      validator: (value) => ['outline', 'ghost'].includes(value)
    },
    previousLabel: {
      type: String,
      default: 'Précédent'
    },
    nextLabel: {
      type: String,
      default: 'Suivant'
    },
    showLabels: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    currentPage() {
      return this.value
    },
    buttonVariant() {
      return this.variant
    },
    activeVariant() {
      return 'primary'
    },
    iconSize() {
      const sizeMap = {
        small: 'sm',
        medium: 'sm',
        large: 'md'
      }
      return sizeMap[this.size]
    },
    containerClasses() {
      return 'flex items-center gap-2'
    },
    visiblePages() {
      const total = this.totalPages
      const current = this.currentPage
      const max = this.maxVisiblePages

      if (total <= max) {
        return this.range(1, total)
      }

      const half = Math.floor((max - 1) / 2)
      let start = current - half
      let end = current + (max - 1 - half)

      if (start < 1) {
        start = 1
        end = max
      }

      if (end > total) {
        end = total
        start = total - max + 1
      }

      const pages = []

      if (start > 1) {
        pages.push(1)
        if (start > 2) {
          pages.push('...')
        }
      }

      for (let i = start; i <= end; i++) {
        if (i >= 1 && i <= total) {
          // Skip page 1 if already added in the first block
          // (removed unreachable condition)
          pages.push(i)
        }
      }

      if (end < total) {
        if (end < total - 1) {
          pages.push('...')
        }
        pages.push(total)
      }

      return pages
    }
  },
  methods: {
    range(start, end) {
      const result = []
      for (let i = start; i <= end; i++) {
        result.push(i)
      }
      return result
    },
    goToPage(page) {
      if (page !== this.currentPage && page >= 1 && page <= this.totalPages) {
        this.$emit('input', page)
        this.$emit('change', page)
      }
    },
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.goToPage(this.currentPage - 1)
      }
    },
    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.goToPage(this.currentPage + 1)
      }
    }
  }
}
</script>
