<template>
  <section class="city-search flex justify-center">
    <gmap-autocomplete @place_changed="chooseCity" class="google-search"></gmap-autocomplete>
    <button class="btn">
      <font-awesome-icon icon="search" />
    </button>
  </section>
</template>

<script>
// import eventBus from '../services/eventbus-service.js';
export default {
  name: 'CitySearch',
  props: {
  },
  data() {
    return {
      searchWord: '',
      cityImg: null
    }
  },
  computed: {
    getCities() {
      return this.$store.getters.cities;
    }
  },
  methods: {
    chooseCity(ev) {
      this.cityImg = ev.photos[0].getUrl({ 'maxWidth': 100, 'maxHeight': 100 });
      let inputRes = JSON.parse(JSON.stringify(ev.formatted_address));
      let idx = inputRes.indexOf(',');
      let currCity = inputRes.substr(0, idx)
      let currCountry = inputRes.substr(idx + 2, inputRes.length)
      this.$router.push(`/users/${currCountry}&${currCity}`);
      // eventBus.$emit('setCityImg', this.cityImg);
    }
  },
}
</script>

<style scoped lang="scss">
.google-search {
  padding-right: 30px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 400px;
}

.btn {
  height: 40px;
  margin-left: 10px;
}

@media (max-width: 1000px) {
  .google-search {
    width: 50%;
  }
}

@media (max-width: 800px) {
  .google-search {
    width: 60%;
  }
}
</style>
