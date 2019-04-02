<template>
  <div class="home">
    <main-header></main-header>

    <h1 class="user-list-title">Meet Some Of Our Top Hosts</h1>
    <user-list :users="homeUsers"></user-list>

    <why-join></why-join>

    <h1>Top Destinations</h1>
    <city-search></city-search>

    <div class="cities-gallery grid">
      <div
        v-for="dest in topDests"
        :key="dest._id"
        :class="'img-container' + ' ' + dest.name"
        :style="'background-image: url(' + dest.imgUrl + ')'"
      >
        <div class="city-name" @click="moveToUsers(dest)">{{dest.name}}</div>
        <div class="overlay">Something</div>
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
        userId: "5ca34f72854aef61a09c0d4c"
      }),
      this.$store.dispatch({
        type: "loadHomeUser",
        userId: "5ca34f72854aef61a09c0d4d"
      }),
      this.$store.dispatch({
        type: "loadHomeUser",
        userId: "5ca34f72854aef61a09c0d4f"
      }),
      this.$store.dispatch({
        type: "loadHomeUser",
        userId: "5ca34f72854aef61a09c0d5a"
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
  .user-list-title {
    margin-top: 50px;
  }
  h1 {
    margin-bottom: 40px;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    transition: 0.5s ease;
    &:hover {
      opacity: 0.8;
      .overlay {
        opacity: 1;
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
.overlay {
  position: absolute;
  bottom: 0;
  background: rgb(0, 0, 0);
  background: rgba(0, 0, 0, 0.9);
  color: #f1f1f1;
  width: 100%;
  transition: 0.5s ease;
  opacity: 0;
  color: white;
  font-size: 20px;
  padding: 10px;
  text-align: center;
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

.city-name {
  font-size: 2rem;
  color: white;
  font-weight: bold;
  text-shadow: 0px 3px 15px rgba(0, 0, 0, 1);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>