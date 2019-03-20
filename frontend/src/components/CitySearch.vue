<template>
  <section class="city-search">

    <el-input placeholder="Where do you want to go?" v-model="input">
      <el-button type="success" slot="append" icon="el-icon-search" plain>Search</el-button>
    </el-input>

  </section>
    
</template>

<script>

export default {
  name: 'CitySearch',
  props: {
  },
  data() {
    return{
      input: ''
    }
  }
}
</script>

<style scoped lang="scss">

.city-search{
  min-width: 70%;
  margin: 0 auto;
}




</style>
