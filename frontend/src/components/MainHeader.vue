<template>

    <section class="main-header flex flex-col align-center">


        <h1>Find a Place To Stay On Your Travel</h1>
        <h2>Improve Your Travel Experience!</h2>

        <el-button class="btn-join" type="success" round>Join</el-button>

        
    </section>

</template>

<script>


export default {
  name: 'main-header',
  components: {
  }
  
}
</script>

<style lang="scss" scoped>

.main-header{
  background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('https://res.cloudinary.com/dcl4oabi3/image/upload/v1553254624/ons/header.jpg');
  // background:url('../../public/img/header.jpg');
  background-repeat: no-repeat;  
  background-size: 100% 100%;
  height: 95vh;
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


