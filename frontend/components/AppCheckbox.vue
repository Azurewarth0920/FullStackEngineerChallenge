<template>
  <div class="app-checkbox my-6 ml-2">
    <label class="flex items-center">
      <input type="checkbox" class="app-checkbox__input" />
      <span class="text-xl font-bold ml-4"><slot /></span>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.app-checkbox {
  &__input {
    transform: scale(2);
  }
}
</style>
