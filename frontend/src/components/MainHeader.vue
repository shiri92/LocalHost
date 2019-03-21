<template>

    <section class="main-header flex flex-col space-between">

        <nav-bar></nav-bar>

        <city-search></city-search>

        
    </section>

</template>

<script>
import NavBar from '../components/NavBar'
import CitySearch from '../components/CitySearch'


export default {
  name: 'main-header',
  components: {
    NavBar,
    CitySearch
  }
  
}
</script>

<style lang="scss" scoped>

.main-header{
  // background-image: url('../../public/img/world.jpg');
  background: linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url('../../public/img/world.jpg');
  background-size: cover;
  height: 70vh;
  padding: 40px;
  box-shadow: 2px 2px 10px black;
  position: relative;

}



</style>


