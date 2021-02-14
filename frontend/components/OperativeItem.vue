<template>
  <li class="operative-item py-2">
    <div class="operative-item__wrapper">
      <p class="text-3xl operative-item__content">
        <slot></slot>
      </p>
      <p v-if="annotation" class="operative-item__annotation text-2xl pl-6">
        {{ annotation }}
      </p>
    </div>
    <nuxt-link v-if="detailPath" class="text-3xl px-2 mx-2" :to="detailPath">
      👁️
    </nuxt-link>
    <button
      v-if="isWritable"
      class="text-3xl px-2 mx-2"
      @click="$emit('write')"
    >
      ✏️
    </button>
    <button v-if="isEditable" class="text-3xl px-2 mx-2" @click="$emit('edit')">
      📝
    </button>
    <button
      v-if="isDisposable"
      class="text-3xl px-2 mx-2"
      @click="$emit('dispose')"
    >
      🗑️
    </button>
  </li>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    isWritable: {
      type: Boolean,
      default: false,
    },
    isEditable: {
      type: Boolean,
      default: false,
    },
    isDisposable: {
      type: Boolean,
      default: false,
    },
    detailPath: {
      type: String,
      default: '',
    },
    annotation: {
      type: String,
      default: '',
    },
  },
})
</script>

<style lang="scss" scoped>
.operative-item {
  display: flex;

  &__wrapper {
    flex: 1 1 100%;
    overflow: hidden;
  }

  &__content {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &__annotation {
    position: relative;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: calc(50% - 3px);
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 6px;
      background-color: #63b3ed;
    }
  }

  & + & {
    border-top: 1px solid #2d3748;
  }
}
</style>
