<template>
  <div class="add-user-input flex items-center">
    <app-input v-model="name" class="mr-2" name="name" label="Name" />
    <app-input
      v-model="password"
      name="password"
      label="Password"
      is-password
    />
    <button class="text-3xl px-2 mx-2 mb-8" @click="addUser">✔️</button>
    <button class="text-3xl px-2 mx-2 mb-8" @click="dispose">❌</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      name: '',
      password: '',
    }
  },

  methods: {
    addUser() {
      this.$emit('dispose')
    },

    dispose() {
      this.$emit('dispose')
    },
  },
})
</script>
