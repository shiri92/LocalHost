<template>
  <section class="flex align-center flex-row" v-if="getUser">
    <div class="side-profile">
      <img class="profile-img" :src="getUser.imgUrl" alt>
      <div class="profile-name">{{getUser.firstName}} {{getUser.lastName}}</div>
      <div class="profile-loc">{{getUser.city}}, {{getUser.country}}</div>
      <hr>
      <input name="file" id="file" class="input-file" type="file" @change="updateImg">
      <label for="file">Choose a file</label>
    </div>
    <div class="edit-form form-container flex align-center flex-col">
      <h2>{{getUser.firstName}} {{getUser.lastName}}</h2>
      <form class="form" action>
        <div class="about-edit">
          <div class="form-item flex space-between">
            <label for="hosting">Hosting Availability:&nbsp;</label>
            <select class="form-input" v-model="getUser.isHosting">
              <option value="true">Accepting Guests</option>
              <option value="false">Not Accepting Guests</option>
            </select>
          </div>
          <hr>
          <div>
            <div class="form-item flex space-between">
              <label for="language">Language:&nbsp;</label>
              <input
                class="form-input"
                type="text"
                placeholder="Enter languages"
                v-model="getUser.language"
              >
            </div>
            <div class="form-item flex space-between">
              <label for="country">Country:&nbsp;</label>
              <input
                class="form-input"
                type="text"
                placeholder="Enter country"
                v-model="getUser.country"
              >
            </div>
            <div class="form-item flex space-between">
              <label for="city">City:&nbsp;</label>
              <input class="form-input" type="text" placeholder="Enter city" v-model="getUser.city">
            </div>
            <div class="form-item flex space-between">
              <label for="occupation">Occupation:&nbsp;</label>
              <input class="form-input" type="text" placeholder="Enter occupation">
            </div>
            <div class="form-item flex space-between">
              <label for="education">Education:&nbsp;</label>
              <input class="form-input" type="text" placeholder="Enter education">
            </div>
            <div class="form-item flex space-between">
              <label for="gender">Gender:&nbsp;</label>
              <select class="form-input" v-model="getUser.gender">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
        </div>
        <hr>
        <div class="home-edit">
          <div class="form-item flex space-between">
            <label for="room">Max Number of Guests:&nbsp;</label>
            <select class="form-input">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <div class="form-item flex space-between">
            <label for="Miscellaneous">
              Miscellaneous
              :&nbsp;
            </label>
            <ul class="clean-list">
              <li>
                <input type="checkbox" value="pet"> I Have a Pet
              </li>
              <li>
                <input type="checkbox" value="kids"> Kids at Home
              </li>
              <li>
                <input type="checkbox" value="smoking"> Smoking at Home
              </li>
            </ul>
          </div>
        </div>
        <hr>
        <el-button @click="onSave" type="success" class="el-btn el-btn-success">Save</el-button>
        <el-button type="success" plain>Cancel</el-button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: 'edit-profile',
  data() {
    return {
      selectedFile: null
    };
  },
  created() {
    let userId = this.$route.params.userId;
    this.$store.dispatch({ type: "loadUser", userId })
      .then()
  },
  computed: {
    getUser() {
      return this.$store.getters.currUser;
    }
  },
  methods: {
    async updateImg(ev) {
      let { userId } = this.$route.params;
      let imgUrl = await this.$store.dispatch({ type: 'uploadProfileImg', imgFile: ev.target.files[0] });
      await this.$store.dispatch({ type: 'updateUserImg', imgUrl: imgUrl, userId });
    },
    onSave() {

    }
  }
};
</script>

<style lang="scss" scoped>
.side-profile {
  width: 30vw;
  max-width: 320px;
  min-width: 260px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.15);
  height: 80vh;
  margin: 5px 15px;
  background-color: white;
  padding: 15px;
  text-align: center;
  .profile-img {
    width: 100%;
    max-width: 225px;
    height: 40%;
    max-height: 225px;
    border-radius: 50%;
    box-shadow: 2px 2px 15px -1px rgba(0, 0, 0, 0.75);
    margin-bottom: 15px;
  }
  .profile-name {
    font-size: 1.5em;
  }
  hr {
    margin: 20px;
  }
  .input-file {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
  .input-file + label {
    font-size: 1.25em;
    font-weight: 700;
    color: white;
    background-color: black;
    display: inline-block;
    cursor: pointer;
  }
  .input-file:focus + label,
  .input-file + label:hover {
    background-color: red;
    outline: 1px dotted #000;
    outline: -webkit-focus-ring-color auto 5px;
  }
}

.edit-form {
  flex-grow: 1;
  .form {
    background-color: #fff;
    padding: 20px;
    width: 90%;
    margin: 10px 10px 0 0;
    border-radius: 5px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.15);
    .form-item {
      margin-bottom: 5px;
      font-weight: bold;
      .form-input {
        width: 200px;
        padding: 5px;
        border: 1px solid burlywood;
        border-radius: 5px;
      }
      .form-input:hover {
        border: 1px solid black;
      }
      .form-input:focus {
        background-color: lightgrey;
      }
    }
  }
}
</style>