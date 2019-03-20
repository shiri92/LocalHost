<template>
  <div class="home">
    <img :src="img" alt="">
  </div>
</template>

<script>

import imgUrl from '../assets/img/logo.png'

export default {
  name: 'home',
  data() {
    return {
      
      img: imgUrl
    }
  },
  components: {
    
  }
}
</script>
