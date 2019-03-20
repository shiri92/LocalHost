<template>
  <section>
    <h1>hi {{getCurrUser}}</h1>
  </section>
</template>

<script>
export default {
  name: 'userDetails',
  created() {
    let userId = this.$route.params.userId;
    this.$store.dispatch({ type: "loadUser", userId });
  },
  computed: {
    getCurrUser() {
      return this.$store.getters.user;
    }
  },
  // watch: {
  //   "$route.params.userId": function (userId) {
  //     this.$store.dispatch({ type: "loadUser", userId });
  //   }
  // }
};
</script>

<style>
</style>
