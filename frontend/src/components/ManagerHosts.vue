<template>
  <section class="schedule-hosts">
    <div class="flex-container clean-list" v-if="getLoggedUser">
      <div
        class="empty flex justify-center align-center"
        v-if="getLoggedUser.acceptedResponses.length===0"
      >
        <h3>No Hosts Yet...</h3>
      </div>
      <div v-else class="page-container flex" data-aos="fade-right" data-aos-duration="1200">
        <div class="list-container flex flex-col">
          <router-link
            style="margin: 2px"
            class="guest-list-item"
            :key="currResponse._id"
            v-for="(currResponse, idx) in getLoggedUser.acceptedResponses"
            :to="'/userProfile/' + currResponse.source.id"
          >
            <user-preview-host :response="currResponse" :idx="idx+1"></user-preview-host>
          </router-link>
        </div>
        <div class="info-container flex flex-col">
          <div class="calendar-wrapper" data-aos="fade-up" data-aos-duration="1500">
            <v-calendar :attributes="attrs" class="calendar"></v-calendar>
          </div>
          <google-map
            :responses="getLoggedUser.acceptedResponses"
            data-aos="fade-up"
            data-aos-duration="1500"
          ></google-map>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import UserPreviewHost from "./UserPreviewHost.vue";
import "../filters.js";
import GoogleMap from "./GoogleMap";
import eventBus from '../services/eventbus-service.js';

export default {
  components: {
    UserPreviewHost,
    GoogleMap
  },
  data() {
    return {
      cmpChange: false,
      keyId: 1,
      attrs: []
    };
  },
  created() {
    eventBus.$emit('selectHosts')
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
      this.getCurrUser.acceptedResponses.forEach(req => {
        this.attrs.push({
          key: this.keyId++,
          highlight: {
            backgroundColor: "#ff8080"
          },
          contentStyle: {
            color: "#fafafa"
          },
          popover: {
            label: `Staying with ${req.source.firstName} ${
              req.source.lastName
            }`,
          },
          dates: [{ start: req.arrivalDate, end: req.leavingDate }]
        });
      });
    }
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
    }
  }
};
</script>

<style scoped lang="scss">
h2 {
  text-align: center;
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
  @media (max-width: 568px) {
    .flex-container {
      padding: 2px;
    }
  }

  .flex-container > * {
    min-width: 280px;
    margin-bottom: 20px;
  }

  .page-container {
    width: 100%;
    max-width: 1000px;
    flex-direction: flex-row;
  }
  .info-container {
    width: 100%;
    padding-left: 10px;
    flex-grow: 1;
  }
  @media (max-width: 760px) {
    .page-container {
      flex-direction: column;
    }
    .info-container {
      padding-left: 0;
    }
  }
  .calendar-wrapper {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 10px;
    z-index: 0;
    .calendar {
      width: 100%;
      min-width: 250px;
    }
  }
  .list-container {
    overflow: auto;
    min-width: 360px;
    height: 784px;
  }
  @media (max-width: 760px) {
    .list-container {
      overflow: unset;
      height: auto;
      min-width: unset;
    }
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
@media (max-width: 568px) {
  .schedule-hosts {
    padding: 0;
  }
}
</style>
