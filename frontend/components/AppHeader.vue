<template>
  <header class="app-header border-gray-800">
    <span class="text-4xl font-bold">Hi, User</span>
    <div>
      <nuxt-link
        v-if="isAdmin"
        class="text-3xl font-bold text-gray-800 px-4"
        :to="linkTarget.path"
        >{{ linkTarget.text }}</nuxt-link
      >

      <button class="text-3xl font-bold text-gray-800" @click="logout">
        Logout
      </button>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  computed: {
    isAdmin() {
      return this.$store.getters['user/isAdmin']
    },
    linkTarget() {
      return this.$route.path.includes('admin')
        ? {
            text: 'Top',
            path: '/',
          }
        : {
            text: 'Admin',
            path: '/admin/',
          }
    },
  },

  methods: {
    logout() {
      this.$store.commit('user/resetState')
      this.$router.push('/login/')
    },
  },
})
</script>

<style lang="scss" scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid;
}
</style>
