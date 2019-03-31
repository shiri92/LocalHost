<template>
  <section class="signup flex flex-col">
    <div class="logo">
      <router-link to="/">
        <img src="https://res.cloudinary.com/dcl4oabi3/image/upload/v1553958499/logo/logo.png" alt>
      </router-link>
    </div>
    <h1 class="title">Sign Up</h1>
    <div class="forms-container">
      <el-steps class="steps" :active="active" finish-status="success">
        <el-step class="step" @click.native="stepBack" title="Step 1"></el-step>
        <el-step class="step" title="Step 2"></el-step>
      </el-steps>
      <div class="form">
        <b-form v-if="active === 0" class="flex flex-col">
          <div class="name-container flex space-between">
            <b-form-group class="small-input" label="First Name:">
              <b-form-input type="text" v-model="form.fName" required/>
            </b-form-group>

            <b-form-group class="small-input" label="Last Name:">
              <b-form-input type="text" v-model="form.lName" required/>
            </b-form-group>
          </div>

          <b-form-group label="Email address:">
            <b-form-input type="email" v-model="form.email" required/>
          </b-form-group>

          <b-form-group label="Password:">
            <b-form-input type="password" v-model="form.password" required/>
          </b-form-group>

          <button class="btn signup-btn" style="margin-top: 12px;" @click="next">Next Step</button>
        </b-form>

        <b-form v-if="active === 1" class="flex flex-col">
          <div class="bday-container">
            <label>Birthday:</label>
            <div class="selects-container flex space-between">
              <el-select
                class="bday-selsct"
                v-model="form.birthdate.day"
                placeholder="Day"
                required
              >
                <el-option v-for="num in 31" :key="num" :value="num">{{num}}</el-option>
              </el-select>
              <el-select class="bday-selsct" v-model="form.birthdate.month" placeholder="Month">
                <el-option v-for="num in 12" :key="num" :value="num">{{num}}</el-option>
              </el-select>
              <el-select class="bday-selsct" v-model="form.birthdate.year" placeholder="Year">
                <el-option v-for="num in 100" :key="num" :value="num + 1920">{{num + 1920}}</el-option>
              </el-select>
            </div>
          </div>

          <label>Gender:</label>
          <el-select class="gender-select" v-model="form.gender" placeholder="Gender" required>
            <el-option value>Select Gender</el-option>
            <el-option v-for="gender in genders" :key="gender" :value="gender">{{gender}}</el-option>
          </el-select>

          <label>Location:</label>
          <gmap-autocomplete @place_changed="setAddres" class="google-search"></gmap-autocomplete>

          <div class="btns-container flex">
            <button class="btn signup-btn" style="margin-top: 12px;" @click="stepBack">Previous Step</button>
            <button class="btn signup-btn" style="margin-top: 12px;" @click="next">Sign Up</button>
          </div>
        </b-form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "sign-up",
  data() {
    return {
      active: 0,
      form: {
        fName: "",
        lName: "",
        email: "",
        password: "",
        gender: "",
        birthdate: { day: "", month: "", year: "" },
        address: {}
      },
      genders: ["Male", "Female", "Other"],
      searchWord: ""
    };
  },

  methods: {
    next() {
      if (!this.checkForm()) return;

      if (this.active === 1) {
        if (!this.checkForm2()) return;

        this.$store
          .dispatch({ type: "signup", credentials: this.form })
          .then(() => {
            this.$router.push("/userProfile/" + this.getLoggedUser._id);
            const Toast = this.$swal.mixin({
              toast: true,
              position: "bottom-start",
              showConfirmButton: false,
              timer: 3000
            });

            Toast.fire({
              type: "success",
              title: `You Have Signed Up Successfully`
            });
          });
      }
      if (this.active++ > 1) this.active = 0;
    },
    setAddres(ev) {
      let idx = ev.formatted_address.indexOf(",");
      let currCity = ev.formatted_address.substr(0, idx);
      let currCountry = ev.formatted_address.substr(idx + 2, ev.length - 1);
      this.form.address = { city: currCity, country: currCountry };
    },
    stepBack() {
      this.active = 0;
    },
    checkForm() {
      return (
        this.form.fName &&
        this.form.lName &&
        this.form.email &&
        this.form.password
      );
    },
    checkForm2() {
      return (
        this.form.gender &&
        this.form.birthdate.day &&
        this.form.birthdate.month &&
        this.form.birthdate.year &&
        this.form.address
      );
    }
  },
  computed: {
    getLoggedUser() {
      return this.$store.getters.loggedUser;
    },
    getCities() {
      return this.$store.getters.cities;
    }
  }
};
</script>

<style lang="scss" scoped>
.signup {
  margin-top: -70px;
  background-color: white;
  color: black;
  font-weight: bold;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.95),
      rgba(0, 0, 0, 0.7)
    ),
    url("https://res.cloudinary.com/dcl4oabi3/image/upload/v1553566201/bg-imgs/signup.jpg");
  background-size: cover;
  height: 100vh;
  padding-top: 20px;
  .logo {
    width: 155px;
    height: 35px;
    margin-left: 5px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .title {
    align-self: center;
    color: white;
  }
}

@media (max-width: 700px) {
  .signup {
    padding-top: 10px;
  }
}
.steps {
  margin: 0 auto;
  max-width: 40%;
  .step {
    cursor: pointer;
  }
}

form {
  max-width: 60%;
  margin: 0 auto;
  padding: 80px 130px;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 1px solid rgb(199, 193, 193);
  border-radius: 3px;
  text-align: left;
  background-color: #fff;
  opacity: 0.9;
}

.google-search {
  padding-right: 30px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}

@media (max-width: 900px) {
  form {
    padding: 80px;
    max-width: 70%;
  }
}

@media (max-width: 700px) {
  form {
    max-width: 90%;
    padding: 20px;
    margin-top: 5px;
  }
  .name-container {
    flex-direction: column;
  }
}

@media (max-width: 360px) {
  .form-group {
    margin-bottom: 0.3rem;
  }
}

.small-input {
  width: 45%;
}

@media (max-width: 700px) {
  .small-input {
    width: 100%;
  }
}

.bday-container,
.gender-select {
  margin-bottom: 15px;
}

.btns-container {
  align-self: center;
}
.btn {
  // width: 130px;
  align-self: center;
  margin: 5px;
}

.bday-selsct {
  width: 30%;
}
</style>
