<template>
  <section v-if="showNav" class="nav-bar flex space-between align-center">
    <div>Some Logo</div>

    <div class="nav-container flex space-between align-center">
      <div :class="{'open': isHamburgerOpen}" class="links-container flex space-around">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>|
      </div>

      <div class="buttons-container">
        <div v-if="!getLoggedUser" class="join-container">
          <span class="welcome">Welcome Guest!</span>
          <el-button type="success" @click="signUp">Join</el-button>
          <el-button type="success" plain @click="loginFormOn">Log in</el-button>
        </div>
        <div v-else>
          <span class="welcome">Welcome {{getLoggedUser.firstName}} {{getLoggedUser.lastName}}!</span>
          <img class="user-img" @click="toggleUserWindow" :src="getLoggedUser.imgUrl">
        </div>
      </div>

      <user-window v-if="showUserWindow" @closeWindow="showUserWindow = false"></user-window>

      <log-in v-if="showLoginForm" @loginOff="loginFormOff"></log-in>

      <img
        class="hamburger"
        @click="isHamburgerOpen = !isHamburgerOpen"
        src="../../public/img/hamburger.png"
        alt
      >
    </div>
  </section>
</template>

<script>
import logIn from './Login';
import userWindow from './UserWindow';

export default {
  name: 'nav-bar',
  methods: {
    signUp() {
      this.$router.push('/signup');
    },
    loginFormOn() {
      this.showLoginForm = true;
      this.$emit('darkBack')
    },
    loginFormOff() {
      this.showLoginForm = false;
      this.$emit('clearBack')
    },
    toggleUserWindow() {
      this.showUserWindow = !this.showUserWindow
    }
  },
  components: {
    logIn,
    userWindow
  },
  data() {
    return {
      showLoginForm: false,
      showUserWindow: false,
      isHamburgerOpen: false
    }
  },
  computed: {
    getLoggedUser() {
      return this.$store.getters.loggedUser;
    },
    showNav() {
      let isRouteWithNav = true;
      if (this.$route.path !== '/signup') {
        return true;
      } else {
        return false;
      }
    },
  },
  watch: {
    $route(to, from) {
      this.loginFormOff();
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-bar {
  z-index: 1;
  padding: 10px;
  width: 100%;
  background-color: white;
  padding: 15px 60px 15px 60px;
  box-shadow: 1px 1px 8px black;
  position: fixed;
  top: 0;
  left: 0;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #7ebf50;
    }
  }
}

.hamburger {
  display: none;
}

.nav-container {
  min-width: 40%;
}
.welcome {
  padding-right: 20px;
}

.links-container {
  width: 40%;
}

.user-img {
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

@media (max-width: 1200px) {
  .nav-container {
    min-width: 50%;
  }
}

@media (max-width: 1120px) {
  .nav-container {
    min-width: 60%;
  }
}

@media (max-width: 950px) {
  .nav-container {
    min-width: 80%;
  }
}

@media (max-width: 750px) {
  .hamburger {
    display: block;
    width: 40px;
    height: 40px;
  }
  .links-container {
    background-color: rgb(236, 209, 165);
    box-shadow: 1px 1px 7px rgb(122, 120, 120);
    position: fixed;
    padding: 15px;
    font-weight: bold;
    min-width: 160px;
    left: 0;
    top: 9.2%;
    z-index: 1;
    transform: translate(-300px, 0);
    transition: transform 0.3s ease;
  }
  .links-container.open {
    transform: translate(0, 0);
  }
}

// @media (max-width: 600px) {
//   .buttons-container{

//   }
// }
</style>


