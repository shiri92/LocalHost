<template>

    <section class="nav-bar flex space-between align-center">
      <div>Some Logo</div>

      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/profiles">Profiles</router-link>

      <el-button type="success">Join</el-button>
      <el-button type="success" plain>Log In</el-button>


    </section>


</template>

<script>

export default {
  name: 'nav-bar',
  
}
</script>

<style lang="scss" scoped>

.nav-bar {
  z-index: 1;
  padding: 10px;
  width: 100%;
  background-color: white;
  padding: 15px;
  box-shadow: 1px 1px 8px black;
  position: fixed;
  top: 0;
  left: 0;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #b6dfcc;
    }
  }
}



</style>


