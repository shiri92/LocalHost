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
        <!-- {{currGuest}} -->
        <user-preview-guest :profile="currGuest" :idx="idx+1"></user-preview-guest>
      </router-link>
      <!-- <user-preview-guest v-for="(guest, idx) in currUser.guests" :to="'/userProfile/' + guest._id"></user-preview-guest> -->
      <!-- <user-preview :profile="currProfile" :idx="idx+1"></user-preview>:profile="currProfile" :idx="idx+1"> -->

      <!-- <user-preview-guest v-if="currUser" :profile="currUser"></user-preview-guest> -->
    </div>
    <h3>APRIL</h3>
    <div class="flex-container clean-list">
      <!-- <user-preview-guest v-if="currUser" :profile="currUser"></user-preview-guest> -->
    </div>
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
.schedule-guests {
  display: flex;
  flex-direction: column;
  padding: 10px;

  .flex-container {
    justify-content: space-around;
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
  }

  .flex-container > * {
    max-width: 300px;
    margin-bottom: 20px;
  }
  .flex-container > *:not(:last-child) {
  }
}
</style>
