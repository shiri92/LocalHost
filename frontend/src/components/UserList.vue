<template>
  <section class="list-container flex justify-center flex-col align-center">
    <div class="profile-list" v-if="users">
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
import UserPreview from "./UserPreview.vue";

export default {
  name: "user-list",
  components: {
    UserPreview
  },
  props: ["users"]
};
</script>

<style lang="scss" scoped>
.list-container {
  margin: 20px;
  .profile-list {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(auto-fit, minmax(250px, 0.4fr));
    gap: 20px;
    .profile-list-item {
      list-style: none;
      width: 100%;
    }
  }
}
</style>