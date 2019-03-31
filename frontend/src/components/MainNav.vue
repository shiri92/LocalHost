<template>
  <section v-if="showNav" class="main-nav flex space-between align-center">
    <div class="nav-container flex space-between align-center">
      <div class="links-container flex space-around">
        <router-link to="/">
          <div class="logo"></div>
        </router-link>
      </div>

      <div class="buttons-container">
        <div v-if="!getLoggedUser" class="join-container">
          <span class="welcome">Welcome guest!</span>
          <button class="btn" @click="signUp">Join</button>
          <button class="btn btn-empty" @click="loginFormOn">Sign In</button>
        </div>
        <div v-else>
          <span class="welcome">
            <!--{{getLoggedUser.firstName}} {{getLoggedUser.lastName}}-->
          </span>
          <img class="user-img" @click="toggleUserWindow" :src="getLoggedUser.imgUrl">
        </div>
      </div>

      <user-window v-if="showUserWindow" @closeWindow="showUserWindow = false"></user-window>
    </div>
  </section>
</template>

<script>
import userWindow from "./UserWindow";

export default {
  name: "main-nav",
  components: {
    userWindow
  },
  methods: {
    signUp() {
      this.$router.push("/signup");
    },
    loginFormOn() {
      this.$emit("loginOn");
    },
    toggleUserWindow() {
      this.showUserWindow = !this.showUserWindow;
    }
  },

  data() {
    return {
      showUserWindow: false
    };
  },
  computed: {
    getLoggedUser() {
      return this.$store.getters.loggedUser;
    },
    showNav() {
      let isRouteWithNav = true;
      if (this.$route.path !== "/signup") {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.main-nav {
  z-index: 1;
  padding: 10px;
  width: 100%;
  background-color: white;
  padding: 15px;
  box-shadow: 1px 1px 8px black;
  position: fixed;
  top: 0;
  left: 0;
  .nav-container {
    width: 100%;
    max-width: 1500px;
    margin: 0 auto;
    .links-container {
      .logo {
        height: 37px;
        width: 160px;
        background-image: url("https://res.cloudinary.com/dcl4oabi3/image/upload/v1553958499/logo/logo.png");
        background-size: cover;
      }
    }
    .buttons-container {
      .welcome {
        padding-right: 20px;
      }
      .btn {
        margin: 5px;
      }
      @media (max-width: 568px) {
        .welcome {
          display: none;
        }
        .btn {
          padding: 10px;
        }
      }

      @media (max-width: 340px) {
        .btn {
          padding: 7px;
        }
      }
      .user-img {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
  }
  // a {
  //   font-weight: bold;
  //   color: #2c3e50;
  //   &.router-link-exact-active {
  //     color: #7ebf50;
  //   }
  // }
}
</style>