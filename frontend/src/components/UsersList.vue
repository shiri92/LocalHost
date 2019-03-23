<template>
  <section class="flex justify-center flex-col align-center">
    <div class="profile-list-container" v-if="users">
      <router-link
        class="profile-list-item"
        :key="currProfile._id"
        v-for="(currProfile, idx) in users"
        :to="'/userProfile/' + currProfile._id"
      >
        <user-preview :profile="currProfile" :idx="idx+1"></user-preview>
      </router-link>
    </div>
  </section>
</template>


<script>
import UserPreview from './UserPreview.vue';

export default {
  name: "UserList",
  props: ["users"],
  components: {
    UserPreview
  },

};
</script>


<style>
.profile-list-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: 10px;
  overflow: auto;
}

.profile-list-item {
  list-style: none;
}
</style>