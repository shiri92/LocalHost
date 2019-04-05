<template>
  <section class="list-container flex justify-center flex-col align-center">
    <div class="profile-list" v-if="users">
      <router-link
        data-aos="zoom-in"
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
    UserPreview,
  },
  props: ["users"]
};
</script>

<style lang="scss" scoped>
.list-container {
  margin: 20px;
  text-align: center;
  .profile-list {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(auto-fit, minmax(290px, 275px));
    gap: 20px;
    justify-content: center;
    .profile-list-item {
      list-style: none;
      width: 100%;
    }
  }
}
</style>