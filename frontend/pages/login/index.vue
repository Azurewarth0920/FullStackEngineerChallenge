<template>
  <div class="page-login min-h-screen">
    <form
      class="max-w-xl w-full rounded-2xl bg-green-200 p-12 page-login_form"
      action="/"
      method="post"
      @submit.prevent="submit"
    >
      <app-input v-model="name" name="name" label="Name" />
      <app-input
        v-model="password"
        name="password"
        label="Password"
        is-password
      />
      <app-button>Login</app-button>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  layout: 'login',
  middleware: ['anonymous'],
  data() {
    return {
      name: '',
      password: '',
    }
  },

  methods: {
    async submit() {
      try {
        await this.$store.dispatch('user/login', {
          name: this.name,
          password: this.password,
        })
        this.$router.push('/')
      } catch (error) {
        this.$toast.show('Invalid user name or password.', {
          type: 'error',
          duration: 2000,
          position: 'top-center',
        })
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.page-login {
  display: grid;
  place-items: center;

  &_form {
    background: linear-gradient(-135deg, #1ea5c1, #90ded8);
  }
}
</style>
