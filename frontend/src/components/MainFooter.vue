<template>
  <section v-if="showNav" class="main-footer">
    <router-link to="/about">About</router-link>
    <div>CONNECT WITH US</div>
    <!-- <i class="fab fa-facebook"></i> -->
    <div>© 1999 - 2019 LocalHost International, Inc.</div>
  </section>
</template>

<script>

export default {
  name: 'main-footer',
  computed: {
    showNav() {
      let isRouteWithNav = true;
      if (this.$route.path !== '/signup') {
        return true;
      } else {
        return false;
      }
    }
  },

}
</script>

<style lang="scss" scoped>
.main-footer {
  color: white;
  padding: 10px;
  background-color: #363c41;
  text-align: center;
  div {
    .fab {
      color: white;
      width: 20px;
      height: 50px;
    }
  }
}
</style>


