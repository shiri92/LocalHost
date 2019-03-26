<template>
  <div class="home">
    <main-header></main-header>

    <why-join></why-join>

    <h1>Top Destinations</h1>

    <city-search></city-search>

    <div class="cities-gallery grid">
      <div
        v-for="dest in topDests"
        :key="dest._id"
        :class="'img-container' + ' ' + dest.name"
        :style="'background-image: url(' + dest.imgUrl + ')'"
      >
        <div class="city-name" @click="moveToUsers(dest)">{{dest.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader';
import CitySearch from '../components/CitySearch'
import WhyJoin from '../components/WhyJoin'


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
    moveToUsers(dest) {
      let destCountry = dest.country;
      let destCity = dest.name;
      this.$router.push('/users/' + destCountry + '&' + destCity)
    }
  },
  computed: {
    topDests() {
      return this.$store.getters.topDests;
    }
  },
  components: {
    MainHeader,
    CitySearch,
    WhyJoin
  }
}
</script>

<style lang="scss" scoped>
.home {
  margin-top: -70px;
  padding-bottom: 50px;
  text-align: center;
  h1 {
    margin-bottom: 40px;
  }
  .cities-gallery {
    max-width: 1200px;
    margin: 0 auto;
    grid-template-rows: repeat(4, 180px);
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    // height: 90vh;
    margin-top: 40px;
    .img-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      cursor: pointer;
      // box-shadow: 1px 1px 10px black;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
      .city-name {
        font-size: 2rem;
        color: white;
        font-weight: bold;
        text-shadow: 0px 3px 15px rgba(0, 0, 0, 1);
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .Bangkok {
      grid-column: span 1;
      grid-row: span 1;
    }
    .London {
      grid-column: span 1;
      grid-row: span 2;
    }

    .Paris {
      grid-column: span 2;
      grid-row: span 1;
    }

    .Buenos {
      grid-column: span 1;
      grid-row: span 1;
    }

    .Rome {
      grid-column: span 1;
      grid-row: span 1;
    }

    .Tokyo {
      grid-column: span 1;
      grid-row: span 1;
    }

    .Berlin {
      grid-column: span 1;
      grid-row: span 2;
    }

    .Barcelona {
      grid-column: span 1;
      grid-row: span 2;
    }

    .New {
      grid-column: span 2;
      grid-row: span 1;
    }

    .Rio {
      grid-column: span 1;
      grid-row: span 1;
    }

    .img-container:last-child {
      grid-column: span 1;
      grid-row: span 1;
      background-color: #7ebf50;
    }
  }
}

@media (max-width: 1200px) {
  .cities-gallery {
    max-width: 980px;
  }
}

// @media (max-width: 760px) {
//   .cities-gallery {
//     height: auto;
//     display: block;
//   }

//   .img-container {
//     margin: 10px;
//   }
// }
</style>


