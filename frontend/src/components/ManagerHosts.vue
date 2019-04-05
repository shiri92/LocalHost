<template>
  <section class="schedule-hosts" >
    <div class="flex-container clean-list" v-if="getLoggedUser">
      <div
        class="empty flex justify-center align-center"
        v-if="getLoggedUser.acceptedResponses.length===0"
      >
        <h3>No Hosts Yet...</h3>
      </div>
      <div v-else class="page-container flex flex-row" data-aos="fade-right" data-aos-duration="1200">
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
        <div class="info-container flex flex-col" >
          <div class="calendar-wrapper" data-aos="fade-left" data-aos-duration="1500">
            <v-calendar :attributes="attrs" class="calendar"></v-calendar>
          </div>
          <google-map data-aos="fade-left" data-aos-duration="1500"></google-map>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import UserPreviewHost from "./UserPreviewHost.vue";
import "../filters.js";
import GoogleMap from "./GoogleMap";

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
            // Other properties are available too, like `height` & `borderRadius`
          },
          contentStyle: {
            color: "#fafafa"
          },
          popover: {
            label: `Staying with ${req.source.firstName} ${
              req.source.lastName
              }`,
            img: `${req.source.imgUrl}`
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

  .flex-container > * {
    min-width: 300px;
    margin-bottom: 20px;
  }

  .page-container {
    width: 100%;
    max-width: 1000px;
  }
  .info-container {
    width: 100%;
    padding-left: 10px;
    flex-grow: 1;
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
    height: 560px;
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
