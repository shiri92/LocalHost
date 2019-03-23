<template>
  <section class="users-page">
    <div class="main-title">Local Hosts</div>

    <div class="users-container">
      <users-list :users="getUsers"></users-list>
    </div>
  </section>
</template>

<script>
import UsersList from "../components/UsersList.vue";

export default {
  name: "Users",
  created() {
    let { name } = this.$route.params;
    this.$store.dispatch({ type: 'loadUsers', city: name })
  },
  computed: {
    getUsers() {
      return this.$store.getters.users;
    }
  },
  components: {
    UsersList
  }
};
</script>

<style lang="scss" scoped>
.users-page {
  .main-title {
    padding: 10px;
    font-size: 2rem;
    font-weight: bold;
  }
}
</style>

