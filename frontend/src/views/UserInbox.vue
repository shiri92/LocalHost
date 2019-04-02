<template>
  <section class="user-inbox">
    <h2>INBOX</h2>
    <div class="inbox-container flex flex-row">
      <nav>
        <div class="nav-item">Requests</div>
        <div class="nav-item">Calendar</div>
      </nav>
      <div class="main-content" v-if="getLoggedUser">
        <h3 v-if="getLoggedUser.pendingRequests.length===0">Your Inbox Is Empty...</h3>
        <div
          v-else
          v-for="(request, idx) in getLoggedUser.pendingRequests"
          :key="idx"
          class="request flex flex-row space-between align-center"
          :class="{'animation':request.isAccepted, 'fadeOutLeft':request.isAccepted}"
        >
          <div class="user-info">
            <div class="request-info">
              <span>{{request.source.firstName}} {{request.source.lastName}}</span>
              has requested to stay with you from {{request.arrivalDate}} To {{request.leavingDate}}
            </div>
            <div class="request-msg">{{request.description}}</div>
          </div>
          <div class="answer-btns">
            <el-button type="success" @click="acceptRequest(request)">Accept</el-button>
            <el-button type="danger" @click="declineRequest(request)">Decline</el-button>
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
      await this.$store.dispatch({ type: 'sendResponse', response: response, targetId: request.source.id });
    },
    async declineRequest(request) {
      await this.$store.dispatch({ type: 'declineRequest', request: request, targetId: this.getLoggedUser._id });
    }
  }
};
</script>

<style lang="scss" scoped>
h2 {
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
  text-align: center;
}
.user-inbox {
  flex-grow: 1;
  background: linear-gradient(#2193b0, #6dd5ed);

  padding: 20px;
  background-size: cover;
  background-repeat: no-repeat;
  .inbox-container {
    margin-top: 20px;
    nav {
      flex-grow: 1;
      margin-right: 20px;
      .nav-item {
        margin-bottom: 20px;
        max-width: 150px;
        padding: 10px;
        background-color: #fff;
        border-radius: 10px;
        text-align: left;
        transition: 0.3s;
        &:hover {
          background-color: rgb(131, 131, 131);
        }
      }
    }
    .main-content {
      flex-grow: 1;
      .request {
        font-weight: bold;
        background-color: rgb(43, 43, 43);
        width: 100%;
        border-bottom: 2px solid rgba(0, 0, 0, 0.15);
        padding: 20px;
        border-radius: 5px;
        margin-bottom: 5px;
        animation-duration: 1s;
        opacity: 0.9;
        .request-info {
          padding-left: 10px;
          padding-right: 10px;
          padding-top: 5px;
          padding-bottom: 5px;
          background-color: #fff;
          // color: rgb(98, 162, 192);
          margin-bottom: 10px;
        }
        .request-msg {
          padding: 10px;
          background-color: #fff;
        }
      }
    }
  }
}
</style>

