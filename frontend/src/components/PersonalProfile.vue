<template>
  <section class="profile-container flex flex-row">
    <div class="side-profile" v-if="getCurrUser">
      <img class="profile-img" :src="getCurrUser.info.imgUrl" alt>
      <div>{{getCurrUser.info.firstName}}, {{getCurrUser.info.lastName}}</div>
      <div>{{getCurrUser.info.language}}</div>
    </div>
    <div class="main-desc" v-if="getCurrUser">
      <nav class="profile-nav flex flex-row justify-center">
        <a class="nav-item" href="#" v-scroll-to="'#about'">About</a>
        <a class="nav-item" href="#" v-scroll-to="'#home'">My Home</a>
        <a class="nav-item" href="#" v-scroll-to="'#pics'">Pictures</a>
        <a class="nav-item" href="#" v-scroll-to="'#ref'">References</a>
      </nav>
      <profile-about id="about"></profile-about>
      <profile-myHome id="home"></profile-myHome>
      <profile-pictures id="pics"></profile-pictures>
      <profile-references id="ref"></profile-references>
    </div>
  </section>
</template>

<script>
import ProfileAbout from "../components/ProfileAbout.vue";
import ProfileMyHome from "../components/ProfileMyHome.vue";
import ProfilePictures from "../components/ProfilePictures.vue";
import ProfileReferences from "../components/ProfileReferences.vue";

export default {
  name: "userDetails",
  created() {
    let userId = this.$route.params.userId;
    this.$store.dispatch({ type: "loadUser", userId });
  },
  computed: {
    getCurrUser() {
      return this.$store.getters.user;
    }
  },
  methods: {
    
  },
  components: {
    ProfileAbout,
    ProfileMyHome,
    ProfilePictures,
    ProfileReferences
  }
};
</script>

<style lang="scss" scoped>
.profile-container {
  background-color: antiquewhite;
}

.side-profile {
  width: 20vw;
  border: 2px solid black;
  height: 80vh;
  margin: 5px;
  background-color: floralwhite;
  padding: 5px;
  .profile-img {
    width: 100%;
    border-radius: 10px;
  }
}

.main-desc {
  border: 2px solid black;
  flex-grow: 1;
  margin: 5px;
  background-color: floralwhite;
  .profile-nav {
    width: 100%;
    border-bottom: 2px solid black;
    .nav-item {
      width: 100px;
      border: 1px 0 1px 0 solid black;
      padding: 10px;
      cursor: pointer;
    }
    .nav-item:hover {
      background-color: lightblue;
    }
  }
}
</style>

