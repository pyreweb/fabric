<template>
  <form class="f-form" @submit.prevent="handleSubmit">
    <slot />
    <div v-if="$slots.actions" class="f-form__actions">
      <slot name="actions" />
    </div>
  </form>
</template>

<script>
export default {
  name: 'FForm',
  methods: {
    handleSubmit(event) {
      this.$emit('submit', event)
    }
  }
}
</script>

<style scoped>
.f-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.f-form__actions {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}
</style>
