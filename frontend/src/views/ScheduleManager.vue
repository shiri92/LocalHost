<template>
  <section class="schedule-manager">
    <div class="bg-container">
      <div class="nav-container">
        <div class="nav" v-if="getCurrUser">
          <router-link :to="'/userProfile/' + getCurrUser._id + '/scheduleManager/scheduleGuests'">
            <div class="nav-item">Guests</div>
          </router-link>
          <router-link :to="'/userProfile/' + getCurrUser._id + '/scheduleManager/scheduleHosts'">
            <div class="nav-item">Hosts</div>
          </router-link>
          <router-link :to="'/userProfile/' + getCurrUser._id + '/scheduleManager/scheduleDetails'">
            <div class="nav-item">Details</div>
          </router-link>
        </div>
      </div>
    </div>
    <router-view class="view"></router-view>
  </section>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  created() {
    let userId = this.$route.params.userId;
    this.$store.dispatch({ type: "loadUser", userId });
    if (this.getCurrUser)
      this.$router.push('/userProfile/' + this.getCurrUser._id + '/scheduleManager/scheduleGuests');
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },

  },
  computed: {
    getCurrUser() {
      return this.$store.getters.currUser;
    }
  },
  watch: {
    getCurrUser(newVal, oldVal) {
      this.$router.push('/userProfile/' + this.getCurrUser._id + '/scheduleManager/scheduleGuests');
    }
  }
}
</script>

<style scoped lang="scss">
.schedule-manager {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.view {
  flex-grow: 1;
  // height: 300px;
}
.bg-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 40vh;
  background-image: url("../../public/img/schedule-manager.jpg");
  background-size: cover;
  background-position: center center;
  .nav-container {
    display: flex;
    align-items: center;
    // height: 30%;
    // padding: 10px;
    margin-bottom: 5px;
    background-color: rgb(66, 66, 66);
    opacity: 0.9;
    .nav {
      display: flex;
      justify-content: space-between;
      width: 70%;
      // padding: 10px;
      margin: 0 auto;
      color: white;
      .nav-item {
        border-radius: 10px;
        padding: 10px 50px 10px 50px;
        transition: 1s;
        &:hover {
          background-color: rgb(94, 94, 94);
        }
      }
    }
  }
}
</style>
