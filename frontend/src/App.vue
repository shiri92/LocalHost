<template>
  <div id="app">
      <nav class="main-nav">
        <router-link to="/">Home</router-link>|
        <router-link to="/about">About</router-link>
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
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 0;
}
// #nav {
//   padding: 30px;
//   
//   }
// }

.main-nav {
  background-color: grey;
  padding: 10px;
  width: 100wh;
  display: flex;
  align-items: center;
  justify-content: center;
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
  width: 100wh;
  background-color: grey;
  display: flex;
}
</style>
