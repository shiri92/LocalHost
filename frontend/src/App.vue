<template>
  <div id="app" class="flex flex-col">
      <nav class="main-nav flex justify-center align-center">
        <router-link to="/">Home</router-link>|
        <router-link to="/about">About</router-link> |
        <router-link to="/profiles">Profiles</router-link>
      </nav>
      <div class="main-container">
        <router-view></router-view>
      </div>
      <footer class="main-footer flex justify-center align-center">
        I'm a footer
      </footer>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
}

.main-nav {
  background-color: grey;
  padding: 10px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #b6dfcc;
    }
  }
}

.main-container {
  flex-grow: 1;
}

.main-footer {
  padding: 10px;
  background-color: grey;
}
</style>
