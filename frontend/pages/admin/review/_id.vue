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
      </ul>
    </section>

    <app-button to="/admin/">back</app-button>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  middleware: ['authenticated', 'admin'],
  data() {
    return {
      content:
        'content content content content content content content content content',
      feedbacks: [
        {
          user: 'a-user',
          content: 'feeback feeback feeback feeback feeback',
        },
        {
          user: 'b-user',
          content: 'feeback feeback feeback feeback feeback',
        },
        {
          user: 'c-user',
          content: 'feeback feeback feeback feeback feeback',
        },
        {
          user: 'd-user',
          content: 'feeback feeback feeback feeback feeback',
        },
        {
          user: 'e-user',
          content: 'feeback feeback feeback feeback feeback',
        },
      ],
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
