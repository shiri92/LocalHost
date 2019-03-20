<template>
  <section class="list-area">
    <h1>Profile List</h1>
    <!-- <router-link to="/profile-app/profile-edit">
      <button>Add Profile</button>
    </router-link> -->
    <div class="profile-list-container" v-if="profiles">
        <router-link class="profile-list-item" :key="currProfile._id" v-for="(currProfile, idx) in profiles" :to="'/profile-app/profile/' + currProfile._id">
            <profile-preview :profile="currProfile" :idx="idx+1"></profile-preview>
        </router-link>
    </div>
  </section>
</template>


<script>
import ProfilePreview from "./ProfilePreview.vue";

export default {
  name: "ProfileList",
  props: ["profiles"],
  components: {
    ProfilePreview
  },
};
</script>


<style>
    .list-area {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;   
    }

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