<template>
  <section class="schedule-manager">
    <div class="bg-container">
      <div class="nav-container">
        <div class="nav" v-if="getCurrUser">
          <router-link :to="'/userProfile/' + getCurrUser._id + '/manager/managerGuests'">
            <div
              class="nav-item"
              :class="{isSelected: navItemSelected.guests}"
              @click="whoSelected(true, false, false)"
            >Guests</div>
          </router-link>
          <router-link :to="'/userProfile/' + getCurrUser._id + '/manager/managerHosts'">
            <div
              class="nav-item"
              :class="{isSelected: navItemSelected.hosts}"
              @click="whoSelected(false, true, false)"
            >Hosts</div>
          </router-link>
          <router-link :to="'/userProfile/' + getCurrUser._id + '/manager/managerInbox'">
            <div
              class="nav-item"
              :class="{isSelected: navItemSelected.inbox}"
              @click="whoSelected(false, false, true)"
            >Inbox</div>
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
      navItemSelected: {
        guests: false,
        hosts: false,
        inbox: true,
      }
    };
  },
  created() {
    let userId = this.$route.params.userId;
    this.$store.dispatch({ type: "loadUser", userId });
    if (this.getCurrUser)
      this.$router.push('/userProfile/' + this.getCurrUser._id + '/manager/managerInbox');
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    whoSelected(guests, hosts, inbox) {
      this.navItemSelected.guests = guests;
      this.navItemSelected.hosts = hosts;
      this.navItemSelected.inbox = inbox;
    }
  },
  computed: {
    getCurrUser() {
      return this.$store.getters.currUser;
    }
  },
  watch: {
    getCurrUser(newVal, oldVal) {
      this.$router.push('/userProfile/' + this.getCurrUser._id + '/manager/managerInbox');
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
}
.bg-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 25vh;
  background-image: url("../../public/img/schedule-manager.jpg");
  background-size: cover;
  background-position: center center;
  .nav-container {
    display: flex;
    align-items: center;
    // margin-bottom: 5px;
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
  .isSelected {
    background-color: rgb(94, 94, 94);
  }
}
</style>
