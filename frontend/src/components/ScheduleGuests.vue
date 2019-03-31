<template>
  <section class="schedule-guests">
    <!-- <h1>Schedule Guests!</h1> -->
    <h3>THIS MONTH</h3>
    <div class="flex-container clean-list" v-if="currUser">
      <router-link
        class="guest-list-item"
        :key="currGuest._id"
        v-for="(currGuest, idx) in currUser.guests"
        :to="'/userProfile/' + currGuest._id"
      >
        <user-preview-guest :profile="currGuest" :idx="idx+1"></user-preview-guest>
      </router-link>
    </div>
    <h4>Capacity: 0/3</h4>
    <!-- <h3>APRIL</h3> -->
    <!-- <div class="flex-container clean-list"> -->
    <!-- <user-preview-guest v-if="currUser" :profile="currUser"></user-preview-guest> -->
    <!-- </div> -->
  </section>
</template>

<script>
import UserPreviewGuest from './UserPreviewGuest.vue';
import '../filters.js';


export default {
  components: {
    UserPreviewGuest
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
h3 {
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
}
.schedule-guests {
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
