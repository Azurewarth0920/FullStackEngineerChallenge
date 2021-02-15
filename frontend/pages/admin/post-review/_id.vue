<template>
  <div class="admin-reivew">
    <content-header>New Review</content-header>
    <app-textarea v-model="content"></app-textarea>
    <content-header>Assignees</content-header>

    <div class="admin-reivew__assignees px-2 border-2 border-gray-800">
      <app-checkbox
        v-for="item in assignees"
        :key="item.id"
        v-model="item.chosen"
        >{{ item.name }}</app-checkbox
      >
    </div>

    <app-button @click="submit">submit</app-button>
  </div>
</template>

<script>
import Vue from 'vue'
import fetchUsers from '@/gql/fetchUsers.gql'
import fetchReview from '@/gql/fetchReview.gql'
import updateReview from '@/gql/updateReview.gql'
import createReview from '@/gql/createReview.gql'

export default Vue.extend({
  middleware: ['authenticated', 'admin'],

  async asyncData({ route, app }) {
    const reviewId = route.params.id

    const { data } = await app.apolloProvider.defaultClient.query({
      query: fetchUsers,
    })

    if (!reviewId) {
      return {
        assignees: data.users.map((item) => ({ chosen: false, ...item })),
      }
    }

    const { data: reviewData } = await app.apolloProvider.defaultClient.query({
      query: fetchReview,
      variables: {
        id: Number(reviewId),
      },
    })

    const assigneesIds = reviewData.review.assignees.map((item) => item.id)

    return {
      content: reviewData.review.content,
      assignees: data.users.map((item) => ({
        chosen: assigneesIds.includes(item.id),
        ...item,
      })),
      isEditing: true,
    }
  },

  data() {
    return {
      content: '',
      assignees: [],
      isEditing: false,
    }
  },

  computed: {
    mutation() {
      return this.isEditing ? updateReview : createReview
    },
    mutationPayload() {
      return this.isEditing
        ? {
            id: Number(this.$route.params.id),
            option: {
              content: this.content,
              userIds: this.assignees
                .filter((item) => item.chosen)
                .map((item) => item.id),
            },
          }
        : {
            option: {
              content: this.content,
              userIds: this.assignees
                .filter((item) => item.chosen)
                .map((item) => item.id),
            },
          }
    },
  },

  methods: {
    async submit() {
      try {
        await this.$apollo.mutate({
          mutation: this.mutation,
          variables: {
            ...this.mutationPayload,
          },
        })

        this.$router.push('/admin/')
      } catch (error) {
        this.$nuxt.error(error)
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.admin-reivew {
  &__assignees {
    max-height: 140px;
    overflow: auto;
  }
}
</style>
