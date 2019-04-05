<template>
  <div class="home">
    <main-header></main-header>

    <h1 class="user-list-title">Meet Some Of Our Top Hosts</h1>
    <user-list :users="homeUsers"></user-list>

    <why-join></why-join>

    <h1>Top Destinations</h1>
    <city-search></city-search>

    <div class="cities-gallery grid">
      <div v-for="dest in topDests" :key="dest._id" :class="'img-container' + ' ' + dest.name">
        <div
          class="city-name"
          :style="'background-image: url(' + dest.imgUrl + ')'"
          @click="moveToUsers(dest)"
        >
          <div class="city-name-title">{{dest.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader";
import CitySearch from "../components/CitySearch";
import WhyJoin from "../components/WhyJoin";
import UserList from "../components/UserList";

export default {
  name: "home",
  data() {
    return {
      users: null,
    };
  },
  created() {
    this.$store.dispatch({ type: "loadTopDests" });
    this.$store.dispatch({ type: "loadUsers" });
    let arr = [
      this.$store.dispatch({
        type: "loadHomeUser",
        userId: "5ca62433a82d87eeccaae69f"
      }),
      this.$store.dispatch({
        type: "loadHomeUser",
        userId: "5ca62433a82d87eeccaae6ad"
      }),
      this.$store.dispatch({
        type: "loadHomeUser",
        userId: "5ca62433a82d87eeccaae6a2"
      }),
      this.$store.dispatch({
        type: "loadHomeUser",
        userId: "5ca62433a82d87eeccaae6a0"
      })
    ];
  },
  methods: {
    moveToUsers(dest) {
      let destCountry = dest.country;
      let destCity = dest.name;
      this.$router.push("/users/" + destCountry + "&" + destCity);
    },
  },
  computed: {
    topDests() {
      return this.$store.getters.topDests;
    },
    homeUsers() {
      return this.$store.getters.homeUsers;
    },
    getUsers() {
      return this.$store.getters.currUsers;
    },
    getNumOfUsers() {
      var num = Math.floor(Math.random() * Math.floor(10000));
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  components: {
    MainHeader,
    CitySearch,
    WhyJoin,
    UserList
  }
};
</script>

<style lang="scss" scoped>
.home {
  margin-top: -70px;
  padding-bottom: 50px;
  text-align: center;
  h1 {
    font-family: hensa-regular;
    font-size: 3rem;
    margin-bottom: 40px;
    margin-top: 40px;
  }
}

.cities-gallery {
  max-width: 1200px;
  margin: 0 auto;
  grid-template-rows: repeat(4, 180px);
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  margin-top: 40px;
  .img-container {
    position: relative;
    cursor: pointer;
    overflow: hidden;
    .city-name {
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
      width: 100%;
      height: 100%;
      transition: all 0.5s;
      position: relative;
      &:hover {
        transform: scale(1.2);
      }
      .city-name-title {
        font-size: 2rem;
        color: white;
        font-weight: bold;
        text-shadow: 0px 3px 15px rgba(0, 0, 0, 1);
        left: 50%;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
      }
    }
  }
  .Bangkok {
    grid-column: span 1;
    grid-row: span 1;
  }
  .London {
    grid-column: span 1;
    grid-row: span 2;
  }

  .Paris {
    grid-column: span 2;
    grid-row: span 1;
  }

  .Buenos {
    grid-column: span 1;
    grid-row: span 1;
  }

  .Rome {
    grid-column: span 1;
    grid-row: span 1;
  }

  .Tokyo {
    grid-column: span 1;
    grid-row: span 1;
  }

  .Berlin {
    grid-column: span 1;
    grid-row: span 2;
  }

  .Barcelona {
    grid-column: span 1;
    grid-row: span 2;
  }

  .New {
    grid-column: span 2;
    grid-row: span 1;
  }

  .Rio {
    grid-column: span 2;
    grid-row: span 1;
  }

  // .img-container:last-child {
  //   grid-column: span 1;
  //   grid-row: span 1;
  //   background-color: #1dbf73;
  // }
}

@media (max-width: 1200px) {
  .cities-gallery {
    max-width: 980px;
  }
}

@media (max-width: 1050px) {
  .cities-gallery {
    max-width: 750px;
  }
}

@media (max-width: 768px) {
  .cities-gallery {
    max-width: 750px;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(7, 180px);
    grid-gap: 10px;
    margin: 10px;
    .London {
      grid-row: span 1;
    }
    .Berlin {
      grid-row: span 1;
    }
    .Barcelona {
      grid-column: span 2;
      grid-row: span 1;
    }
    .New {
      grid-column: span 2;
    }
  }
}

@media (max-width: 568px) {
  .cities-gallery {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(10, 180px);
    grid-gap: 5px;
    margin: 5px;
    .Paris {
      grid-column: span 1;
    }
    .Barcelona {
      grid-row: span 1;
      grid-column: span 1;
    }
    .New {
      grid-column: span 1;
    }
    .Rio {
      grid-column: span 1;
    }
  }
}
</style>