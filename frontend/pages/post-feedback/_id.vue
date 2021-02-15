<template>
  <div class="page-post-feedback">
    <content-header>Review:</content-header>
    <p class="page-post-feedback__content text-2xl">{{ review }}</p>
    <content-header>Feedback</content-header>
    <app-textarea v-model="feedback"></app-textarea>
    <app-button @click="submit">{{ submitText }}</app-button>
  </div>
</template>

<script>
import Vue from 'vue'
import fetchReview from '@/gql/fetchReview.gql'
import createFeedback from '@/gql/createFeedback.gql'
import updateFeedback from '@/gql/updateFeedback.gql'

export default Vue.extend({
  middleware: ['authenticated'],
  async asyncData({ app, route, store }) {
    const reviewId = route.params.id
    if (reviewId == null) {
      app.context.error('an review id needs to be specific.')
      return {}
    }

    const { data } = await app.apolloProvider.defaultClient.query({
      query: fetchReview,
      variables: {
        id: Number(reviewId),
      },
    })

    const selfFeedback = data.review.feedbacks.find(
      (item) => item.ownerId === store.state.user.id
    )

    return {
      review: data.review.content,
      isEditing: selfFeedback ? selfFeedback.id : null,
      feedback: selfFeedback ? selfFeedback.content : '',
    }
  },

  data() {
    return {
      review: '',
      feedback: '',
      isEditing: null,
    }
  },

  computed: {
    submitText() {
      return this.isEditing ? 'Edit' : 'Submit'
    },
    mutation() {
      return this.isEditing ? updateFeedback : createFeedback
    },
    mutationPayload() {
      return this.isEditing
        ? {
            content: this.feedback,
            id: this.isEditing,
          }
        : {
            option: {
              content: this.feedback,
              ownerId: this.$store.state.user.id,
              reviewId: Number(this.$route.params.id),
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

        this.$router.push('/')
      } catch (error) {
        this.$toast.show('Fail on posting feedback.', {
          type: 'error',
          duration: 2000,
          position: 'top-center',
        })
      }
    },
  },
})
</script>
