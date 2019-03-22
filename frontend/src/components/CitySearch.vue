<template>
  <section class="city-search">

    <!-- <div class="search-container flex"> -->

    <el-input @input="search" placeholder="Where do you want to go?" v-model="searchWord">
    <el-button type="success" slot="append" icon="el-icon-search" plain>Search</el-button>
    </el-input>
    <!-- </div> -->

    <ul class="clean-list" v-for="(country, idx) in countries" :key="idx">
      <li v-if="searchWord"><a href="#">{{country}}</a></li>
    </ul>

  </section>
    
</template>

<script>

export default {
  name: 'CitySearch',
  props: {
  },
  data() {
    return{
      searchWord: '',
    }
  },
  created(){
  },
  computed: {
    countries() {
      return this.$store.getters.countries
    }
  },
  methods: {
    search(){
      this.$store.dispatch({type: 'loadCountries', searchWord: this.searchWord});
    }
  }
}
</script>

<style scoped lang="scss">

.city-search{
  width: 60%;
  margin: 0 auto;
//   position: absolute;
//   top: 80%;
//   left: 20vw;
}

li{
  background-color: white;
  border: 1px solid black;
  padding: 15px;
  font-family: lato-reg;
  text-align: left;
}

</style>
