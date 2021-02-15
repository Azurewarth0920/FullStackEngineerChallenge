<template>
  <div class="app-textarea">
    <textarea
      v-model="model"
      class="border-2 border-gray-800 w-full app-textarea__input p-4"
    ></textarea>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: {
      type: String,
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
.app-textarea {
  &__input {
    font-size: 1.6rem;
    resize: none;
    min-height: 300px;
  }
}
</style>
