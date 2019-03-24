<template>
  <section v-if="showNav" class="main-footer">I AM A FOOTER</section>
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
  background-color: grey;
}
</style>


