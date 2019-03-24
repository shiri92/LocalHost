<template>
  <section v-if="showNav" class="nav-bar flex space-between align-center">
    <div>Some Logo</div>

    <div class="nav-container flex space-between align-center">
      <div class="links-container flex space-around">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
      </div>

      <!-- <b-card bg-variant="dark" text-variant="white" title="Guest"> -->
      <!-- <b-card-text>With supporting text below as a natural lead-in to additional content.</b-card-text> -->
      <!-- <b-button href="#" variant="primary">Go somewhere</b-button> -->
      <!-- </b-card> -->

      <div v-if="!getLoggedUser" class="join-container">
        <!-- <span class="welcome">Welcome Guest!</span> -->
        <el-button type="success" @click="signUp">Join</el-button>
        <el-button type="success" plain @click="loginFormOn">Log in</el-button>
      </div>
      <div v-else>
        <span class="welcome">Welcome {{getLoggedUser.firstName}} {{getLoggedUser.lastName}}!</span>
        <el-button type="success" @click="logOut">Log out</el-button>
      </div>
      <log-in v-if="showLoginForm" @loginOff="loginFormOff"></log-in>
    </div>
  </section>
</template>

<script>
import logIn from './Login';
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
    logOut() {
      this.$store.commit({ type: 'logout' });
    }
  },
  components: {
    logIn
  },
  data() {
    return {
      showLoginForm: false,
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
      this.loginOff();
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
</style>


