<template>
  <section
    class="main-header flex flex-col align-center justify-center"
    :style="'background-image:linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(' + backImg + ')'"
    :class="{'users-head': $route.path !== '/'}"
  >
    <div class="header-title" v-if="$route.path === '/'">
      <h1>Find a Place To Stay On Your Travels</h1>
      <h2>Improve Your Travel Experience!</h2>
      <el-button class="btn-join" type="success" @click="$router.push('/signup')" round>Join</el-button>
    </div>
    <img
      v-if="$route.path === '/'"
      class="arrow-down"
      href="#"
      v-scroll-to="'#whyjoin'"
      src="../../public/img/arrow-down.png"
    >

    <div class="users-title" v-if="$route.path !== '/'">
      <h2>{{currPageCountry}}</h2>
      <h1>{{currPageCity}}</h1>
    </div>
  </section>
</template>

<script>

export default {
  name: 'main-header',
  data() {
    return {
      currPageCity: '',
      currPageCountry: ''
    }
  },
  created() {
    let cutString = this.$route.path.substring(1, this.$route.path.length);

    let idxSlash = cutString.indexOf('/');
    let idxAnd = cutString.indexOf('&');

    this.currPageCountry = cutString.substr(idxSlash + 1, idxAnd - idxSlash - 1);
    this.currPageCity = cutString.substr(idxAnd + 1, cutString.length);
  },
  computed: {
    backImg() {
      if (this.$route.path === '/') {
        return 'https://res.cloudinary.com/dcl4oabi3/image/upload/v1553254624/bg-imgs/main-header.jpg';
      } else {
        let cityName = this.$route.params.city.toLowerCase();
        if (cityName.indexOf(' ') !== -1) {
          cityName = cityName.replace(/\s/g, "%20");
        }
        return ('https://res.cloudinary.com/dcl4oabi3/image/upload/v1553254624/city-imgs/' + cityName + '.jpg');
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.main-header {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  height: 100vh;
}

.users-head {
  height: 80vh;
}

h1 {
  color: white;
  font-size: 2.5rem;
}

h2 {
  color: white;
  font-size: 1rem;
}

.btn-join {
  font-size: 1.2rem;
  width: 150px;
  margin: 10px;
}

.arrow-down {
  position: absolute;
  top: 23%;
  width: 90px;
  height: 90px;
  cursor: pointer;
}

@media (max-width: 1200px) {
  .main-header {
    background-position: center, center;
  }
}

@media (max-width: 1050px) {
  .main-header {
    height: 70vh;
    background-position: center, center;
  }
  .arrow-down {
    top: 30%;
  }
}

@media (max-width: 900px) {
  .arrow-down {
    display: none;
  }
}

@media (max-width: 400px) {
  .main-header {
    background-position: top center;
  }
}
</style>


