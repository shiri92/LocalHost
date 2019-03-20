<template>
  <li class="single-profile flex flex-col space-between">
        <div><img :src="profile.info.imgUrl" alt=""></div>
        <div>{{profile.info.firstName}}, {{profile.info.lastName}}</div>  
    
    <!-- <router-link :to="'/profile-app/profile-edit/' + profile._id">
      <button>Edit</button>
    </router-link>
    <button @click="deleteProfile">Delete</button> -->
  </li>
</template>

<script>
export default {
  props: ["profile"],
  methods: {
    // deleteProfile() {
    //   this.$store.dispatch({ type: "deleteProfile", id: this.profile._id });
    // }
  }
};
</script>

<style lang="scss" scoped>
    .single-profile {
        background-color: floralwhite;
        justify-content: space-between;
        width: 200px;
        height: 300px;
        border-radius: 5px;
        padding-bottom: 5px;
    }

    img {
        width: 100%;
        height: 240px;
        border-radius: 5px 5px 0 0;
    }
</style>
