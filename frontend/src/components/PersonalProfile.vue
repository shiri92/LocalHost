<template>
  <section class="profile-container flex flex-row">
    <div>
      <div class="side-profile" v-if="getCurrUser">
        <img class="profile-img" :src="getCurrUser.info.imgUrl" alt>
        <div class="profile-name">{{getCurrUser.info.firstName}}, {{getCurrUser.info.lastName}}</div>
        <div class="profile-language">{{getCurrUser.info.language}}</div>
        <hr>
        <!-- <button class="btn">
          <font-awesome-icon icon="couch"/>Send Request
        </button>
        <button class="btn">
          <font-awesome-icon icon="envelope"/>
        </button>
        <button class="btn">More
          <font-awesome-icon icon="sort-down"/>
        </button> -->
      </div>
      <div class="side-slider" :class="{sideDisplay: isProfileInDisplay}">
        <button class="btn">
          <font-awesome-icon icon="couch"/>&nbsp;Send Request
        </button>
        <button class="btn">
          <font-awesome-icon icon="envelope"/>
        </button>
        <button class="btn">More
          <font-awesome-icon icon="sort-down"/>
        </button>
      </div>
    </div>
    <div class="main-desc" v-if="getCurrUser">
      <nav class="profile-nav flex flex-row justify-center" :class="{display: isNavInDisplay}">
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
  data() {
    return {
      isNavInDisplay: false,
      isProfileInDisplay: false,
    };
  },
  created() {
    let userId = this.$route.params.userId;
    this.$store.dispatch({ type: "loadUser", userId });

    var vm = this;
    var val = window.addEventListener("scroll", function(e) {
      var scrollPos = window.scrollY;
      if (scrollPos > 700) {
        vm.narrowNav(true);
      } else {
        vm.narrowNav(false);
      }

      if (scrollPos > 1200) {
        vm.narrowProfile(true);
      } else {
        vm.narrowProfile(false);
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
    },
    narrowProfile(state) {
        this.isProfileInDisplay = state;
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
@media (max-width: 568px) {
  .profile-container {
    flex-direction: column;
  }
}

.sideDisplay {
  left: 0;
  top: 120px;
  position: fixed;
}


.side-profile {
  width: 30vw;
  max-width: 350px;
  border: 2px solid black;
  height: 80vh;
  margin: 5px;
  background-color: floralwhite;
  padding: 15px;
  .profile-img {
    width: 100%;
    max-width: 280px;
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
  hr {
    margin: 20px;
  }
}

.side-slider {
    width: 30vw;
}
@media (max-width: 568px) {
    .side-slider {
        width: 100%;
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
    max-width: 97%;
    width: 97%;
  }
}

.main-desc {
  border: 2px solid black;
  flex-grow: 1;
  max-width: 68vw;
  margin: 5px;
  background-color: floralwhite;
  .display {
    top: 71px;
    left: 0;
    width: 100%;
    background-color: white;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    z-index: 10;
    transition: 0.3s;
  }
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
@media (max-width: 568px) {
  .main-desc {
    max-width: unset;
  }
}
</style>

