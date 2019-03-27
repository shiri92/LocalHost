<template>
  <section class="login">
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
  name: "log-in",
  data() {
    return {
      credentials: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    tryLogin() {
      this.$store
        .dispatch({ type: "login", credentials: this.credentials })
        .then(() => {
          this.$router.push(this.$route.path);
          this.$emit("loginOff");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  z-index: 10;
  position: fixed;
  top: 40%;
  left: 50%;
  width: 30%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transform: translate(-50%, -50%);
  border-radius: 10px;
  background-color: white;
  color: rgb(62, 62, 62);
  .top {
    padding: 10px 30px 10px 30px;
    h1 {
      font-size: 1.5rem;
      margin: 0;
    }
    span {
      cursor: pointer;
      font-size: 2.5rem;
      color: rgb(175, 169, 169);
    }
  }
  .content {
    padding: 30px 30px 0 30px;
  }
}

@media (max-width: 768px) {
  .login {
    width: 50%;
    .content {
      padding: 30px 25px 0 25px;
    }
  }
}

@media (max-width: 568px) {
  .login {
    width: 80%;
  }
}

hr {
  margin: 0;
}

.input {
  margin: 0 30px 30px 30px;
}
.btn-container {
  margin: 30px;
  .btn-login {
    justify-self: center;
    width: 100px;
    background-color: rgb(29, 47, 206);
  }
}
</style>
