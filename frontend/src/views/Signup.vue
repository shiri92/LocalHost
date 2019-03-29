<template>
  <section class="signup flex flex-col">
    <div class="logo">
      <router-link to="/">
        <img src="../../public/img/logo/logo.png" alt>
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
              <b-form-input type="email" v-model="form.fName" required/>
            </b-form-group>

            <b-form-group class="small-input" label="Last Name:">
              <b-form-input type="email" v-model="form.lName" required/>
            </b-form-group>
          </div>

          <b-form-group label="Email address:">
            <b-form-input type="email" v-model="form.email" required/>
          </b-form-group>

          <b-form-group label="Password:">
            <b-form-input type="password" v-model="form.password" required/>
          </b-form-group>

          <button
            class="btn signup-btn"
            style="margin-top: 12px;"
            @click="next"
          >Next Step</button>
        </b-form>

        <b-form v-if="active === 1" class="flex flex-col">
          <div class="bday-container">
            <label>Birthday:</label>
            <div class="selects-container flex space-between">
              <el-select class="bday-selsct" v-model="form.birthdate.day" placeholder="Day">
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
          <el-select class="gender-select" v-model="form.gender" placeholder="Gender">
            <el-option v-for="gender in genders" :key="gender" :value="gender">{{gender}}</el-option>
          </el-select>

          <label>Location:</label>
          <el-autocomplete
            @input="setAddres"
            v-model="searchWord"
            :fetch-suggestions="querySearchAsync"
          ></el-autocomplete>

          <div class="btns-container flex">
            <button
              class="btn signup-btn"
              style="margin-top: 12px;"
              @click.native="stepBack"
            >Previous Step</button>
            <button
              class="btn signup-btn"
              style="margin-top: 12px;"
              @click="next"
            >Sign Up</button>
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
        gender: '',
        birthdate: { day: "", month: "", year: "" },
        address: {}
      },
      genders: ["Male", "Female", "Other"],
      searchWord: ""
    };
  },

  methods: {
    next() {
      // if (!this.checkForm()) return;
      if (this.active === 1) {
        this.$store
          .dispatch({ type: "signup", credentials: this.form })
          .then(() => {
            console.log(this.getLoggedUser);
            this.$router.push("/userProfile/" + this.getLoggedUser._id)
          });
      }
      if (this.active++ > 1) this.active = 0;
    },
    querySearchAsync(queryString, cb) {
      if (this.searchWord) {
        this.$store
          .dispatch({ type: "loadCities", searchWord: this.searchWord })
          .then(cities => {
            var results = cities.map(city => {
              return { value: city.name + ", " + city.country };
            });
            cb(results);
          });
      }
    },
    setAddres(ev) {
      let idx = ev.indexOf(",");
      let currCity = ev.substr(0, idx);
      let currCountry = ev.substr(idx + 2, ev.length - 1);
      this.form.address = { city: currCity, country: currCountry };
    },
    stepBack() {
      this.active = 0;
    },
    // checkForm(e) {
    //   if ((this.form.fName && this.form.lName && this.form.email && this.form.password) || (this.form.birthdate)) return true;
    //   else return false;
    // }
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
.logo {
  width: 155px;
  height: 35px;
  margin-left: 5px;
  img {
    width: 100%;
    height: 100%;
  }
}

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
  margin-top: 40px;
  margin-bottom: 40px;
  border: 1px solid rgb(199, 193, 193);
  border-radius: 3px;
  text-align: left;
  background-color: #fff;
  opacity: 0.9;
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
