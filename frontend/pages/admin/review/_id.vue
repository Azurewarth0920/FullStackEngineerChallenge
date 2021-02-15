<template>
  <div class="page-review">
    <section>
      <content-header>Review:</content-header>
      <p class="border-2 border-gray-800 text-2xl p-4">{{ content }}</p>
    </section>

    <section>
      <content-header>Feedbacks:</content-header>
      <ul>
        <li
          v-for="feedbackItem in feedbacks"
          :key="feedbackItem.user"
          class="page-reivew__feedback-item py-2"
        >
          <p class="text-2xl font-bold">{{ feedbackItem.user }} :</p>
          <p class="text-2xl">{{ feedbackItem.content }}</p>
        </li>
        <li v-if="!feedbacks.length">
          <empty-notification>Feedback is empty.</empty-notification>
        </li>
      </ul>
    </section>

    <app-button to="/admin/">back</app-button>
  </div>
</template>

<script>
import Vue from 'vue'
import fetchReview from '@/gql/fetchReview.gql'

export default Vue.extend({
  middleware: ['authenticated', 'admin'],

  async asyncData({ app, route }) {
    const reviewId = route.params.id

    const { data } = await app.apolloProvider.defaultClient.query({
      query: fetchReview,
      variables: {
        id: Number(reviewId),
      },
    })

    const assigneesTable = data.review.assignees.reduce((acc, cur) => {
      acc[cur.id] = cur.name
      return acc
    }, {})

    return {
      content: data.review.content,
      feedbacks: data.review.feedbacks.map((item) => ({
        content: item.content,
        user: assigneesTable[item.ownerId],
      })),
    }
  },
  data() {
    return {
      content: '',
      feedbacks: [],
    }
  },
})
</script>

<style lang="scss" scoped>
.page-reivew {
  &__feedback-item + &__feedback-item {
    border-top: 1px solid #2d3748;
  }
}
</style>
