<template>
  <div class="page-index">
    <operative-list title="Reviews">
      <operative-item
        v-for="item in reviews"
        :key="item"
        is-writable
        annotation="this is annotation"
      ></operative-item>
    </operative-list>
    <operative-list title="Feedbacks">
      <operative-item
        v-for="item in feedbacks"
        :key="item"
        is-editable
        is-disposable
      ></operative-item>
    </operative-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      reviews: [1, 2, 3, 4],
      feedbacks: [1, 2, 3, 4],
    }
  },
})
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
