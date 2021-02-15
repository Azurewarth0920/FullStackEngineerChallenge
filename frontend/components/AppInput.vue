<template>
  <div class="app-input text-3xl">
    <div class="flex flex-col">
      <label
        v-if="label"
        class="my-2 font-bold text-3xl text-orange-500"
        :for="`app-input-${name}`"
        >{{ label }}</label
      >
      <input
        :id="`app-input-${name}`"
        v-model="model"
        :name="name"
        class="border py-2 px-3 text-grey-darkest"
        :type="isPassword ? 'password' : 'text'"
        :placeholder="placeholder"
      />
    </div>
  </div>
</template>

<script>
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
      default: '',
    },

    isPassword: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
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
