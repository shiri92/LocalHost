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
          <el-button class="el-button" type="success" @click="signUp">Join</el-button>
          <el-button class="el-button" type="success" plain @click="loginFormOn">Sign In</el-button>
        </div>
        <div v-else>
          <span class="welcome">Welcome {{getLoggedUser.firstName}} {{getLoggedUser.lastName}}!</span>
          <img class="user-img" @click="toggleUserWindow" :src="getLoggedUser.imgUrl">
        </div>
      </div>

      <user-window v-if="showUserWindow" @closeWindow="showUserWindow = false"></user-window>
    </div>
  </section>
</template>

<script>
import userWindow from './UserWindow';

export default {
  name: 'main-nav',
  components: {
    userWindow
  },
  methods: {
    signUp() {
      this.$router.push('/signup');
    },
    loginFormOn() {
      this.$emit('loginOn')
    },
    toggleUserWindow() {
      this.showUserWindow = !this.showUserWindow
    }
  },

  data() {
    return {
      showUserWindow: false,
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
}
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
  }
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #7ebf50;
    }
  }
}

.logo {
  height: 47px;
  width: 150px;
  background-image: url("https://res.cloudinary.com/dcl4oabi3/image/upload/v1553720329/logo/logo.png");
  background-size: cover;
}

.welcome {
  padding-right: 20px;
}

@media (max-width: 568px) {
  .welcome {
    display: none;
  }
}

.user-img {
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

@media (max-width: 568px) {
  .el-button {
    padding: 10px;
  }
}
</style>