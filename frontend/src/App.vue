<template>
  <div id="app" class="flex flex-col">
    <main-nav></main-nav>

    <div :class="{grow: currPage !== '/signup'}" class="main-container flex flex-col">
      <router-view></router-view>
    </div>
    <main-footer></main-footer>
  </div>
</template>

<script>
import MainNav from "@/components/MainNav";
import MainFooter from "@/components/MainFooter";

export default {
  data() {
    return {
      currPage: ''
    }
  },
  components: {
    MainNav,
    MainFooter
  },
  created() {
    this.currPage = this.$route.path;
    this.$store.dispatch({ type: 'checkLogged' });
  },
  watch: {
    $route(to, from) {
      this.currPage = this.$route.path;
    }
  }

};
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
  background-color: #f1efea;
}
</style>
