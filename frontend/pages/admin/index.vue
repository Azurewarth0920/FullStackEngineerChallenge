<template>
  <div class="page-admin">
    <operative-list title="Reviews">
      <operative-item
        v-for="item in reviews"
        :key="item"
        is-editable
        is-readable
      ></operative-item>
      <li>
        <app-button to="/admin/review/">Add Review</app-button>
      </li>
    </operative-list>
    <operative-list title="Users">
      <operative-item
        v-for="item in users"
        :key="item"
        is-editable
        is-disposable
      ></operative-item>
      <add-user-input v-if="isAddingUser" @dispose="switchAddUser(false)" />
      <li>
        <app-button @click="switchAddUser(true)">Add User</app-button>
      </li>
    </operative-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      reviews: [1, 2, 3, 4],
      users: [1, 2, 3, 4],
      isAddingUser: false,
    }
  },

  methods: {
    switchAddUser(status: Boolean) {
      this.isAddingUser = status
    },
  },
})
</script>
