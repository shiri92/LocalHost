<template>
  <div id="app" class="flex flex-col">
    <div class="screen" :class="{'open': isBackDark}"></div>

    <main-nav @loginOn="showLogin"></main-nav>
    <log-in v-if="showLoginForm" @loginOff="loginFormOff"></log-in>

    <div :class="{grow: currPage !== '/signup'}" class="main-container flex flex-col">
      <router-view></router-view>
    </div>
    <main-footer></main-footer>
  </div>
</template>

<script>
import MainNav from "@/components/MainNav";
import logIn from '@/components/Login';
import MainFooter from "@/components/MainFooter";
import eventBus from '@/services/eventbus-service';

export default {
  data() {
    return {
      currPage: '',
      isBackDark: false,
      showLoginForm: false,
    }
  },

  components: {
    MainNav,
    logIn,
    MainFooter
  },
  created() {
    this.currPage = this.$route.path;
    // if (!this.getLoggedUser)
    this.$store.dispatch({ type: 'checkLogged' })
    eventBus.$on('popToast', (...args) => this.popToast(...args));
  },
  computed: {
    getLoggedUser() {
      return this.$store.getters.loggedUser;
    }
  },
  methods: {
    loginFormOff() {
      this.showLoginForm = false;
      this.isBackDark = false;
    },
    showLogin() {
      this.showLoginForm = true;
      this.isBackDark = true;
    },
    popToast(type, position, timer, title, link) {
      const Toast = this.$swal.mixin({
        toast: true,
        position: position,
        showConfirmButton: false,
        timer: timer,
        background: `#414244`,
        onClose: () => {
          console.log(link);
          if (link) { this.$router.push(link); }
        }
      });

      Toast.fire({
        type: type,
        title: `<span style="color:#fff;">${title}</span>`,
      });
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
.swal2-header {
  color: #fff;
}

.screen {
  z-index: 2;
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
  // background-color: #e6e6e6;
}
</style>


