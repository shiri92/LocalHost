<template>
  <section class="user-inbox">
    <h2>INBOX</h2>
    <div class="inbox-container flex flex-row">
      <div class="main-content" v-if="getLoggedUser">
        <h3 v-if="getLoggedUser.pendingRequests.length===0">Your Inbox Is Empty...</h3>
        <div
          class="card"
          v-else
          v-for="(request, idx) in getLoggedUser.pendingRequests"
          :key="idx"
          :class="{'animation':request.isAccepted, 'fadeOutLeft':request.isAccepted}"
        >
          <div @click="request.isOpen = !request.isOpen" class="top flex align-center">
            <img
              src="https://res.cloudinary.com/dcl4oabi3/image/upload/v1554330254/fav-icons/request.png"
              style="width:20px; height:20px"
            >
            &nbsp;
            <div style="color: #3256bf">Messages&nbsp;</div>
            <div>&#183; {{request.createdAt | moment("from", "now")}}</div>&nbsp;
            <!-- <div>&#183; {{Date.now() | moment("from", "now")}}</div>&nbsp; -->
            <font-awesome-icon v-if="!request.isOpen" icon="sort-down"/>
            <font-awesome-icon v-if="request.isOpen" icon="sort-up"/>
          </div>
          <div class="content flex space-between">
            <div>
              <h4>{{request.source.firstName}} {{request.source.lastName}}</h4>
              <h5>has requested to stay with you from {{request.arrivalDate | moment("calendar")}} To {{request.leavingDate | moment("calendar")}}</h5>
              <div class="msg">{{request.description}}</div>
            </div>
            <img
              @click="$router.push('/userProfile/' + request.source.id)"
              class="user-img"
              :style="'background-image: url(' + request.source.imgUrl +')'"
            >
          </div>
          <div v-if="request.isOpen" class="btns flex">
            <div @click="acceptRequest(request)">Accept</div>
            <div @click="declineRequest(request)">Decline</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import globeLoader from '../components/globeLoader.js';
export default {

  data() {
    return {
      requests: [],
    };
  },
  computed: {
    getLoggedUser() {
      return this.$store.getters.loggedUser;
    },
  },
  methods: {
    async acceptRequest(request) {
      await this.$store.dispatch({ type: 'acceptRequest', request: request, targetId: this.getLoggedUser._id });
      let response = this.$store.getters.emptyResponse;
      response.arrivalDate = request.arrivalDate;
      response.leavingDate = request.leavingDate;
      await this.$store.dispatch({ type: 'sendResponse', response: response, targetId: request.source.id });
    },
    async declineRequest(request) {
      await this.$store.dispatch({ type: 'declineRequest', request: request, targetId: this.getLoggedUser._id });
    }
  }
};
</script>

<style lang="scss" scoped>
.user-inbox {
  max-width: 1400px;
  margin: 0 auto;
  .inbox-container {
    .main-content {
      .card {
        max-width: 980px;
        margin: 30px 0;
        border-radius: 3px;
        box-shadow: 1px 1px 4px rgb(110, 109, 109);
        animation-duration: 1s;
        opacity: 0.9;
        .top {
          padding: 20px 20px 0 20px;
          margin-bottom: 20px;
          cursor: pointer;
        }
        .content {
          padding: 0 20px 20px 20px;
          .msg {
            max-width: 600px;
          }
          .user-img {
            margin-left: 70px;
            cursor: pointer;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background-size: cover;
            background-repeat: no-repeat;
          }
        }
        .btns {
          background-color: rgb(209, 207, 207);
          color: #3256bf;
          padding: 0 20px 0 20px;
          div {
            margin-left: 30px;
            cursor: pointer;
            height: 100%;
            padding: 20px 10px;
          }
        }
      }
    }
  }
}
</style>

