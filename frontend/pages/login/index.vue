<template>
  <div class="page-login min-h-screen">
    <form
      class="max-w-xl w-full rounded-2xl bg-green-200 p-12 page-login_form"
      action="/"
      method="post"
      @submit.prevent="submit"
    >
      <app-input name="name" :value="name" label="Name" />
      <app-input
        name="password"
        :value="password"
        label="Password"
        is-password
      />
      <app-button>Login</app-button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppButton from '../../components/AppButton.vue'

export default Vue.extend({
  components: { AppButton },
  data() {
    return {
      name: '',
      password: '',
    }
  },

  methods: {
    submit() {
      console.log('submit')
    },
  },
})
</script>

<style lang="scss" scoped>
.page-login {
  display: grid;
  place-items: center;

  &_form {
    background: linear-gradient(-110deg, #176473, #11887f);
  }
}
</style>
