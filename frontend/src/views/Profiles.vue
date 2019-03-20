<template>
  <section>
    <h1>Local Hosts</h1>
    
    <div class="profiles-container">
      <profiles-list :profiles="profiles"></profiles-list>
    </div>
  </section>
</template>


<script>
import ProfilesList from "../components/ProfilesList.vue";


export default {
  name: "Profiles",
  computed: {
    profiles() {
      // return this.$store.getters.profiles
      return {
        profile1: {
          name: "Yoni",
          imgUrl: "/img/profile-images/profile1.png"
        },
        profile2: {
          name: "Shiri",
          imgUrl: '/img/profile-images/profile2.png'
        },
        profile3: {
          name: "Niv",
          imgUrl: ''
        }
      };
    }
  },
  components: {
    ProfilesList
  }
};
</script>

<style>
    img {
        height: 50px;
        width: 50px;
    }
</style>
