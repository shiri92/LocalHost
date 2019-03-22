<template>
  <section class="profiles-page">
    <div class="main-title">Local Hosts</div>
    <div class="profiles-container">
      <profiles-list :profiles="getUsers"></profiles-list>
    </div>
  </section>
</template>

<script>
import ProfilesList from "../components/ProfilesList.vue";

export default {
  name: "Profiles",
  created() {
    this.$store.dispatch({ type: "loadUsers" });
  },
  computed: {
    getUsers() {
      return this.$store.getters.users;
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

