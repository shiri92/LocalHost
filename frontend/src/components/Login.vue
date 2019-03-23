<template>
  <section class="signup">
    <H1>Login</H1>
    <el-form :inline="false" :model="formInline" class="demo-form-inline">
      <el-form-item label="Username" required>
        <el-input required v-model="credentials.username" placeholder="Enter Username..."></el-input>
      </el-form-item>
      <el-form-item label="Password" required>
        <el-input required v-model="credentials.password" placeholder="Enter Password..."></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Login</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      credentials: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  }

}
</script>

<style lang="scss" scoped>
section {
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 30px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 10px;
  background-color: rgb(62, 62, 62);
}
h1 {
  color: white;
}
</style>
