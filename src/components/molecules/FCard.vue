<template>
  <div :class="['f-card', { 'f-card--clickable': clickable, 'f-card--bordered': bordered }]" @click="handleClick">
    <div v-if="$slots.header || title" class="f-card__header">
      <slot name="header">
        <f-typography v-if="title" variant="h5">{{ title }}</f-typography>
        <f-typography v-if="subtitle" variant="caption">{{ subtitle }}</f-typography>
      </slot>
    </div>
    <div v-if="$slots.media" class="f-card__media">
      <slot name="media" />
    </div>
    <div class="f-card__content">
      <slot />
    </div>
    <div v-if="$slots.actions" class="f-card__actions">
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
  methods: {
    handleClick(event) {
      if (this.clickable) {
        this.$emit('click', event)
      }
    }
  }
}
</script>

<style scoped>
.f-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s ease;
}

.f-card--bordered {
  border: 1px solid #e5e7eb;
}

.f-card--clickable {
  cursor: pointer;
}

.f-card--clickable:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.f-card__header {
  padding: 16px 16px 0;
}

.f-card__media {
  width: 100%;
}

.f-card__media ::v-deep img {
  width: 100%;
  height: auto;
  display: block;
}

.f-card__content {
  padding: 16px;
}

.f-card__actions {
  padding: 0 16px 16px;
  display: flex;
  gap: 8px;
}
</style>
