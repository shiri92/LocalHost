<template>
  <li>
    <div class="card-container flex space-between flex-col">
      <div class="card">
        <div class="hero"></div>
        <div class="main">
          <div class="user">
            <img class="avatar" :src="profile.imgUrl" alt width="100" height="100">
            <div class="user-details">
              <h3>{{profile.firstName}} {{profile.lastName}}</h3>
              <span class="location">
                <font-awesome-icon icon="map-marker-alt"/>
                <span>&nbsp;{{profile.address.city}}, {{profile.address.country}}</span>
              </span>
              <stars-toshow :value="rateAverage" :disabled="true"></stars-toshow>
            </div>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import StarsToshow from '../components/RateStarsToShow'
export default {
  props: ["profile"],
  components: {
    StarsToshow
  },
  computed: {
    rateAverage() {
      return this.profile.references.reduce((acc, review) => {
        acc += review.rating;
        return acc;
      }, 0)
    }
  }
};
</script>

<style lang="scss" scoped>
li {
  .card-container {
    .card {
      border-radius: 5px;
      box-shadow: 2px 5px 10px #ccc;
      background: white;
      .hero {
        height: 100px;
        background: url("https://images.unsplash.com/photo-1425321395722-b1dd54a97cf3?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=6bb26c224def312127d93e664ec5d03d");
        background-size: cover;
        border-radius: 5px 5px 0px 0px;
      }
      .main {
        border-bottom: 1px solid #ddd;
        padding: 0 10px;
        .user {
          display: flex;
          margin-bottom: 5px;
          .avatar {
            border-radius: 50%;
            border: 3px solid #fff;
            position: relative;
            top: -50px;
          }
          .user-details {
            margin: 10px 0 0 10px;
            h3 {
              margin: 0;
              font-size: 1.17em;
              font-weight: bold;
            }
            .location {
              color: #444;
              font-size: 0.9em;
            }
          }
        }
      }
    }
  }
}
</style>
