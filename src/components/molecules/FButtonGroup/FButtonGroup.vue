<template>
  <div
    :class="containerClasses"
    role="group"
    :aria-label="ariaLabel"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FButtonGroup',
  props: {
    value: {
      type: [String, Number, Array],
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    ariaLabel: {
      type: String,
      default: 'Groupe de boutons'
    }
  },
  computed: {
    containerClasses() {
      return 'inline-flex [&>*]:rounded-none [&>*:first-child]:rounded-l [&>*:last-child]:rounded-r [&>*:not(:first-child)]:-ml-px [&>*]:focus:z-10'
    },
    selectedValues() {
      if (this.multiple) {
        return Array.isArray(this.value) ? this.value : []
      }
      return this.value
    }
  },
  methods: {
    isSelected(itemValue) {
      if (this.multiple) {
        return this.selectedValues.includes(itemValue)
      }
      return this.selectedValues === itemValue
    },
    handleSelect(itemValue) {
      if (this.multiple) {
        const currentValues = [...this.selectedValues]
        const index = currentValues.indexOf(itemValue)
        if (index > -1) {
          currentValues.splice(index, 1)
        } else {
          currentValues.push(itemValue)
        }
        this.$emit('input', currentValues)
        this.$emit('change', currentValues)
      } else {
        this.$emit('input', itemValue)
        this.$emit('change', itemValue)
      }
    }
  },
  provide() {
    return {
      buttonGroup: {
        isSelected: this.isSelected,
        handleSelect: this.handleSelect
      }
    }
  }
}
</script>
