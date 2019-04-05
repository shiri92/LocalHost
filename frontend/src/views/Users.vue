<template>
  <globe-loader v-if="showAnimation"></globe-loader>
  <section v-else class="users flex flex-col" data-aos="fade-up" data-aos-duration="1000">
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
import GlobeLoader from '../components/GlobeLoader';
export default {
  name: 'Users',
  components: {
    UserList,
    MainHeader,
    GlobeLoader
  },
  data() {
    return {
      showAnimation: true,
    }
  },
  async created() {
    let { city } = this.$route.params;
    let { country } = this.$route.params;
    await this.$store.dispatch('loadUsers', { city: city, country: country })
    setTimeout(() => {
      this.showAnimation = false;
    }, 1100);
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