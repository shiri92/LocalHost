<template>
  <section v-if="showNav" class="main-footer">
    <router-link to="/about">About</router-link>
    <div>I AM A FOOTER</div> 
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
  padding: 10px;
  background-color: #fff;
  border-top: 2px solid rgba(0, 0, 0, 0.15);
  text-align: center;
}
</style>


