<template>
  <section class="edit-section flex justify-center" v-if="user">
    <div class="side-profile">
      <img class="profile-img" :src="getLoggedUser.imgUrl" alt>
      <div class="profile-name">{{user.firstName}} {{user.lastName}}</div>
      <div
        class="profile-loc"
      >{{(user.address.city) ? user.address.city + ',' : ''}} {{user.address.country}}</div>
      <hr>
      <input name="file" id="file" class="input-file" type="file" @change="updateImg">
      <label for="file">Upload Picture</label>
    </div>
    <div class="edit-form form-container flex align-center flex-col">
      <form class="form" action>
        <h2>{{user.firstName}} {{user.lastName}}</h2>
        <div class="about-edit">
          <div class="form-item flex space-between">
            <label for="hosting">Hosting Availability:&nbsp;</label>
            <select class="form-input" v-model="user.isHosting">
              <option :value="true">Accepting Guests</option>
              <option :value="false">Not Accepting Guests</option>
            </select>
          </div>
          <hr>
          <div>
            <div class="form-item flex space-between">
              <label for="language">Language/s:&nbsp;</label>
              <input class="form-input" v-model="user.languages" list="languages" name="language">
              <datalist id="languages" multiple size="5">
                <option
                  @select="user.languages += lang"
                  v-for="(lang, idx) in languages"
                  :value="lang.name"
                  :key="idx"
                >{{lang.name}}</option>
              </datalist>
            </div>

            <div class="form-item flex space-between">
              <label>Address:&nbsp;</label>
              <gmap-autocomplete @place_changed="setAddres" class="form-input"></gmap-autocomplete>
            </div>

            <div class="form-item flex space-between">
              <label for="occupation">Occupation:&nbsp;</label>
              <input
                class="form-input"
                type="text"
                placeholder="Enter occupation"
                v-model="user.occupation"
              >
            </div>
            <div class="form-item flex space-between">
              <label for="education">Education:&nbsp;</label>
              <input
                class="form-input"
                type="text"
                placeholder="Enter education"
                v-model="user.education"
              >
            </div>
            <div class="form-item flex space-between">
              <label for="gender">Gender:&nbsp;</label>
              <select class="form-input" v-model="user.gender">
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
            <select class="form-input" v-model="user.placeDetails.guestCapacity">
              <option v-for="num in 10" :value="num" :key="num">{{num}}</option>
            </select>
          </div>
          <div class="form-item flex space-between">
            <label for="room">Gender preference:&nbsp;</label>
            <select class="form-input" v-model="user.placeDetails.guestGenderPref">
              <option value="Any">Any</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div class="form-item flex space-between">
            <label for="Miscellaneous">
              Miscellaneous
              :&nbsp;
            </label>
            <ul class="clean-list">
              <li>
                <input
                  type="checkbox"
                  value="pet"
                  :checked="user.placeDetails.isPetFriendly"
                  v-model="user.placeDetails.isPetFriendly"
                > Pet Friendly
              </li>
              <li>
                <input type="checkbox" value="kids" v-model="user.placeDetails.isKidFriendly"> Kid Friendly
              </li>
              <li>
                <input type="checkbox" value="smoking" v-model="user.placeDetails.isSmokingAllowed"> Smoking Allowed
              </li>
              <li>
                <input
                  type="checkbox"
                  value="disabled"
                  v-model="user.placeDetails.isDisabledAccessible"
                > Disabled accessible
              </li>
            </ul>
          </div>
          <div class="form-item flex space-between">
            <label for="room">How many pets?:&nbsp;</label>
            <select class="form-input" v-model="user.placeDetails.pets">
              <option value="0">None</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="More Than 3">More than 3</option>
            </select>
          </div>
          <div class="form-item flex space-between">
            <label for="room">How many kids?:&nbsp;</label>
            <select class="form-input" v-model="user.placeDetails.children">
              <option value="0">None</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="More Than 3">More than 3</option>
            </select>
          </div>
        </div>
        <hr>
        <button @click="onSave" class="btn">Save</button>
        <button @click="$router.push('/userProfile/' + user._id)" class="btn btn-empty">Cancel</button>
      </form>
    </div>
  </section>
</template>

<script>
var langs = require("langs");

export default {
  name: "edit-profile",
  data() {
    return {
      user: null,
      searchWord: '',
    };
  },
  created() {
    this.languages = langs.all();
    this.user = JSON.parse(JSON.stringify(this.getLoggedUser));
  },
  computed: {
    getLoggedUser() {
      return this.$store.getters.loggedUser;
    }
  },
  watch: {
    getLoggedUser(newVal, oldVal) {
      this.user = JSON.parse(JSON.stringify(this.getLoggedUser));
    }
  },
  methods: {
    setAddres(ev) {
      let str = ev.formatted_address;
      let idx = str.indexOf(',');
      if (idx !== -1) {
        let currCity = str.substr(0, idx);
        let currCountry = str.substr(idx + 2, str.length - 1);
        this.user.address = { city: currCity, country: currCountry };
      } else {
        let currCity = '';
        let currCountry = str;
        this.user.address = { city: currCity, country: currCountry };
      }
    },
    async updateImg(ev) {
      let targetId = this.$route.params.userId;
      let imgFile = ev.target.files[0];
      let imgName = `${this.getLoggedUser.firstName}-${this.getLoggedUser.lastName}`.toLowerCase();
      let imgPath = `profile-imgs/${imgName}/${imgName}`
      await this.$store.dispatch({ type: 'updatePortrait', imgFile, imgPath, targetId });
    },
    onSave() {
      this.$store.dispatch({ type: 'updateLoggedUser', user: this.user })
        .then(() => this.$router.push('/userProfile/' + this.user._id))
    },
  },
};
</script>

<style lang="scss" scoped>
.edit-section {
  flex-direction: row;
  .side-profile {
    width: 30vw;
    max-width: 320px;
    min-width: 260px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.15);
    margin: 5px 15px;
    background-color: white;
    padding: 15px;
    text-align: center;
    border-radius: 5px;
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
      border-radius: 15px;
      padding: 5px;
      font-size: 1.25em;
      font-weight: 700;
      color: white;
      background-color: rgb(60, 60, 60);
      display: inline-block;
      cursor: pointer;
      transition: 0.5s;
    }
    .input-file:focus + label,
    .input-file + label:hover {
      transform: scale(1.1, 1.1);
      // box-shadow: inset 0 0px 20px rgb(151, 226, 240),
      //   0 0px 5px rgb(151, 226, 240);
      // outline: 1px dotted #000;
    }
  }

  .edit-form {
    flex-grow: 1;
    margin: 5px 15px;
    .form {
      background-color: #fff;
      padding: 20px;
      width: 100%;
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
        .form-autocomplete {
          width: 200px;
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
      .btn {
        margin-right: 5px;
      }
    }
  }
}
@media (max-width: 568px) {
  .edit-section {
    flex-direction: column;
    .side-profile {
      width: unset;
      max-width: unset;
    }
  }
}
</style>