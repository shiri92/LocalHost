<template>
  <section class="profiles-page">
    <div class="main-title">Local Hosts</div>
    
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
      return this.$store.getters.users
    }
  },
  components: {
    ProfilesList
  }
};
</script>

<style lang="scss" scoped>
    .profiles-page {
        background-color: antiquewhite;
        .main-title {
            padding: 10px;
            font-size: 2rem;
            font-weight: bold;
        }
    }

</style>

