<template>
  <div class="app-input text-3xl">
    <div class="flex flex-col items-start">
      <label
        v-if="label"
        class="my-2 font-bold text-3xl text-white"
        :for="`app-input-${name}`"
        >{{ label }}</label
      >
      <input
        :id="`app-input-${name}`"
        v-model="model"
        :name="name"
        class="border py-2 px-3 text-grey-darkest w-full"
        :type="isPassword ? 'password' : 'text'"
        :placeholder="placeholder"
      />
      <p class="p-2 rounded-md text-base bg-yellow-400 inline-block mt-2">
        Required
      </p>
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

    isRequired: {
      type: Boolean,
      default: true,
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
