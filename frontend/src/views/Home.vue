<template>
  <div class="home">

    <div class="cities-gallery grid">

        <div class="img-container bangkok">
          <!-- <img src="../../public/img/cities/bangkok.jpg"> -->
          <div class="city-name">Bangkok</div>
        </div>

        <div class="img-container london">
          <!-- <img src="../../public/img/cities/london.jpg"> -->
          <div class="city-name">London</div>
        </div>

        <div class="img-container paris">
          <!-- <img src="../../public/img/cities/paris.jpg"> -->
          <div class="city-name">Paris</div>
        </div>

        <div class="img-container buenos-aires">
          <!-- <img src="../../public/img/cities/buenos-aires.jpg"> -->
          <div class="city-name">Buenos Aires</div>
        </div>

        <div class="img-container rome">
          <!-- <img src="../../public/img/cities/rome.jpg"> -->
          <div class="city-name">Rome</div>
        </div>

        <div class="img-container tokyo">
          <!-- <img src="../../public/img/cities/tokyo.jpg"> -->
          <div class="city-name">Tokyo</div>
        </div>

        <div class="img-container berlin">
          <!-- <img src="../../public/img/cities/berlin.jpg"> -->
          <div class="city-name">Berlin</div>
        </div>

        <div class="img-container barcelona">
          <!-- <img src="../../public/img/cities/barcelona.jpg"> -->
          <div class="city-name">Barcelona</div>
        </div>

        <div class="img-container new-york">
          <!-- <img src="../../public/img/cities/new-york.jpg"> -->
          <div class="city-name">New York</div>
        </div>

        <div class="img-container rio">
          <!-- <img src="../../public/img/cities/rio.jpg"> -->
          <div class="city-name">Rio</div>
        </div>
        
        <div class="img-container coming-soon">
          <div class="city-name">Coming Soon...</div>
        </div>
      
    </div>
    
  </div>
</template>

<script>



export default {
  name: 'home',
  data() {
    return {

    }
  },
  components: {
    
  }
}
</script>

<style lang="scss" scoped>

.home{
  max-width: 80%;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 50px;
}

.cities-gallery{
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  height: 90vh;
}

.img-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.bangkok{
  grid-column: span 1;
  grid-row: span 2;
  background-color: rgb(160, 119, 119);
}

.london{
  grid-column: span 1;
  grid-row: span 1;
  background-color: rgb(241, 95, 95);

}

.paris{
  grid-column: span 2;
  grid-row: span 1;
  background-color: rgb(133, 133, 238);
}

.buenos-aires{
  grid-column: span 1;
  grid-row: span 2;
  background-color: rgb(172, 123, 221);
}

.rome{
  grid-column: span 1;
  grid-row: span 2;
  background-color: rgb(228, 228, 149);
}

.tokyo{
  grid-column: span 1;
  grid-row: span 1;
  background-color: rgb(149, 228, 149);
}

.berlin{
  grid-column: span 1;
  grid-row: span 1;
  background-color: palevioletred;

}

.barcelona{
  grid-column: span 1;
  grid-row: span 1;
  background-color: burlywood;
}

.new-york{
  grid-column: span 2;
  grid-row: span 1;
  background-color: rgb(224, 164, 85);

}

.rio{
  grid-column: span 1;
  grid-row: span 1;
  background-color: rgb(204, 125, 211);
}

.coming-soon{
  grid-column: span 1;
  grid-row: span 1;
  background-color: rgb(231, 141, 125);
}

.city-name{
  font-size: 2rem;
  color: black;
  font-weight: bold;
}


</style>


