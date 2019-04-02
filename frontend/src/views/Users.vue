<template>
  <section class="users flex flex-col">
    <main-header></main-header>
    <div class="main-title">Hosts In The Area</div>
    <div class="users-container">
      <user-list :users="getUsers"></user-list>
    </div>
  </section>
</template>

<script>
import UserList from '../components/UserList.vue';
import MainHeader from '@/components/MainHeader'

export default {
  name: 'Users',
  components: {
    UserList,
    MainHeader
  },
  created() {
    let { city } = this.$route.params;
    let { country } = this.$route.params;
    this.$store.dispatch('loadUsers', { city: city, country: country })
  },
  computed: {
    getUsers() {
      return this.$store.getters.currUsers;
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
    margin: 50px;
  }
}
</style>

