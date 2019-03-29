<template>
  <section class="user-inbox" v-if="user">
    <h2>MY INBOX</h2>
    <div class="inbox-container flex flex-row">
      <nav>
        <div class="nav-item">Requests</div>
        <div class="nav-item">My Calendar</div>
        {{user.requests}}
      </nav>
      <div class="main-content">
        <div
          class="request flex flex-row space-between align-center"
          :class="{'animation':request.isAccepted, 'fadeOutLeft':request.isAccepted}"
          :key="idx"
          v-for="(request, idx) in user.requests"
        >
          <div class="user-info">
            <div class="request-info">
              <span>{{request.sender.firstName}} {{request.sender.lastName}}</span>
              has requested to stay with you from {{request.info.startDate}} till {{request.info.endDate}}
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
.user-inbox {
  padding: 20px;
  background-image: url("../../public/img/inbox-background.png");
  background-size: cover;
  background-repeat: no-repeat;
  .inbox-container {
    nav {
      .nav-item {
        padding: 10px;
        background-color: #fff;
        border: 2px solid rgba(0, 0, 0, 0.15);
      }
    }
    .main-content {
      flex-grow: 1;
      .request {
        background-color: #fff;
        height: 200px;
        width: 100%;
        border-bottom: 2px solid rgba(0, 0, 0, 0.15);
        padding: 20px;
        border-radius: 5px;
        margin-bottom: 5px;
        animation-duration: 1s;
        opacity: 0.9;
      }
    }
  }
}
</style>

