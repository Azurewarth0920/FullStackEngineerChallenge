<template>
  <div class="page-admin">
    <operative-list title="Reviews">
      <operative-item
        v-for="item in reviews"
        :key="item.id"
        is-editable
        :detail-path="`/admin/review/${item.id}`"
        @edit="editReview(item.id)"
        >{{ item.content }}</operative-item
      >
      <li>
        <app-button to="/admin/post-review/">Add Review</app-button>
      </li>
    </operative-list>
    <operative-list title="Users">
      <operative-item
        v-for="item in users"
        :key="item.id"
        is-editable
        is-disposable
        >{{ item.name }}</operative-item
      >
      <add-user-input v-if="isAddingUser" @dispose="switchAddUser(false)" />
      <li>
        <app-button @click="switchAddUser(true)">Add User</app-button>
      </li>
    </operative-list>
  </div>
</template>

<script>
import Vue from 'vue'
import fetchAll from '@/gql/fetchAll.gql'

export default Vue.extend({
  middleware: ['authenticated', 'admin'],

  async asyncData({ app }) {
    const { data } = await app.apolloProvider.defaultClient.query({
      query: fetchAll,
    })

    return {
      users: data.users.map((item) => ({ ...item, isEditing: false })),
      reviews: data.reviews,
    }
  },

  data() {
    return {
      reviews: [],
      users: [],
      isAddingUser: false,
    }
  },

  methods: {
    switchAddUser(status) {
      this.isAddingUser = status
    },

    editReview(reviewId) {
      this.$router.push(`/admin/post-review/${reviewId}`)
    },

    editUser(userId) {
      console.log(userId)
    },
  },
})
</script>
