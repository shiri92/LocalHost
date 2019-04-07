<template>
  <section class="schedule-guests">
    <div class="flex-container clean-list" v-if="getLoggedUser">
      <div
        class="empty flex justify-center align-center"
        v-if="getLoggedUser.acceptedRequests.length===0"
      >
        <h3>No Guests Yet...</h3>
      </div>
      <div v-else class="info-container flex flex-row justify-center">
        <div class="list-container flex flex-col" data-aos="fade-right" data-aos-duration="1200">
          <router-link
            style="margin: 2px"
            class="guest-list-item"
            :key="currRequest._id"
            v-for="(currRequest, idx) in getLoggedUser.acceptedRequests"
            :to="'/userProfile/' + currRequest.source.id"
          >
            <user-preview-guest :request="currRequest" :idx="idx+1"></user-preview-guest>
          </router-link>
        </div>
        <div class="calendar-wrapper" data-aos="fade-left" data-aos-duration="1200">
          <v-calendar :attributes="attrs" class="calendar"></v-calendar>
        </div>
      </div>
    </div>
    <!-- TODO: Guest Capacity -->
    <!-- <h4>Capacity: {{loggedUser.placeDetails.guestCapacity}}</h4> -->
  </section>
</template>

<script>
import UserPreviewGuest from "./UserPreviewGuest.vue";
import "../filters.js";
import eventBus from '../services/eventbus-service.js';

export default {
  components: {
    UserPreviewGuest
  },
  data() {
    return {
      cmpChange: false,
      keyId: 1,
      attrs: []
    };
  },
  created() {
    eventBus.$emit('selectGuests')
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
    .empty {
      background-image: url("../../public/img/bg-imgs/inbox.svg");
      background-size: cover;
      position: relative;
      width: 500px;
      height: 500px;
      h3 {
        margin-top: 250px;
        font-size: 2rem;
        color: white;
        font-family: lato-reg;
      }
    }
  }

  .flex-container > * {
    min-width: 300px;
    margin-bottom: 20px;
  }

  .info-container {
    width: 100%;
    max-width: 1000px;
  }
  .calendar-wrapper {
    width: 100%;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-left: 10px;
    z-index: 0;
    .calendar {
      width: 100%;
      min-width: 250px;
    }
  }
  .list-container {
    overflow: auto;
    min-width: 360px;
    height: 275px;
  }
  .list-container::-webkit-scrollbar {
    width: 0.25em;
  }

  .list-container::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(75, 21, 173, 0.3);
  }

  .list-container::-webkit-scrollbar-thumb {
    background-color: rgb(109, 108, 108);
  }
}
</style>
