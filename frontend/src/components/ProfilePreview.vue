<template>
  <li class="single-profile">
    <div>
        {{profile.name}}
        <img :src="profile.imgUrl" alt="">
        <!-- <img src="/img/profile-images/profile1.png" alt=""> -->
    </div> 
    
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

<style>
    .single-profile {
        display: flex;
        flex-direction: column;
        background-color: cadetblue;
        padding: 5px;
        justify-content: space-between;
        min-width: 100px;
        min-height: 100px;
    }
</style>