<template>
  <div class="admin-reivew">
    <content-header>New Review</content-header>
    <app-textarea></app-textarea>
    <content-header>Assignees</content-header>

    <div class="admin-reivew__assignnes px-2 border-2 border-gray-800">
      <app-checkbox v-for="item in assignnes" :key="item"
        >assignne {{ item }}</app-checkbox
      >
    </div>

    <app-button>submit</app-button>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  middleware: ['authenticated', 'admin'],
  data() {
    return {
      assignnes: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    }
  },
})
</script>

<style lang="scss" scoped>
.admin-reivew {
  &__assignnes {
    max-height: 140px;
    overflow: auto;
  }
}
</style>
