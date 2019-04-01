<template>
  <section class="user-inbox" v-if="user">
    <h2>INBOX</h2>
    <div class="inbox-container flex flex-row">
      <nav>
        <div class="nav-item">Requests</div>
        <div class="nav-item">Calendar</div>
      </nav>
      <div class="main-content">
        <h3 v-if="user && user.requests.length===0">Your Inbox Is Empty...</h3>
        <div
          v-else
          class="request flex flex-row space-between align-center"
          :class="{'animation':request.isAccepted, 'fadeOutLeft':request.isAccepted}"
          :key="idx"
          v-for="(request, idx) in user.requests"
        >
          <div class="user-info">
            <div class="request-info">
              <span>{{request.sender.firstName}} {{request.sender.lastName}}</span>
              has requested to stay with you from {{request.info.startDate}} To {{request.info.endDate}}
            </div>
            <div class="request-msg">{{request.info.message}}</div>
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
      showAnimation: false
    };
  },
  created() { },
  computed: {
    user() {
      return this.$store.getters.loggedUser;
    }
  },
  methods: {
    async acceptRequest(request) {
      await this.$store.dispatch({ type: "removeRequest", request });
      setTimeout(() => {
        let { _id } = request;
        this.$store.commit({ type: "removeRequest", _id });
      }, 1000);
      await this.$store.dispatch({ type: "bookGuest", request });
      console.log("Successfuly Regisered The Guest!");
      await this.$store.dispatch({ type: "bookHost", request });
      console.log("Successfuly Regisered The Host!");
    },
    async declineRequest(request) {
      await this.$store.dispatch({ type: "removeRequest", request });
      setTimeout(() => {
        let { _id } = request;
        this.$store.commit({ type: "removeRequest", _id });
      }, 1000);
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

