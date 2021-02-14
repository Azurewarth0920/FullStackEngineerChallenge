<template>
  <header class="app-header p-2 border-gray-800">
    <span class="text-3xl font-bold">Hi, User</span>
    <!-- visibility -->
    <nuxt-link class="text-3xl font-bold text-gray-800" to="/admin/"
      >Admin</nuxt-link
    >
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style lang="scss" scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid;
}
</style>
