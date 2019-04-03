<template>
  <section class="schedule-hosts">
    <google-map></google-map>
    <!-- <div class="flex-container clean-list" v-if="currUser">
      <h2 v-if="currUser.hosts.length===0">No Hosts Yet</h2>
      <router-link
        v-else
        class="guest-list-item"
        :key="currHost._id"
        v-for="(currHost, idx) in currUser.hosts"
        :to="'/userProfile/' + currHost.recipient.id"
      >
        <user-preview-guest :profile="currHost.recipient" :idx="idx+1"></user-preview-guest>
    </router-link>-->
    <!-- {{currUser}} -->
    <!-- </div> -->
    <!-- TODO: Guest Capacity -->
    <!-- <h4>Capacity: {{loggedUser.placeDetails.guestCapacity}}</h4> -->
  </section>
</template>

<script>
import UserPreviewGuest from './UserPreviewGuest.vue';
import '../filters.js';
import GoogleMap from './GoogleMap'

export default {
  components: {
    UserPreviewGuest,
    GoogleMap
  },
  computed: {
    currUser() {
      return this.$store.getters.currUser;
    },
    loggedUser() {
      return this.$store.getters.loggedUser;
    }
  }
}
</script>
<style scoped lang="scss">
h2 {
  text-align: center;
}
h3 {
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
}
.schedule-hosts {
  display: flex;
  flex-direction: column;
  padding: 10px;

  .flex-container {
    justify-content: space-around;
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
    padding: 10px;
  }

  .flex-container > * {
    min-width: 300px;
    margin-bottom: 20px;
  }
  // .flex-container > *:not(:last-child) {
  // }
}
</style>
