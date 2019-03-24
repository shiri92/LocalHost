<template>
  <section class="profile-container flex" v-if="getCurrUser">
    <div class="side-profile">
      <img class="profile-img" :src="getCurrUser.imgUrl" alt>
      <div class="profile-name">{{getCurrUser.firstName}} {{getCurrUser.lastName}}</div>
      <div class="profile-loc">{{getCurrUser.city}}, {{getCurrUser.country}}</div>
      <hr>
    </div>
    <div class="main-desc" v-if="getCurrUser">
      <nav class="main-desc-nav" :class="{display: isNavInDisplay}">
        <div class="flex space-evenly align-center">
          <div>{{(getCurrUser.isHosting) ? "Accepting Guests" : "Not Accepting Guests"}}</div>
          <div>
            <button class="btn">
              <font-awesome-icon icon="couch"/>&nbsp;Send Request!
            </button>
            <button class="btn">
              <font-awesome-icon icon="envelope"/>
            </button>
            <button class="btn">
              More
              <font-awesome-icon icon="sort-down"/>
            </button>
          </div>
        </div>
        <hr style="margin: 0">
        <div class="profile-nav flex flex-row justify-center">
          <a class="nav-item" href="#" v-scroll-to="'#about'">About</a>
          <a class="nav-item" href="#" v-scroll-to="'#home'">My Home</a>
          <a class="nav-item" href="#" v-scroll-to="'#pics'">Pictures</a>
          <a class="nav-item" href="#" v-scroll-to="'#ref'">References</a>
        </div>
      </nav>
      <profile-about class="detail-section" :user="getCurrUser" id="about"></profile-about>
      <profile-myHome class="detail-section" :user="getCurrUser" id="home"></profile-myHome>
      <profile-pictures class="detail-section" :user="getCurrUser" id="pics"></profile-pictures>
      <profile-references class="detail-section" :user="getCurrUser" id="ref"></profile-references>
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
  data() {
    return {
      isNavInDisplay: false,
    };
  },
  created() {
    let userId = this.$route.params.userId;
    this.$store.dispatch({ type: "loadUser", userId });

    var vm = this;
    var val = window.addEventListener("scroll", function (e) {
      var scrollPos = window.scrollY;
      if (scrollPos > 110) {
        vm.narrowNav(true);
      } else {
        vm.narrowNav(false);
      }
    });
  },
  computed: {
    getCurrUser() {
      return this.$store.getters.user;
    }
  },
  methods: {
    narrowNav(state) {
      this.isNavInDisplay = state;
    }
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
  margin-top: 70px;
}
@media (max-width: 568px) {
  .profile-container {
    flex-direction: column;
  }
}

.side-profile {
  width: 30vw;
  max-width: 320px;
  min-width: 260px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.15);
  height: 80vh;
  margin: 5px 15px;
  background-color: white;
  padding: 15px;
  text-align: center;
  .profile-img {
    width: 100%;
    max-width: 225px;
    height: 40%;
    max-height: 225px;
    border-radius: 50%;
    box-shadow: 2px 2px 15px -1px rgba(0, 0, 0, 0.75);
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
  hr {
    margin: 20px;
  }
}

.btn {
  margin: 5px;
  background-color: #67c23a;
  border: 1px solid #67c23a;
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-size: 15px;
  font-weight: bold;
  line-height: 1.5;
  max-width: 240px;
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
.btn:hover {
  background: #85ce61;
  border-color: #85ce61;
  color: #fff;
}

@media (max-width: 568px) {
  .side-profile {
    max-width: 98%;
    width: 98%;
  }
}

.main-desc {
  flex-grow: 1;
  margin: 5px;
  .main-desc-nav {
    background-color: #fff;
  }
  .display {
    top: 71px;
    left: 0;
    width: 100%;
    background-color: #fff;
    position: fixed;
    z-index: 10;
    transition: 0.3s;
  }
  .profile-nav {
    width: 100%;
    border-bottom: 2px solid rgba(0, 0, 0, 0.15);
    .nav-item {
      width: 100px;
      border: 1px 0 1px 0 solid black;
      padding: 10px;
      cursor: pointer;
    }
    .nav-item:hover {
      color: #ed6504;
    }
  }
  .detail-section {
    margin: 20px 0;
  }
}
</style>