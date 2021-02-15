<template>
  <div class="page-index">
    <operative-list title="Reviews">
      <operative-item
        v-for="item in filteredReviews"
        :key="item.id"
        is-writable
        @write="editFeedBack(item.id)"
        >{{ item.content }}</operative-item
      >
      <li v-if="!filteredReviews.length">
        <empty-notification>Reviews is empty.</empty-notification>
      </li>
    </operative-list>
    <operative-list title="Feedbacks">
      <operative-item
        v-for="item in feedbacks"
        :key="item.id"
        is-editable
        is-disposable
        :annotation="`Review id is '${item.reviewId}'`"
        @edit="editFeedBack(item.reviewId)"
        @dispose="deleteFeedback(item.id)"
        >{{ item.content }}</operative-item
      >
      <li v-if="!feedbacks.length">
        <empty-notification>Feedbacks is empty.</empty-notification>
      </li>
    </operative-list>
  </div>
</template>

<script>
import Vue from 'vue'
import fetchCurrent from '@/gql/fetchCurrent.gql'
import deleteFeedback from '@/gql/deleteFeedback.gql'

export default Vue.extend({
  middleware: ['authenticated'],

  async asyncData({ app }) {
    const { data } = await app.apolloProvider.defaultClient.query({
      query: fetchCurrent,
    })

    return {
      reviews: data.user.reviews,
      feedbacks: data.user.feedbacks,
    }
  },

  data() {
    return {
      reviews: [],
      feedbacks: [],
    }
  },

  computed: {
    filteredReviews() {
      const ownerReview = this.feedbacks.map((item) => item.reviewId)
      return this.reviews.filter((item) => !ownerReview.includes(item.id))
    },
  },

  methods: {
    editFeedBack(reviewId) {
      this.$router.push(`/post-feedback/${reviewId}`)
    },
    async deleteFeedback(feedbackId) {
      try {
        await this.$apollo.mutate({
          mutation: deleteFeedback,
          variables: {
            id: feedbackId,
          },
        })
        this.feedbacks = this.feedbacks.filter((item) => item.id !== feedbackId)
      } catch (error) {
        this.$nuxt.error(error)
      }
    },
  },
})
</script>
