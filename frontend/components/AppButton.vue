<template>
  <div class="mx-auto text-center">
    <component
      :is="tagType"
      :to="to"
      class="app-button inline-block bg-teal hover:opacity-75 text-white uppercase bg-gray-800 text-2xl mx-auto mt-8 font-bold py-4 px-6 rounded"
      @click="emitEvent"
    >
      <slot></slot>
    </component>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    to: {
      type: String,
      default: '',
    },
  },

  computed: {
    tagType() {
      return this.to ? 'nuxt-link' : 'button'
    },
  },

  methods: {
    emitEvent() {
      this.$emit('click')
    },
  },
})
</script>
