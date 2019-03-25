<template>
  <section class="user-window flex flex-col align-center">
    <div class="top flex">
      <img class="user-img" :src="getLoggedUser.imgUrl">
      <div class="details">
        <div class="name">{{getLoggedUser.firstName}} {{getLoggedUser.lastName}}</div>
        <div>{{getLoggedUser.email}}</div>
        <el-button @click="goToInbox" class="inbox-btn">Inbox</el-button>
      </div>
    </div>
    <div class="bottom flex space-between">
      <el-button class="profile-btn" @click="goToProfile">Profile</el-button>
      <el-button class="logout-btn" @click="logOut">Log out</el-button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'user-window',
  data() {
    return {
    }
  },
  computed: {
    getLoggedUser() {
      return this.$store.getters.loggedUser;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch({ type: 'logout' });
      this.$emit('closeWindow');
      this.$router.push('/');
    },
    goToProfile() {
      this.$router.push('/userProfile/' + this.getLoggedUser._id);
      this.$emit('closeWindow');
    },
    goToInbox() {
      this.$router.push('/userProfile/' + this.getLoggedUser._id + '/inbox');
    }
  },
}
</script>

<style lang="scss" scoped>
.user-window {
  position: fixed;
  top: 70px;
  right: 60px;
  background-color: white;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.4);
  z-index: 1;
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
}
</style>


