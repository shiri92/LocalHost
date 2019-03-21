<template>
  <section class="profile-container flex flex-row">
    <div class="side-profile" v-if="getCurrUser">
      <img class="profile-img" :src="getCurrUser.info.imgUrl" alt>
      <div class="profile-name">{{getCurrUser.info.firstName}}, {{getCurrUser.info.lastName}}</div>
      <div class="profile-language">{{getCurrUser.info.language}}</div>
      <hr>
      <button class="request-btn">Send Request</button>
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
  methods: {},
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
  width: 30vw;
  border: 2px solid black;
  height: 80vh;
  margin: 5px;
  background-color: floralwhite;
  padding: 15px;
  .profile-img {
    width: 100%;
    height: 40%;
    border-radius: 50%;
  }
  .profile-name {
    font-size: 1.5em;
  }
  .profile-language {
    font-size: 1.2em;
    font-weight: bold;
    margin: 5px;
  }
  .profile-language::first-letter {
    text-transform: uppercase;
  }
  .request-btn {
    margin: 5px;
    background-color: #287fb8;
    border: 1px solid #287fb8;
    border-radius: 3px;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-size: 15px;
    font-weight: bold;
    line-height: 1.5;
    max-width: 240px;
    min-width: 6em;
    padding: 8px 12px;
    text-align: center;
    text-decoration: none;
    -webkit-transition: background-color 0.3s ease, border-color 0.3s ease;
    transition: background-color 0.3s ease, border-color 0.3s ease;
    white-space: normal;
    -moz-appearance: none;
    -webkit-appearance: none;
    -webkit-font-smoothing: antialiased;
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

