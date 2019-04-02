<template>
  <section class="schedule-guests">
    <h3>THIS MONTH</h3>
    <div class="flex-container clean-list" v-if="getLoggedUser">
      <h2 v-if="getLoggedUser.acceptedRequests.length===0">No Guests Yet</h2>
      <router-link
        v-else
        class="guest-list-item"
        :key="currRequest._id"
        v-for="(currRequest, idx) in getLoggedUser.acceptedRequests"
        :to="'/userProfile/' + currRequest.source.id"
      >
        <user-preview-guest :request="currRequest" :idx="idx+1"></user-preview-guest>
      </router-link>
      <button @click="addDatesToCal">Test</button>
      <v-calendar :attributes="attrs"></v-calendar>
    </div>
    <!-- TODO: Guest Capacity -->
    <!-- <h4>Capacity: {{loggedUser.placeDetails.guestCapacity}}</h4> -->
  </section>
</template>

<script>
import UserPreviewGuest from './UserPreviewGuest.vue';
import '../filters.js';


export default {
  components: {
    UserPreviewGuest
  },
  data() {
    return {
      attrs: [
        {
          key: "today",
          highlight: {
            backgroundColor: "#ff8080"
            // Other properties are available too, like `height` & `borderRadius`
          },
          contentStyle: {
            color: "#fafafa"
          },
          popover: {
            label: "You just hovered over today's date!"
          },
          dates: [
            // { start: this.currUser.guests[0].sender.startDate, end: this.currUser.guests[0].sender.startDate},
            { start: new Date(2019, 3, 1), end: new Date(2019, 3, 5) },
            { start: new Date(2019, 4, 15), span: 5 } // Span is number of days
          ],
        }
      ]
    };
  },
  computed: {
    getCurrUser() {
      return this.$store.getters.currUser;
    },
    getLoggedUser() {
      return this.$store.getters.loggedUser;
    }
  },
  methods: {
    addDatesToCal() {
      this.attrs[0].dates.push({start: this.currUser.guests[0].sender.startDate, end: this.currUser.guests[0].sender.startDate})
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
