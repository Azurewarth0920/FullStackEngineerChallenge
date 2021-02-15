<template>
  <div
    class="add-user-input border-2 border-gray-800 p-4 flex items-baseline flex-wrap mb-4"
  >
    <app-input v-model="name" class="mr-2" name="name" placeholder="Name" />
    <app-input
      v-model="password"
      name="password"
      placeholder="Password"
      is-password
    />
    <app-checkbox v-model="isAdmin" class="my-0">Admin</app-checkbox>
    <button class="text-3xl px-2 mx-2" @click="modifyUser">✔️</button>
    <button class="text-3xl px-2 mx-2" @click="dispose">❌</button>
  </div>
</template>

<script>
import Vue from 'vue'
import updateUser from '@/gql/updateUser.gql'
import createUser from '@/gql/createUser.gql'

export default Vue.extend({
  props: {
    nameFromParent: {
      type: String,
      default: '',
    },
    adminFromParent: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {
      name: this.nameFromParent,
      password: '',
      isAdmin: this.adminFromParent,
    }
  },

  computed: {
    mutation() {
      return this.userId == null ? createUser : updateUser
    },
    mutationPayload() {
      return this.userId == null
        ? {
            option: {
              name: this.name,
              password: this.password,
              isAdmin: this.isAdmin,
            },
          }
        : {
            id: this.userId,
            option: {
              name: this.name,
              password: this.password,
              isAdmin: this.isAdmin,
            },
          }
    },
  },

  methods: {
    async modifyUser() {
      try {
        await this.$apollo.mutate({
          mutation: this.mutation,
          variables: {
            ...this.mutationPayload,
          },
        })
        this.$emit('dispose')
      } catch (error) {
        this.$nuxt.error(error)
      }
    },

    dispose() {
      this.$emit('dispose')
    },
  },
})
</script>
