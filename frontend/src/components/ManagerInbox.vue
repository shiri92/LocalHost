<template>
  <section class="user-inbox">
    <div class="inbox-container flex">
      <div class="main-content flex" v-if="getLoggedUser">
        <div
          class="empty flex justify-center align-center"
          v-if="getLoggedUser.pendingRequests.length===0"
        >
          <h3>Your Inbox Is Empty...</h3>
        </div>
        <div
          class="card"
          data-aos="fade-up" data-aos-duration="1200"
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
            <img
              class="arrow"
              v-if="!request.isOpen"
              src="https://res.cloudinary.com/dcl4oabi3/image/upload/v1554383713/fav-icons/sort-down.png"
            >
            <img
              class="arrow"
              v-if="request.isOpen"
              src="https://res.cloudinary.com/dcl4oabi3/image/upload/v1554383713/fav-icons/sort-up.png"
            >
          </div>
          <div class="content flex space-between">
            <div>
              <div class="name">{{request.source.firstName}} {{request.source.lastName}}</div>
              <div
                class="date"
              >Has requested to stay with you from {{request.arrivalDate | moment("calendar")}} To {{request.leavingDate | moment("calendar")}}</div>
              <div class="msg">{{request.description}}</div>
            </div>
            <img
              @click="$router.push('/userProfile/' + request.source.id)"
              class="user-img"
              :style="'background-image: url(' + request.source.imgUrl +')'"
            >
          </div>
          <div v-if="request.isOpen" class="btns flex">
            <div @click="acceptRequest(request)">ACCEPT</div>
            <div @click="declineRequest(request)">DECLINE</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

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
  min-width: 500px;
  margin: 0 auto;
  .inbox-container {
    .main-content {
      flex-direction: column-reverse;
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
      .card {
        max-width: 980px;
        margin: 30px 0 0;
        border-radius: 3px;
        box-shadow: 1px 1px 4px rgb(110, 109, 109);
        animation-duration: 1s;
        opacity: 0.9;
        .top {
          padding: 20px 20px 0 20px;
          margin-bottom: 20px;
          cursor: pointer;
          transition: 0.3s;
          &:hover {
            color: black;
            font-weight: bold;
          }
        }
        .arrow {
          width: 15px;
          height: 15px;
        }
        .content {
          padding: 0 20px 20px 20px;
          .name {
            font-size: 1.15rem;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .date {
            font-weight: bold;
            color: #757575;
            margin-bottom: 5px;
          }
          .msg {
            max-width: 600px;
            color: #757575;
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
          background-color: #eeeeee;
          color: #3256bf;
          padding: 0 20px 0 20px;
          div {
            margin-left: 30px;
            font-weight: bold;
            cursor: pointer;
            height: 100%;
            padding: 20px 10px;
            transition: 0.5s;
            &:hover {
              background-color: #b4b1b1;
              box-shadow: 2px 2px 9px rgb(144, 143, 143);
            }
          }
        }
      }
    }
  }
}
</style>

