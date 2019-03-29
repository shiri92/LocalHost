<template>
  <section class="city-search flex justify-center">
    <el-autocomplete
      class="input"
      v-model="searchWord"
      @select="chooseCity"
      placeholder="Where do you want to go?"
      :fetch-suggestions="querySearchAsync"
    ></el-autocomplete>
    <button class="btn"><font-awesome-icon icon="search"/></button>
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
    querySearchAsync(queryString, cb) {
      if (this.searchWord) {
        this.$store.dispatch({ type: 'loadCities', searchWord: this.searchWord })
          .then(cities => {
            this.cities = cities
            let results = cities.map(city => { return { value: city.name + ', ' + city.country } });
            cb(results);
          })
      }
    },
    chooseCity(ev) {
      let inputRes = JSON.parse(JSON.stringify(ev)).value;
      let idx = inputRes.indexOf(',');
      let currCity = inputRes.substr(0, idx)
      let currCountry = inputRes.substr(idx + 2, inputRes.length)
      this.$router.push(`/users/${currCountry}&${currCity}`);
    }
  },
  computed: {
    getCities() {
      return this.$store.getters.cities;
    }
  }
}
</script>

<style scoped lang="scss">
.input {
  width: 400px;
}

@media (max-width: 1000px) {
  .input {
    width: 50%;
  }
}

@media (max-width: 800px) {
  .input {
    width: 60%;
  }
}
</style>
