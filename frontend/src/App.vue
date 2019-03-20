<template>
  <div id="app">
      <nav class="main-nav">
        <router-link to="/">Home</router-link>|
        <router-link to="/about">About</router-link>
      </nav>
      <div class="main-container">
        <router-view></router-view>
      </div>
      <footer class="main-footer">
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
//   a {
//     font-weight: bold;
//     color: #2c3e50;
//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }

.main-nav {
  background-color: grey;
  height: 100px;
  width: 100wh;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
}

.main-container {
  border: 2px solid black;
  flex-grow: 1;
}

.main-footer {
  height: 100px;
  width: 100wh;
  background-color: grey;
  border: 2px solid black;

}
</style>
