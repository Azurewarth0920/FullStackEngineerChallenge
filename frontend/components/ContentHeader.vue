<template>
  <div class="content-header">
    <h2 class="content-header__title text-2xl font-bold my-4"><slot></slot></h2>
  </div>
</template>

<style lang="scss" scoped>
.content-header {
  &_title {
    border-bottom: 2px solid;
  }
}
</style>
