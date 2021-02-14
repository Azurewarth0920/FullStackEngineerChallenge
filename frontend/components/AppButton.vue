<template>
  <button
    class="app-button block bg-teal hover:bg-teal-dark text-white uppercase bg-gray-800 text-2xl font-bold mx-auto mt-8 py-4 px-6 rounded"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>
