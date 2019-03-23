<template>
  <div id="app" class="flex flex-col">
    <nav-bar></nav-bar>
    <div :class="{grow: currPage !== '/signup'}" class="main-container flex flex-col">
      <router-view></router-view>
    </div>
    <main-footer></main-footer>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import MainFooter from '../src/components/MainFooter';

export default {
  data() {
    return {
      currPage: ''

    }
  },
  created() {
    this.currPage = this.$route.path;
  },
  watch: {
    $route(to, from) {
      this.currPage = this.$route.path;
    }
  },
  components: {
    NavBar,
    MainFooter
  }
}
</script>


<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #2c3e50;
  min-height: 100vh;
  position: relative;
}

.grow {
  flex-grow: 1;
}

.main-container {
  margin-top: 70px;
  background-color: #e6e6e6;
}
</style>
