<template>
  <div class="page-index">
    <operative-list title="Reviews">
      <operative-item
        v-for="item in reviews"
        :key="item.id"
        is-writable
        @write="postFeedback(item.id)"
        >{{ item.content }}</operative-item
      >
    </operative-list>
    <operative-list title="Feedbacks">
      <operative-item
        v-for="item in feedbacks"
        :key="item.id"
        is-editable
        is-disposable
        :annotation="`Review id is '${item.reviewId}'`"
        @edit="editFeedBack(item.id, item.reviewId)"
        @dispose="deleteFeedback(item.id)"
        >{{ item.content }}</operative-item
      >
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

  methods: {
    postFeedback(reviewId) {
      this.$router.push(`/post-feedback/${reviewId}`)
    },
    editFeedBack(feedBackId, reviewId) {
      this.$router.push(`/post-feedback/${reviewId}?edit=${feedBackId}`)
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
