<template>
  <div class="home">

    <h1>Top Destinations</h1>

    <city-search></city-search>

    <div class="cities-gallery grid">

      <div class="img-container London">
        <!-- <img src="https://res-console.cloudinary.com/dcl4oabi3/thumbnails/v1/image/upload/v1553173600/b25zL2NpdGllcy9sb25kb24=/grid"> -->
        <div
          class="city-name"
          @click="moveToUsers"
        >London</div>
      </div>

      <div class="img-container Bangkok">
        <!-- <img src="https://res-console.cloudinary.com/dcl4oabi3/thumbnails/v1/image/upload/v1553173600/b25zL2NpdGllcy9iYW5na29r/grid"> -->
        <div
          class="city-name"
          @click="moveToUsers"
        >Bangkok</div>
      </div>

      <div class="img-container Paris">
        <!-- <img src="../../public/img/cities/paris.jpg"> -->
        <div
          class="city-name"
          @click="moveToUsers"
        >Paris</div>
      </div>

      <div class="img-container Berlin">
        <!-- <img src="../../public/img/cities/berlin.jpg"> -->
        <div
          class="city-name"
          @click="moveToUsers"
        >Berlin</div>
      </div>

      <div class="img-container Barcelona">
        <!-- <img src="../../public/img/cities/barcelona.jpg"> -->
        <div
          class="city-name"
          @click="moveToUsers"
        >Barcelona</div>
      </div>

      <div class="img-container Tokyo">
        <!-- <img src="../../public/img/cities/tokyo.jpg"> -->
        <div
          class="city-name"
          @click="moveToUsers"
        >Tokyo</div>
      </div>

      <div class="img-container Buenos-Aires">
        <!-- <img src="../../public/img/cities/buenos-aires.jpg"> -->
        <div
          class="city-name"
          @click="moveToUsers"
        >Buenos-Aires</div>
      </div>

      <div class="img-container Rome">
        <!-- <img src="../../public/img/cities/rome.jpg"> -->
        <div
          class="city-name"
          @click="moveToUsers"
        >Rome</div>
      </div>

      <div class="img-container New-York">
        <!-- <img src="../../public/img/cities/new-york.jpg"> -->
        <div
          class="city-name"
          @click="moveToUsers"
        >New-York</div>
      </div>

      <div class="img-container Rio">
        <!-- <img src="../../public/img/cities/rio.jpg"> -->
        <div
          class="city-name"
          @click="moveToUsers"
        >Rio</div>
      </div>

      <div class="img-container coming-soon">
        <div
          class="city-name"
          @click="moveToUsers"
        >Coming Soon...</div>
      </div>

    </div>
  </div>
</template>

<script>
import CitySearch from '../components/CitySearch'

export default {
  name: 'home',
  data() {
    return {

    }
  },
  created() {
    this.$store.dispatch({ type: 'loadTopDests' })
  },
  methods: {
    moveToUsers(ev) {
      let name = ev.target.innerText;
      this.$router.push('/profiles/' + name)
    }
  },
  computed: {
    topDests() {
      return this.$store.getters.topDests;
    }

  },
  components: {
    CitySearch
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding-top: 50px;
  padding-bottom: 50px;
  background-color: #e6e6e6;
}

.cities-gallery {
  max-width: 80%;
  margin: 0 auto;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 15px;
  height: 90vh;
  margin-top: 40px;
}

.img-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  box-shadow: 1px 1px 10px black;
}

.Bangkok {
  grid-column: span 1;
  grid-row: span 1;
  // background-color: rgb(241, 95, 95);
  background-image: url("https://res-console.cloudinary.com/dcl4oabi3/thumbnails/v1/image/upload/v1553173600/b25zL2NpdGllcy9iYW5na29r/grid");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.London {
  grid-column: span 1;
  grid-row: span 2;
  // background-color: rgb(160, 119, 119);
  background: url("https://res-console.cloudinary.com/dcl4oabi3/thumbnails/v1/image/upload/v1553173600/b25zL2NpdGllcy9sb25kb24=/grid");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.Paris {
  grid-column: span 2;
  grid-row: span 1;
  // background-color: rgb(133, 133, 238);
  background: url("https://res-console.cloudinary.com/dcl4oabi3/thumbnails/v1/image/upload/v1553173592/b25zL2NpdGllcy9wYXJpcw==/grid");
  background-repeat: no-repeat;
  background-size: cover;
}

.Buenos-Aires {
  grid-column: span 1;
  grid-row: span 1;
  // background-color: palevioletred;
  background: url("https://res-console.cloudinary.com/dcl4oabi3/thumbnails/v1/image/upload/v1553173589/b25zL2NpdGllcy9idWVub3MtYWlyZXM=/grid");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.Rome {
  grid-column: span 1;
  grid-row: span 1;
  // background-color: burlywood;
  background: url("https://res-console.cloudinary.com/dcl4oabi3/thumbnails/v1/image/upload/v1553173596/b25zL2NpdGllcy9yb21l/grid");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.Tokyo {
  grid-column: span 1;
  grid-row: span 1;
  // background-color: rgb(149, 228, 149);
  background: url("https://res-console.cloudinary.com/dcl4oabi3/thumbnails/v1/image/upload/v1553173596/b25zL2NpdGllcy90b2t5bw==/grid");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.Berlin {
  grid-column: span 1;
  grid-row: span 2;
  // background-color: rgb(172, 123, 221);
  background: url("https://res-console.cloudinary.com/dcl4oabi3/thumbnails/v1/image/upload/v1553173596/b25zL2NpdGllcy9iZXJsaW4=/grid");
  background-repeat: no-repeat;
  background-size: cover;
}

.Barcelona {
  grid-column: span 1;
  grid-row: span 2;
  // background-color: rgb(228, 228, 149);
  background: url("https://res-console.cloudinary.com/dcl4oabi3/thumbnails/v1/image/upload/v1553173587/b25zL2NpdGllcy9iYXJjZWxvbmE=/grid");
  background-repeat: no-repeat;
  background-size: cover;
}

.New-York {
  grid-column: span 2;
  grid-row: span 1;
  // background-color: rgb(224, 164, 85);
  background: url("https://res-console.cloudinary.com/dcl4oabi3/thumbnails/v1/image/upload/v1553173606/b25zL2NpdGllcy9uZXcteW9yaw==/grid");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.Rio {
  grid-column: span 1;
  grid-row: span 1;
  // background-color: rgb(204, 125, 211);
  background: url("https://res-console.cloudinary.com/dcl4oabi3/thumbnails/v1/image/upload/v1553173600/b25zL2NpdGllcy9yaW8=/grid");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.coming-soon {
  grid-column: span 1;
  grid-row: span 1;
  background-color: rgb(231, 141, 125);
}

.city-name {
  font-size: 2rem;
  color: white;
  font-weight: bold;
  text-shadow: #726e6e 3px 5px 2px;
  // width: 100%;
  // height: 100%;
  // display: flex;
  // justify-content: center;
  // align-items: center;
}
</style>


