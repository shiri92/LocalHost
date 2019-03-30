<template>
  <li>
    <div class="card-container flex space-between flex-col">
      <div class="card">
        <!-- <div class="hero"></div> -->
        <div class="main">
          <div class="user">
            <div class="avatar" :style="'background-image: url(' + profile.imgUrl + ')'"></div>
            <div class="user-details">
              <h3>{{profile.firstName}} {{profile.lastName}}</h3>
              <span class="location">
                <!-- <font-awesome-icon icon="map-marker-alt"/> -->
                <span>{{profile.address.city}}, {{profile.address.country}}</span>
              </span>
              <span class="date">
                <span>Check In: 01/01/2019</span>
              </span>
              <span class="date">
                <span>Check Out: 01/02/2019</span>
              </span>
              <!-- <stars-toshow :value="rateAverage" :disabled="true"></stars-toshow> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import StarsToshow from "../components/RateStarsToShow";
export default {
  props: ["profile"],
  components: {
    StarsToshow
  },
  computed: {
    rateAverage() {
      let sum = 0;
      let divider = this.profile.references.length;
      return this.profile.references.reduce((acc, review) => {
        sum += +review.rating;
        acc = sum / divider;
        return acc;
      }, 0);
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
            width: 100px;
            height: 100px;
            border-radius: 50%;
            border: 3px solid #fff;
            position: relative;
            background-size: cover;
            background-repeat: no-repeat;
            box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
              0 5px 15px 0 rgba(0, 0, 0, 0.08);

            // top: -50px;
          }
          .user-details {
            display: flex;
            flex-direction: column;
            margin: 10px 0 0 10px;
            h3 {
              margin: 0;
              font-size: 1.17em;
              font-weight: bold;
            }
            .location,
            .date {
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
