<template>
  <section class="city-search">

    <!-- <div class="search-container flex"> -->

    <el-input
      @input="search"
      placeholder="Where do you want to go?"
      v-model="searchWord"
    >
      <el-button
        type="success"
        slot="append"
        icon="el-icon-search"
        plain
      >Search</el-button>
    </el-input>
    <!-- </div> -->

    <ul
      class="clean-list"
      v-for="(city, idx) in getCities"
      :key="idx"
    >
      <li v-if="searchWord"><a href="#">{{city.name}}, {{city.country}}</a></li>
    </ul>
  </section>
</template>

<script>

export default {
  name: 'CitySearch',
  props: {
  },
  data() {
    return {
      searchWord: '',
    }
  },
  computed: {
    getCities() {
      return this.$store.getters.cities;
    }
  },
  methods: {
    search() {
      if (this.searchWord)
        this.$store.dispatch({ type: 'loadCities', searchWord: this.searchWord });
      else {
        let cities = [];
        this.$store.commit({ type: 'setCities', cities })
      }

    }
  }
}
</script>

<style scoped lang="scss">
.city-search {
  width: 60%;
  margin: 0 auto;
  //   position: absolute;
  //   top: 80%;
  //   left: 20vw;
}

li {
  background-color: white;
  border-bottom: 1px solid rgb(219, 216, 216);
  padding: 10px;
  font-family: lato-reg;
  font-size: 0.9rem;
  text-align: left;
  cursor: pointer;
}
</style>
