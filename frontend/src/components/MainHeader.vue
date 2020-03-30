<template>
  <section
    class="main-header flex flex-col align-center justify-center"
    :style="'background-image:linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.63)), url(' + backImg + ')'"
    :class="{'users-head': $route.path !== '/'}"
  >
    <div class="header-title" v-if="$route.path === '/'">
      <h1 class="big-title-home" style="color:white">Find a Place To Stay On Your Trip</h1>
      <h2 class="small-title-home" style="color:white">The Ultimate Travel Experience!</h2>
      <button class="btn" type="success" @click="$router.push('/signup')" round>Join</button>
    </div>
    <img
      v-if="$route.path === '/'"
      class="arrow-down bounce"
      href="#"
      v-scroll-to="'#whyjoin'"
      src="https://res.cloudinary.com/dcl4oabi3/image/upload/v1553953172/fav-icons/arrow-down.png"
    />

    <div class="users-title" v-if="$route.path !== '/'">
      <h2 style="font-size: 4vw">{{currPageCountry}}</h2>
      <h1 style="font-size: 8.5vw; margin-bottom: 60px;">{{currPageCity}}</h1>
    </div>
  </section>
</template>

<script>
// import eventBus from '../services/eventbus-service.js';

export default {
  name: "main-header",
  data() {
    return {
      currPageCity: "",
      currPageCountry: "",
      // currCityImg: 'https://res.cloudinary.com/dcl4oabi3/image/upload/v1553254624/bg-imgs/main-header.jpg'
    };
  },
  created() {
    // eventBus.$on('setCityImg', (cityImg) => {
    //   if (this.$route.path !== "/") {
    //     this.currCityImg = cityImg;
    //   }
    //   // this.currCityImg = cityImg;
    // });

    let cutString = this.$route.path.substring(1, this.$route.path.length);

    let idxSlash = cutString.indexOf("/");
    let idxAnd = cutString.indexOf("&");

    this.currPageCountry = cutString.substr(
      idxSlash + 1,
      idxAnd - idxSlash - 1
    );
    this.currPageCity = cutString.substr(idxAnd + 1, cutString.length);
  },
  computed: {
    backImg() {
      if (this.$route.path === "/") {
        return "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553254624/bg-imgs/main-header.jpg";
      } else {
        let cityName = this.$route.params.city.toLowerCase();
        if (cityName.indexOf(" ") !== -1) {
          cityName = cityName.replace(/\s/g, "%20");
        }
        return (
          "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553965831/city-imgs/" +
          cityName +
          ".jpg"
        );
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.main-header {
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  background-attachment: fixed;
}

.users-head {
  height: 60vh;
  justify-content: flex-end;
  background-position: center center;
}

.users-title {
  text-align: center;

  h1 {
    color: white;
    font-family: lylas-reg;
    // font-family: 'BebasNeueRegular'
  }

  h2 {
    color: white;
    font-family: soon-reg;
  }
}

.btn {
  font-size: 1.5rem;
  // font-size: 1.5vw;
  width: 200px;
  // width: 12vw;
  margin: 10px;
  border-radius: 40px;
  padding: 12px 23px;
}

.arrow-down {
  position: absolute;
  top: 85vh;
  width: 90px;
  height: 90px;
  cursor: pointer;
}
@media (max-width: 1050px) {
  .arrow-down {
    display: none;
  }
}

.bounce {
  animation: bounce 1.5s infinite;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-10px);
  }
}

@media (max-width: 1200px) {
  .main-header {
    background-position: center, center;
  }
}

@media (max-width: 1050px) {
  .main-header {
    height: 70vh;
    background-position: center, center;
  }
  .arrow-down {
    top: 30%;
  }
}

@media (max-width: 900px) {
  .arrow-down {
    display: none;
  }
}

@media (max-width: 400px) {
  .main-header {
    background-position: top center;
    color: white;
    .big-title-home {
      font-size: 1.3rem;
    }
    .small-title-home {
      font-size: 0.8rem;
    }
    .btn {
      font-size: 1rem;
      width: 100px;
    }
  }
}
</style>


