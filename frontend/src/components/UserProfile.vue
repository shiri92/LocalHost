<template>
  <section class="user-profile flex" v-if="getCurrUser">
    <div class="side-container flex flex-col align-center">
      <img class="profile-img" :src="getCurrUser.imgUrl" alt>
      <div class="info">
        <div class="profile-name">{{ getCurrUser.firstName }} {{ getCurrUser.lastName }}</div>
        <div class="profile-loc">{{ getCurrUser.city }}, {{ getCurrUser.country }}</div>
      </div>
      <!-- <div class="profile-language">{{getCurrUser.language}}</div> -->
    </div>
    <div class="main-desc" v-if="getCurrUser">
      <nav class="main-desc-nav" :class="{ display: isNavInDisplay }">
        <div class="flex space-evenly align-center">
          <div>{{ (getCurrUser.isHosting)? "Accepting Guests":"Not Accepting Guests" }}</div>
          <div>
            <button class="btn">
              <font-awesome-icon icon="couch"/>&nbsp;Send Request
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
      <profile-myHome class="detail-section" id="home"></profile-myHome>
      <profile-pictures class="detail-section" id="pics"></profile-pictures>
      <profile-references class="detail-section" id="ref"></profile-references>
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
      age: null
    };
  },
  created() {
    let userId = this.$route.params.userId;
    this.$store.dispatch({ type: "loadUser", userId });

    var vm = this;
    var val = window.addEventListener("scroll", function (e) {
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
    },
  },
  methods: {
    narrowNav(state) {
      this.isNavInDisplay = state;
    },
    narrowProfile(state) {
      this.isProfileInDisplay = state;
    },
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
.user-profile {
  padding: 15px;
  margin: 15px;
}

.side-container {
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  flex-grow: 1;
  height: 550px;
  padding: 15px;
  margin-right: 15px;
  background-color: #fff;
  .profile-img {
    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.5);
    margin-bottom: 15px;
    border-radius: 50%;
    width: 100%;
    max-width: 270px;
    max-height: 270px;
    object-fit: cover;
    object-position: center center;
  }
  .profile-name {
    font-size: 1.8em;
    font-weight: bold;
  }
  .info {
    text-align: center;
    width: 80%;
    padding-bottom: 15px;
  }
}

.main-desc {
  flex-grow: 4;
  .main-desc-nav {
    padding: 15px;
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
    .nav-item {
      width: 100px;
      // border: 1px 0 1px 0 solid black;
      // padding: 10px;
      cursor: pointer;
    }
    .nav-item:hover {
      background-color: lightblue;
    }
  }

  @media (max-width: 568px) {
    .user-profile {
      flex-direction: column;
    }
    .side-profile {
      max-width: 98%;
      width: 98%;
    }
  }
}

// .side-profile {
//   width: 30vw;
//   max-width: 320px;
//   min-width: 260px;
//   border-bottom: 2px solid rgba(0, 0, 0, 0.15);
//   background-color: white;
//   .profile-img {
//     width: 100%;
//     max-width: 225px;
//     height: 40%;
//     max-height: 225px;
//     border-radius: 50%;
//   }
//   .profile-name {
//     font-size: 1.5em;
//   }
//   .profile-language {
//     font-size: 1.2em;
//     font-weight: bold;
//   }
//   .profile-language::first-letter {
//     text-transform: uppercase;
//   }
// }

.btn {
  // margin: 5px;
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
  // padding: 8px 12px;
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
</style>