<template>
  <section class="login">
    <div class="top flex space-between align-center justify-center">
      <h1>Sign In</h1>
      <span @click="$emit('loginOff')">&times;</span>
    </div>
    <hr>
    <div class="content flex flex-col">
      <el-form :inline="false" :model="credentials" class="demo-form-inline flex flex-col">
        <b-form-group class="input" required>
          <font-awesome-icon class="input-icon" icon="user"/>
          <b-form-input
            type="email"
            v-model="credentials.email"
            required
            placeholder="Enter Email..."
          />
        </b-form-group>

        <b-form-group class="input" required>
          <font-awesome-icon class="input-icon" icon="lock"/>
          <b-form-input
            type="password"
            v-model="credentials.password"
            placeholder="Enter Password..."
            required
          />
        </b-form-group>

        <div class="btn-container flex justify-center flex-col">
          <button class="btn btn-login" @click="tryLogin">SIGN IN</button>
          <p>
            Not a Member?
            <router-link to="/signup">
              <span class="signup-btn" @click="$emit('loginOff')">Sign Up</span>
            </router-link>
          </p>
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
      if (!this.checkForm) return;
      this.$store
        .dispatch({ type: "login", credentials: this.credentials })
        .then(() => {
          this.$router.push(this.$route.path);
          this.$emit("loginOff");
        });
    },
    checkForm: function (e) {
      if (this.credentials.email && this.credentials.password) {
        return true;
      }
      e.preventDefault();
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
    padding: 15px 30px;
    background-color: #1dbf73;
    border-radius: 5px 5px 0 0;
    h1 {
      font-size: 1.5rem;
      margin: 0;
      color: white;
    }
    span {
      cursor: pointer;
      font-size: 2.5rem;
      color: #fff;
      position: absolute;
      right: 10px;
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

@media (max-width: 400px) {
  .login {
    width: 90%;
  }
}

hr {
  margin: 0;
}

.input {
  margin: 0 30px 30px 30px;
  position: relative;
  .input-icon {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
.btn-container {
  margin: 0 30px 30px 30px;
  .btn-login {
    width: 100%;
    padding: 12px 20px;
    font-size: 18px;
    line-height: 1;
    border: 1px;
    color: #fff;
  }
  p {
    text-align: center;
    .signup-btn {
      color: blue;
      text-decoration: underline;
    }
  }
}
</style>
