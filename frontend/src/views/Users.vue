<template>
  <section class="users flex flex-col">
    <main-header></main-header>
    <div class="main-title">Local Hosts</div>
    <div class="users-container">
      <users-list :users="getUsers"></users-list>
    </div>
  </section>
</template>

<script>
import UsersList from '../components/UsersList.vue';
import MainHeader from '../../src/components/MainHeader'

export default {
  name: "Users",
  components: {
    UsersList,
    MainHeader
  },
  created() {
    let { city } = this.$route.params;
    let { country } = this.$route.params;
    this.$store.dispatch('loadUsers', { city: city, country: country })
  },
  computed: {
    getUsers() {
      return this.$store.getters.users;
    }
  },
};
</script>

<style lang="scss" scoped>
.users {
  .main-title {
    padding: 10px;
    font-size: 2rem;
    font-weight: bold;
    align-self: center;
  }
}
</style>

