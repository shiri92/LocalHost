<template>
  <section class="login">
    <div class="top flex space-between align-center">
      <H1>Login</H1>
      <span @click="$emit('loginOff')">&times;</span>
      <!-- <font-awesome-icon icon="window-close" @click="$emit('loginOff')"/> -->
    </div>
    <hr>
    <div class="content flex flex-col">
      <el-form :inline="false" :model="credentials" class="demo-form-inline">
        <!-- <el-form-item label="Email" required>
          <el-input required v-model="credentials.email" placeholder="Enter Username..."></el-input>
        </el-form-item>-->

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

        <!-- <el-form-item label="Password" required>
          <el-input required v-model="credentials.password" placeholder="Enter Password..."></el-input>
        </el-form-item>-->

        <!-- <el-form-item>
          <el-button class="btn-login" type="warning" @click="tryLogin">Login</el-button>
        </el-form-item>-->

        <div class="btn-container flex justify-center">
          <el-button class="btn-login" type="warning" @click="tryLogin">Login</el-button>
        </div>

        <div v-if="getLoggedUser">{{getLoggedUser.firstName}} {{getLoggedUser.lastName}}</div>
      </el-form>
    </div>
  </section>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    tryLogin() {
      this.$store.dispatch({ type: 'login', credentials: this.credentials })
        .then(() => {
          this.$router.push(this.$route.path);
          this.$emit('loginOff');
        })
    }
  },
  computed: {
    getLoggedUser() {
      return this.$store.getters.loggedUser;
    }
  }

}
</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  top: 40%;
  left: 50%;
  width: 30%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transform: translate(-50%, -50%);
  border-radius: 10px;
  background-color: white;
  color: rgb(62, 62, 62);
}

.top {
  padding: 10px 30px 10px 30px;
}

h1 {
  font-size: 1.5rem;
  margin: 0;
}

hr {
  margin: 0;
}

span {
  cursor: pointer;
  font-size: 2.5rem;
  color: rgb(175, 169, 169);
}

.content {
  padding: 30px 30px 0 30px;
}

.input {
  margin: 0 30px 30px 30px;
}

.btn-container {
  margin: 30px;
}

.btn-login {
  justify-self: center;
  width: 30%;
}
</style>
