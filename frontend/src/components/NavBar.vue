<template>
  <section class="nav-bar flex space-between align-center">
    <div>Some Logo</div>

    <div class="nav-container flex space-between align-center">
      <div class="links-container flex space-around">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
      </div>

      <div class="join-container">
        <el-button type="success" @click="signUp">Join</el-button>
        <el-button type="success" plain>Login</el-button>
        <!-- <log-in></log-in> -->
      </div>
    </div>
  </section>
</template>

<script>
import logIn from './Login';
export default {
  name: 'nav-bar',
  methods: {
    signUp() {
      this.$router.push('/signup')
    }
  },
  components: {
    logIn
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
  width: 40%;
}

.links-container {
  width: 50%;
}
</style>


