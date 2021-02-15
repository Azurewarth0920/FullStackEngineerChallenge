<template>
  <div class="page-admin">
    <operative-list title="Reviews">
      <operative-item
        v-for="item in reviews"
        :key="item.id"
        is-editable
        is-disposable
        :detail-path="`/admin/review/${item.id}`"
        :annotation="`${
          item.feedbacks.length
            ? `${item.feedbacks.length} feedback on this review`
            : ''
        }`"
        @edit="editReview(item.id)"
        @dispose="deleteReview(item.id)"
        >{{ item.content }}</operative-item
      >
      <li v-if="!reviews.length">
        <empty-notification>Review is empty.</empty-notification>
      </li>
      <li>
        <app-button to="/admin/post-review/">Add Review</app-button>
      </li>
    </operative-list>
    <operative-list title="Users">
      <div v-for="(item, key) in users" :key="item.id">
        <operative-item
          v-if="!item.isEditing"
          is-editable
          is-disposable
          @edit="setEdit(key, true)"
          @dispose="deleteUser(item.id)"
          >{{ item.name }}</operative-item
        ><add-user-input
          v-else
          :user-id="item.id"
          :admin-from-parent="item.isAdmin"
          :name-from-parent="item.name"
          @dispose="setEdit(key, false)"
          @success="changeUser"
        />
      </div>

      <add-user-input
        v-if="isAddingUser"
        @success="changeUser"
        @dispose="switchAddUser(false)"
      />
      <li>
        <app-button @click="switchAddUser(true)">Add User</app-button>
      </li>
    </operative-list>
  </div>
</template>

<script>
import Vue from 'vue'
import fetchAll from '@/gql/fetchAll.gql'
import deleteReview from '@/gql/deleteReview.gql'
import deleteUser from '@/gql/deleteUser.gql'

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

    setEdit(key, status) {
      this.users[key].isEditing = status
    },

    async deleteReview(reviewId) {
      try {
        await this.$apollo.mutate({
          mutation: deleteReview,
          variables: {
            id: reviewId,
          },
        })

        this.reviews = this.reviews.filter((item) => item.id !== reviewId)
      } catch (error) {
        this.$toast.show('Fail on deleting review.', {
          type: 'error',
          duration: 2000,
          position: 'top-center',
        })
      }
    },

    async deleteUser(userId) {
      try {
        await this.$apollo.mutate({
          mutation: deleteUser,
          variables: {
            id: userId,
          },
        })

        this.users = this.users.filter((item) => item.id !== userId)
      } catch (error) {
        this.$toast.show('Fail on deleting user.', {
          type: 'error',
          duration: 2000,
          position: 'top-center',
        })
      }
    },

    changeUser({ isNew, id, isAdmin, name }) {
      if (isNew) {
        this.users.push({
          isAdmin,
          name,
          id,
          isEditing: false,
        })

        this.isAddingUser = false
      } else {
        const targetUser = this.users.find((item) => item.id === id)
        targetUser.isAdmin = isAdmin
        targetUser.name = name
        targetUser.isEditing = false
      }
    },
  },
})
</script>
