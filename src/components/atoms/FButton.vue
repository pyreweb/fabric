<template>
  <button
    :class="['f-button', `f-button--${variant}`, `f-button--${size}`, { 'f-button--disabled': disabled }]"
    :disabled="disabled"
    :type="type"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'FButton',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'outline', 'text'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    type: {
      type: String,
      default: 'button',
      validator: (value) => ['button', 'submit', 'reset'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick(event) {
      if (!this.disabled) {
        this.$emit('click', event)
      }
    }
  }
}
</script>

<style scoped>
.f-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.f-button--small {
  padding: 6px 12px;
  font-size: 12px;
}

.f-button--medium {
  padding: 10px 20px;
  font-size: 14px;
}

.f-button--large {
  padding: 14px 28px;
  font-size: 16px;
}

.f-button--primary {
  background-color: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.f-button--primary:hover:not(.f-button--disabled) {
  background-color: #2563eb;
  border-color: #2563eb;
}

.f-button--secondary {
  background-color: #6b7280;
  color: white;
  border-color: #6b7280;
}

.f-button--secondary:hover:not(.f-button--disabled) {
  background-color: #4b5563;
  border-color: #4b5563;
}

.f-button--outline {
  background-color: transparent;
  color: #3b82f6;
  border-color: #3b82f6;
}

.f-button--outline:hover:not(.f-button--disabled) {
  background-color: #3b82f6;
  color: white;
}

.f-button--text {
  background-color: transparent;
  color: #3b82f6;
  border-color: transparent;
}

.f-button--text:hover:not(.f-button--disabled) {
  background-color: rgba(59, 130, 246, 0.1);
}

.f-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
