<template>
  <section class="city-search">
    <el-autocomplete
      class="input"
      v-model="searchWord"
      @select="chooseCity"
      placeholder="Where do you want to go?"
      :fetch-suggestions="querySearchAsync"
    ></el-autocomplete>
    <el-button class="btn" type="success" slot="append" icon="el-icon-search" plain>Search</el-button>
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
.city-search {
  width: 50%;
  margin: 0 auto;
}

.input {
  width: 85%;
}

.btn {
  width: 15%;
}
</style>
