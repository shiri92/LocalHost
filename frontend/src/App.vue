<template>
  <div id="app" class="flex flex-col">


      <div class="main-container">
        <router-view></router-view>
      </div>
      
      <main-footer></main-footer>
  </div>
</template>

<script>
import MainFooter from '../src/components/MainFooter';


export default {
  components: {
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
