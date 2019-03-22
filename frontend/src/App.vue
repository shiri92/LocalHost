<template>
  <div id="app" class="flex flex-col">

      <main-header></main-header>

      <div class="main-container">
        <router-view></router-view>
      </div>
      
      <main-footer></main-footer>
  </div>
</template>

<script>
import MainHeader from '../src/components/MainHeader';
import MainFooter from '../src/components/MainFooter';


export default {
  components: {
    MainHeader,
    MainFooter
  }
  
}
</script>


<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
}

.main-container {
  flex-grow: 1;
}

</style>
