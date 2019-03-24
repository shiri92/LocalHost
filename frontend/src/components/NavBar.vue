<template>
  <section v-if="showNav" class="nav-bar flex space-between align-center">
    <div>Some Logo</div>

    <div class="nav-container flex space-between align-center">
      <div class="links-container flex space-around">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
      </div>

      <div v-if="!getLoggedUser" class="join-container">
        <span class="welcome">Welcome Guest!</span>
        <el-button type="success" @click="signUp">Join</el-button>
        <el-button type="success" plain @click="loginFormOn">Log in</el-button>
      </div>
      <div v-else>
        <span class="welcome">Welcome {{getLoggedUser.firstName}} {{getLoggedUser.lastName}}!</span>
        <img class="user-img" @click="toggleUserWindow" :src="getLoggedUser.imgUrl">
      </div>

      <user-window v-if="showUserWindow" @closeWindow="showUserWindow = false"></user-window>

      <log-in v-if="showLoginForm" @loginOff="loginFormOff"></log-in>
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
    },
    loginFormOff() {
      this.showLoginForm = false;
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
      showUserWindow: false
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

.nav-container {
  width: 60%;
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
</style>


