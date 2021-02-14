<template>
  <section class="operative-list my-2">
    <h2
      class="operative-list_title text-2xl font-bold border-gray-800 px-2 mb-4"
    >
      {{ title }}
    </h2>
    <ul class="px-4">
      <slot></slot>
    </ul>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: {
      required: true,
      type: String,
    },
  },
})
</script>

<style lang="scss" scoped>
.operative-list {
  &_title {
    border-bottom: 2px solid;
  }

  & + & {
    margin-top: 20px;
  }
}
</style>
