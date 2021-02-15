<template>
  <div class="app-checkbox my-6 ml-2">
    <label class="flex items-center">
      <input v-model="model" type="checkbox" class="app-checkbox__input" />
      <span class="text-xl font-bold ml-4"><slot /></span>
    </label>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
})
</script>

<style lang="scss" scoped>
.app-checkbox {
  &__input {
    transform: scale(2);
  }
}
</style>
