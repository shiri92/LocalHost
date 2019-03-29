<template>
  <section class="profile-container flex flex-col justify-center" v-if="currUser">
    <carousel
      class="carousel flex justify-center"
      :per-page="3"
      :mouse-drag="true"
      :autoplay="true"
      :loop="true"
      :autoplayTimeout="4000"
      :perPageCustom="[[300, 1], [700, 2], [1200, 3]]"
      :speed="1000"
      :paginationEnabled="false"
    >
      <slide v-for="(img, idx) in currUser.pictures" :key="idx">
        <div class="carousel-img" :style="'background-image: url(' + img + ')'"></div>
      </slide>
    </carousel>
    <div class="profile-container flex justify-center">
      <div class="side-profile">
        <div
          class="profile-img"
          :style="'background-image: url(' + currUser.imgUrl + '); text-align: center;'"
        ></div>
        <div class="profile-name">{{currUser.firstName}} {{currUser.lastName}}</div>
        <div class="profile-loc">{{currUser.address.city}}, {{currUser.address.country}}</div>
        <hr>
        <div class="flex justify-center align-center flex-col">
          <div>{{(currUser.isHosting) ? "Accepting Guests" : "Not Accepting Guests"}}</div>
          <div class="flex flex-col" v-if="(!loggedUser) || (loggedUser._id !== currUser._id)">
            <div>
              <button v-if="currUser.isHosting" @click="requestFormOn" class="btn">
                <font-awesome-icon icon="couch"/>&nbsp;Send Request!
              </button>
            </div>
          </div>
          <div v-else class="flex flex-col">
            <router-link :to="'/userProfile/' + currUser._id + '/edit'" :key="currUser._id">
              <button class="btn">Edit My Profile</button>
            </router-link>
            <router-link :to="'/userProfile/' + currUser._id + '/inbox'">
              <button class="btn">My Inbox</button>
            </router-link>
          </div>
        </div>
      </div>
      <div class="main-desc">
        <div class="cmps" id="cmps">
          <nav class="main-desc-nav" :class="{display: isNavInDisplay}">
            <!-- ON DESKTOP -->
            <div class="profile-nav flex flex-row justify-center" v-if="window.width > 768">
              <a
                class="nav-item"
                href="#"
                v-scroll-to="{ el: '#about', container: '#cmps'}"
              >Overview</a>
              <a class="nav-item" href="#" v-scroll-to="{ el: '#home', container: '#cmps'}">Home</a>
              <a class="nav-item" href="#" v-scroll-to="{ el: '#pics', container: '#cmps'}">Pictures</a>
              <a
                class="nav-item"
                href="#"
                v-scroll-to="{ el: '#references', container: '#cmps'}"
              >References</a>
            </div>
            <!-- ON MOBILE -->
            <div class="profile-nav flex flex-row justify-center" v-else>
              <a class="nav-item" href="#" v-scroll-to="{ el: '#about', container: 'body'}">Overview</a>
              <a class="nav-item" href="#" v-scroll-to="{ el: '#home', container: 'body'}">Home</a>
              <a class="nav-item" href="#" v-scroll-to="{ el: '#pics', container: 'body'}">Pictures</a>
              <a
                class="nav-item"
                href="#"
                v-scroll-to="{ el: '#references', container: 'body'}"
              >References</a>
            </div>
          </nav>
          <profile-about class="detail-section" :user="currUser" id="about"></profile-about>
          <profile-myHome class="detail-section" :pref="currUser.placeDetails" id="home"></profile-myHome>
          <profile-pictures class="detail-section" :user="currUser" id="pics"></profile-pictures>
          <profile-references
            class="detail-section"
            :user="currUser"
            :loggedUser="loggedUser"
            id="references"
          ></profile-references>
        </div>
      </div>
      <guest-request @requestOff="requestFormOff" v-if="showRequestForm" @sendRequest="sendRequest"></guest-request>
    </div>
  </section>
</template>

<script>
import ProfileAbout from "../components/ProfileAbout.vue";
import ProfileMyHome from "../components/ProfileMyHome.vue";
import ProfilePictures from "../components/ProfilePictures.vue";
import ProfileReferences from "../components/ProfileReferences.vue";
import GuestRequest from "../components/GuestRequest.vue";
import { Carousel, Slide } from "vue-carousel";

export default {
  name: "user-profile",
  data() {
    return {
      isNavInDisplay: false,
      showRequestForm: false,
      window: {
        width: 0,
        height: 0
      }
    };
  },
  created() {
    let userId = this.$route.params.userId;
    this.$store.dispatch({ type: "loadUser", userId });

    var vm = this;
    var val = window.addEventListener("scroll", function(e) {
      var scrollPos = window.scrollY;
      if (scrollPos > 110) {
        vm.narrowNav(true);
      } else {
        vm.narrowNav(false);
      }
    });

    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  computed: {
    currUser() {
      return this.$store.getters.currUser;
    },
    loggedUser() {
      return this.$store.getters.loggedUser;
    }
  },
  methods: {
    narrowNav(state) {
      this.isNavInDisplay = state;
    },
    async sendRequest(requestInfo) {
      let request = {
        isAccepted: false,
        info: requestInfo,
        sender: {
          id: this.loggedUser._id,
          firstName: this.loggedUser.firstName,
          lastName: this.loggedUser.lastName
        },
        recipient: {
          id: this.currUser._id,
          firstName: this.currUser.firstName,
          lastName: this.currUser.lastName
        }
      };
      await this.$store.dispatch({ type: "addRequest", request: request });
      this.requestFormOff();
    },
    requestFormOn() {
      this.showRequestForm = true;
    },
    requestFormOff() {
      this.showRequestForm = false;
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  watch: {
    "$route.params.userId"(userId) {
      this.$store.dispatch({ type: "loadUser", userId });
    }
  },
  components: {
    ProfileAbout,
    ProfileMyHome,
    ProfilePictures,
    ProfileReferences,
    GuestRequest,
    Carousel,
    Slide
  }
};
</script>


<style lang="scss" scoped>
.profile-container {
  margin-top: 10px;
}
@media (max-width: 768px) {
  .profile-container {
    flex-direction: column;
    margin-top: 0;
  }
}
.carousel {
  padding: 15px;
  margin-top: 25px;
  .carousel-img {
    height: 30vh;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
}

.side-profile {
  width: 30vw;
  max-width: 320px;
  min-width: 260px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.15);
  margin: 5px 15px;
  background-color: white;
  padding: 15px;
  text-align: center;
  .profile-img {
    width: 225px;
    max-width: 225px;
    height: 225px;
    max-height: 225px;
    border-radius: 50%;
    box-shadow: 2px 2px 15px -1px rgba(0, 0, 0, 0.75);
    margin: auto;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .profile-name {
    font-size: 1.5em;
    margin-top: 15px;
  }
  hr {
    margin: 20px;
  }
  .btn {
    margin: 5px;
  }
}

@media (max-width: 768px) {
  .side-profile {
    max-width: unset;
    width: auto;
    margin: 0 15px;
  }
}

.main-desc {
  flex-grow: 1;
  margin: 5px 15px 5px 0;
  max-width: 1000px;
  overflow: hidden;
  position: relative;
  .main-desc-nav {
    background-color: #fff;
    position: absolute;
    width: 100%;
  }
  .display {
    top: 71px;
    left: 0;
    width: 100%;
    background-color: #fff;
    position: fixed;
    z-index: 0;
    transition: 0.3s;
  }
  .profile-nav {
    width: 100%;
    border-bottom: 2px solid rgba(0, 0, 0, 0.15);
    .nav-item {
      width: 100px;
      color: #1dbf73;
      padding: 10px;
      cursor: pointer;
    }
    .nav-item:hover {
      color: #ed6504;
    }
  }
  .detail-section {
    margin: 20px 0;
  }
  .cmps {
    overflow: auto;
    height: 79vh;
  }
  @media (max-width: 768px) {
    .cmps {
      overflow: unset;
      height: unset;
    }
  }
}
@media (max-width: 768px) {
  .main-desc {
    margin: 5px 15px;
  }
}
</style>