<template>
  <component
    :is="computedTag"
    :class="['f-typography', `f-typography--${variant}`, { 'f-typography--truncate': truncate }]"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'FTypography',
  props: {
    variant: {
      type: String,
      default: 'body',
      validator: (value) => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body', 'caption', 'overline'].includes(value)
    },
    tag: {
      type: String,
      default: null
    },
    truncate: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    computedTag() {
      if (this.tag) return this.tag
      const tagMap = {
        h1: 'h1',
        h2: 'h2',
        h3: 'h3',
        h4: 'h4',
        h5: 'h5',
        h6: 'h6',
        body: 'p',
        caption: 'span',
        overline: 'span'
      }
      return tagMap[this.variant] || 'p'
    }
  }
}
</script>

<style scoped>
.f-typography {
  margin: 0;
  font-family: inherit;
  color: #1f2937;
}

.f-typography--h1 {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
}

.f-typography--h2 {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.25;
}

.f-typography--h3 {
  font-size: 1.75rem;
  font-weight: 600;
  line-height: 1.3;
}

.f-typography--h4 {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.35;
}

.f-typography--h5 {
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.4;
}

.f-typography--h6 {
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
}

.f-typography--body {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6;
}

.f-typography--caption {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  color: #6b7280;
}

.f-typography--overline {
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.5;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #6b7280;
}

.f-typography--truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
