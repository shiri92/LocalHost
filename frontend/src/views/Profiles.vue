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
    this.$store.dispatch({ type: 'loadUsers' })
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
  background-color: antiquewhite;
  .main-title {
    padding: 10px;
    font-size: 2rem;
    font-weight: bold;
  }
}
</style>

