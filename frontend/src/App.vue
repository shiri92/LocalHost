<template>
  <div id="app" class="flex flex-col">
    <nav-bar></nav-bar>
    <div class="main-container">
      <router-view></router-view>
    </div>
    <main-footer></main-footer>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import MainFooter from "../src/components/MainFooter";

export default {
  components: {
    NavBar,
    MainFooter
  }
};
</script>


<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  position: relative;
}

.main-container {
  flex-grow: 1;
  margin-top: 70px;
  background-color: #f1efea;
}
</style>
