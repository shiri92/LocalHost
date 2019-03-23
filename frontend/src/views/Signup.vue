<template>
  <section class="signup">
    <h1>Sign Up</h1>
    <el-steps class="steps" :active="active" finish-status="success">
      <el-step title="Step 1"></el-step>
      <el-step title="Step 2"></el-step>
    </el-steps>
    <div class="form">
      <b-form class="flex flex-col" @submit="onSubmit">
        <div class="name-container flex space-between">
          <b-form-group
            class="small-input"
            id="exampleInputGroup1"
            label="First Name:"
            label-for="exampleInput1"
          >
            <b-form-input id="exampleInput1" type="email" v-model="form.fName" required/>
          </b-form-group>

          <b-form-group
            class="small-input"
            id="exampleInputGroup1"
            label="Last Name:"
            label-for="exampleInput1"
          >
            <b-form-input id="exampleInput1" type="email" v-model="form.lName" required/>
          </b-form-group>
        </div>

        <b-form-group id="exampleInputGroup1" label="Email address:" label-for="exampleInput1">
          <b-form-input id="exampleInput1" type="email" v-model="form.email" required/>
        </b-form-group>

        <b-form-group id="exampleInputGroup2" label="Password:" label-for="exampleInput2">
          <b-form-input id="exampleInput2" type="password" v-model="form.password" required/>
        </b-form-group>

        <el-button
          class="signup-btn"
          style="margin-top: 12px;"
          @click="next"
          type="warning"
        >{{(active === 2) ? 'Sign Up' : 'Nest Step'}}</el-button>
      </b-form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      form: {
        fName: '',
        lName: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    next() {
      if (this.active === 2) {
        this.$store.dispatch({ type: 'signup', credentials: this.form })

      }
      if (this.active++ > 2) this.active = 0;
    },
    onSubmit() {
      console.log('hey')
    }
  }

}
</script>

<style lang="scss" scoped>
.signup {
  padding: 20px;
  background-color: white;
}
form {
  max-width: 60%;
  margin: 0 auto;
  padding: 100px 150px 100px 150px;
  border: 1px solid rgb(199, 193, 193);
  text-align: left;
}

.steps {
  margin: 0 auto;
  max-width: 40%;
  display: flex;
}

.small-input {
  width: 45%;
}

.signup-btn {
  width: 30%;
  align-self: center;
}
</style>
