<template>
  <section class="flex justify-center flex-col align-center">
    <div class="profile-list-container" v-if="users">
      <router-link
        class="profile-list-item"
        :key="currProfile._id"
        v-for="(currProfile, idx) in users"
        :to="'/profile/' + currProfile._id"
      >
        <profile-preview :profile="currProfile" :idx="idx+1"></profile-preview>
      </router-link>
    </div>
  </section>
</template>


<script>
import ProfilePreview from "./ProfilePreview.vue";

export default {
  name: "UserList",
  props: ["users"],
  components: {
    ProfilePreview
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