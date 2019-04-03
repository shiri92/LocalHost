<template>
  <section class="schedule-hosts">
    <h3>THIS MONTH</h3>
    <div class="flex-container clean-list" v-if="getLoggedUser">
      <h2 v-if="getLoggedUser.acceptedResponses.length===0">No Hosts Yet</h2>
      <div v-else class="info-container flex flex-row justify-center">
        <div class="list-container flex flex-col">
          <router-link
            style="margin: 2px"
            class="guest-list-item"
            :key="currResponse._id"
            v-for="(currResponse, idx) in getLoggedUser.acceptedResponses"
            :to="'/userProfile/' + currResponse.source.id"
          >
            <user-preview-guest :response="currResponse" :idx="idx+1"></user-preview-guest>
          </router-link>
        </div>
        <div class="calendar-wrapper">
          <v-calendar :attributes="attrs" class="calendar"></v-calendar>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import UserPreviewGuest from "./UserPreviewGuest.vue";
import "../filters.js";

export default {
  components: {
    UserPreviewGuest
  },
  data() {
    return {
      cmpChange: false,
      keyId: 1,
      attrs: []
    }
  },
  computed: {
    getCurrUser() {
      return this.$store.getters.currUser;
    },
    getLoggedUser() {
      return this.$store.getters.loggedUser;
    },
    watchFunc() {
      return `${this.getCurrUser}|${this.cmpChange}`;
    }
  },
  methods: {
    addDatesToCal() {
      if (!this.getCurrUser) return;
      this.getCurrUser.acceptedRequests.forEach(req => {
        this.attrs.push({
          key: this.keyId++,
          highlight: {
            backgroundColor: "#ff8080"
            // Other properties are available too, like `height` & `borderRadius`
          },
          contentStyle: {
            color: "#fafafa"
          },
          popover: {
            label: `${req.source.firstName} ${
              req.source.lastName
            } staying over`,
            // hideIndicator: true,
            img: `${req.source.imgUrl}`
          },
          dates: [{ start: req.arrivalDate, end: req.leavingDate }]
        });
      });
      this.attrs[0].dates.push({
        start: this.getCurrUser.acceptedRequests[0].arrivalDate,
        end: this.getCurrUser.acceptedRequests[0].leavingDate
      });
    },
  },
  mounted() {
    this.cmpChange = true;
  },
  destroyed() {
    this.cmpChange = false;
  },
  watch: {
    watchFunc() {
      this.addDatesToCal();
    },
  }
};
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

  .info-container {
    width: 100%;
  }
  .calendar-wrapper {
    // flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 0 30px;
    .calendar {
      width: 100%;
      max-width: 700px;
      min-width: 600px;
    }
  }
  .list-container {
    overflow: auto;
    height: 275px;
  }
  .list-container::-webkit-scrollbar {
    width: 0.25em;
  }

  .list-container::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(75, 21, 173, 0.3);
  }

  .list-container::-webkit-scrollbar-thumb {
    background-color: rgb(24, 1, 1);
  }
}
</style>
