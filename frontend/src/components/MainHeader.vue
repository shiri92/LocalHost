<template>

    <section class="main-header flex flex-col align-center">

        <nav-bar></nav-bar>

        <h1>Some Emotional And Nice Text</h1>
        <h2>Something less emotional</h2>

        <el-button class="btn-join" type="success" round>Join</el-button>

        
    </section>

</template>

<script>
import NavBar from '../components/NavBar'


export default {
  name: 'main-header',
  components: {
    NavBar,
  }
  
}
</script>

<style lang="scss" scoped>

.main-header{
  // background-image: url('../../public/img/world.jpg');
  background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('../../public/img/header.jpg');
  // background:url('../../public/img/header.jpg');
  background-repeat: no-repeat;  
  background-size: 100% 100%;
  height: 94vh;
  box-shadow: 2px 2px 10px black;
  justify-content: center;
  position: relative;
}

h1{
  color:white;
  font-size: 2.5rem
}

h2{
  color: white;
  font-size: rem
}

.btn-join{
  font-size: 1.2rem;
  width: 150px;
  margin: 10px;
}


</style>


