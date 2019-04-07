<template>
  <section
    class="user-window flex flex-col align-center"
    data-aos="fade-down"
    data-aos-duration="1200"
  >
    <div class="top flex">
      <img class="user-img" :style="'background-image: url(' + getLoggedUser.imgUrl +')'">
      <div class="details">
        <div class="name">{{getLoggedUser.firstName}} {{getLoggedUser.lastName}}</div>
        <div>{{getLoggedUser.email}}</div>
        <button @click="goToManager" class="btn inbox-btn">Manager</button>
      </div>
    </div>
    <div class="bottom flex space-between">
      <button class="btn profile-btn" @click="goToProfile">Profile</button>
      <button class="btn logout-btn" @click="logOut">Log out</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "user-window",
  data() {
    return {};
  },
  computed: {
    getLoggedUser() {
      return this.$store.getters.loggedUser;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch({ type: "logout" });
      this.$emit("closeWindow");
      this.$router.push("/");
    },
    goToProfile() {
      this.$router.push("/userProfile/" + this.getLoggedUser._id);
      this.$emit("closeWindow");
    },
    goToManager() {
      this.$emit("closeWindow");
      this.$router.push("/userProfile/" + this.getLoggedUser._id + '/manager/managerInbox');
    }
  }
};
</script>

<style lang="scss" scoped>
.user-window {
  position: fixed;
  top: 70px;
  right: 5px;
  background-color: white;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.4);
  z-index: 1;
}
@media (max-width: 568px) {
  .user-window {
    right: 2px;
  }
}
.top {
  margin: 20px;
}
.name {
  font-weight: bold;
}
.user-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-size: cover;
}
.bottom {
  width: 100%;
  background-color: rgb(207, 204, 204);
  border: 1px solid rgb(185, 183, 183);
}
.details {
  margin-left: 20px;
  text-align: left;
}
.logout-btn,
.profile-btn,
.inbox-btn {
  margin: 20px;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  line-height: 1;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
}
</style>