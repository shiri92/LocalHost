<template>
  <div id="app" class="flex flex-col">
    <div class="screen" :class="{'open': isBackDark}"></div>

    <main-nav @darkBack="makeDark" @clearBack="makeClear"></main-nav>

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
      currPage: '',
      isBackDark: false
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
  methods: {
    makeDark() {
      this.isBackDark = true;
    },
    makeClear() {
      this.isBackDark = false;
    }
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

.screen {
  // z-index: 2;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #000;
  background: rgba(0, 0, 0, 0.8);
  visibility: hidden;
  opacity: 0;
  cursor: pointer;
  transition: opacity 0.3s;
}

.open {
  visibility: visible;
  opacity: 1;
}

.grow {
  flex-grow: 1;
}

.main-container {
  margin-top: 70px;
  background-color: #e6e6e6;
}
</style>
