<template>
  <div class="app-input text-3xl">
    <div class="flex flex-col mb-4">
      <label
        class="mb-2 font-bold text-3xl text-white"
        :for="`app-input-${name}`"
        >{{ label }}</label
      >
      <input
        :id="`app-input-${name}`"
        :name="name"
        class="border py-2 px-3 text-grey-darkest"
        :type="isPassword ? 'password' : 'text'"
        @v-model="value"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    name: {
      type: String,
      required: true,
    },

    value: {
      type: String,
      required: true,
    },

    label: {
      type: String,
      required: true,
    },

    isPassword: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
