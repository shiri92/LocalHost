<template>
  <section v-if="showNav" class="main-footer">
    <router-link class="about" to="/about">ABOUT US</router-link>
    <div>CONNECT WITH US</div>
    <div class="social-icons">
      <a href="https://www.facebook.com/couchsurfing">
        <img class="icon-image" src="../../public/img/icons/facebook-icon.png" alt>
      </a>
      <a href="https://twitter.com/couchsurfing">
        <img class="icon-image" src="../../public/img/icons/twitter-icon.png" alt>
      </a>
      <a href="https://www.instagram.com/couchsurfing/">
        <img class="icon-image" src="../../public/img/icons/insta-icon.png" alt>
      </a>
    </div>
    <div>© 1999 - 2019 LocalHost International, Inc.</div>
  </section>
</template>

<script>
export default {
  name: "main-footer",
  computed: {
    showNav() {
      let isRouteWithNav = true;
      if (this.$route.path !== "/signup") {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.main-footer {
  color: white;
  padding: 10px;
  background-color: #7d7f81;
  text-align: center;
  .about:hover {
    color: darkgoldenrod;
  }
  .icon-image {
    width: 40px;
    height: 40px;
    background-color: transparent;
    margin: 0 10px;
    &:hover {
      transform: scale(1.15);
      cursor: pointer;
    }
  }
}
</style>


