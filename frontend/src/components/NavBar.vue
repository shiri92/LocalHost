<template>

    <section class="nav-bar">
        <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/profiles">Profiles</router-link>
    </section>

</template>

<script>

export default {
  name: 'nav-bar',
  
}
</script>

<style lang="scss" scoped>

.nav-bar {
  padding: 10px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #b6dfcc;
    }
  }
}



</style>


