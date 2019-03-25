<template>
  <section class="signup flex flex-col">
    <h1 class="title">Sign Up</h1>
    <div class="forms-container">
      <el-steps class="steps" :active="active" finish-status="success">
        <el-step class="step" @click="$router.push('/signup')" title="Step 1"></el-step>
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

          <el-button
            class="signup-btn"
            style="margin-top: 12px;"
            @click="next"
            type="warning"
          >Nest Step</el-button>
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
          <el-select class="gender-selsct" v-model="form.gender" placeholder="Gender">
            <el-option v-for="gender in genders" :key="gender" :value="gender">{{gender}}</el-option>
          </el-select>

          <label>Location:</label>
          <el-autocomplete
            @input="setAddres"
            v-model="searchWord"
            :fetch-suggestions="querySearchAsync"
          ></el-autocomplete>
          <el-button
            class="signup-btn"
            style="margin-top: 12px;"
            @click="next"
            type="warning"
          >Sign Up</el-button>
        </b-form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'sign-up',
  data() {
    return {
      active: 0,
      form: {
        fName: '',
        lName: '',
        email: '',
        password: '',
        birthdate: { day: '', month: '', year: '' },
        city: ''
      },
      genders: ['Male', 'Female', 'Other'],
      searchWord: '',
    }
  },

  methods: {
    next() {
      if (this.active === 1) {
        this.$store.dispatch({ type: 'signup', credentials: this.form })
          .then(() => this.$router.push('/userProfile/' + this.getLoggedUser._id));
      }
      if (this.active++ > 1) this.active = 0;
    },
    querySearchAsync(queryString, cb) {
      if (this.searchWord) {
        this.$store.dispatch({ type: 'loadCities', searchWord: this.searchWord })
          .then(cities => {
            var results = cities.map(city => {
              return { value: city.name + ', ' + city.country }
            });
            cb(results);
          })
      }
    },
    setAddres(ev) {
      this.form.city = ev;
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
}
</script>

<style lang="scss" scoped>
.signup {
  background-color: white;
  color: black;
  font-weight: bold;
}

.title {
  align-self: center;
  margin-bottom: 20px;
}

form {
  max-width: 60%;
  margin: 0 auto;
  padding: 80px 130px 80px 130px;
  margin-top: 40px;
  border: 1px solid rgb(199, 193, 193);
  border-radius: 3px;
  text-align: left;
}

.steps {
  margin: 0 auto;
  max-width: 40%;
}

.step {
  cursor: pointer;
}

.small-input {
  width: 45%;
}

.bday-container,
.gender-selsct {
  margin-bottom: 15px;
}

.el-button {
  width: 30%;
  align-self: center;
}

.bday-selsct {
  width: 30%;
}
</style>
