<template>
  <section class="review-form">
    <div class="top flex space-between align-center">
      <H1>Login</H1>
      <span @click="$emit('loginOff')">&times;</span>
    </div>
    <hr>
    <div class="content flex flex-col">
      <el-form :inline="false" :model="credentials" class="demo-form-inline flex flex-col">
        <b-form-group class="input" required>
          <b-form-input
            type="email"
            v-model="credentials.email"
            required
            placeholder="Enter Email..."
          />
        </b-form-group>

        <b-form-group class="input" required>
          <b-form-input
            type="password"
            v-model="credentials.password"
            required
            placeholder="Enter Password..."
          />
        </b-form-group>

        <div class="btn-container flex justify-center">
          <el-button class="btn-login" type="warning" @click="tryLogin">Log in</el-button>
        </div>
      </el-form>
    </div>
  </section>
</template>

<script>
export default {
  name: 'review-form',
  data() {
    return {

    }
  },
  methods: {

  },
}
</script>

<style lang="scss" scoped>
</style>
