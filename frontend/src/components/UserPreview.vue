<template>
  <li>
    <div class="card">
      <div class="user">
        <div class="avatar" :style="'background-image: url(' + profile.imgUrl + ')'"></div>
        <div class="user-details">
          <h3>{{profile.firstName}} {{profile.lastName}}</h3>
          <hr>
          <div class="location">
            <font-awesome-icon icon="map-marker-alt"/>
            <span>&nbsp;{{profile.address.city}}, {{profile.address.country}}</span>
          </div>
          <stars-toshow :value="rateAverage" :disabled="true"></stars-toshow>
          <div class="personal-description">{{profile.lineDescription}}</div>
          <div>Click for more information...</div>
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
  margin: 20px;
  transition: all 0.3s ease;
  &:hover {
    transform: translate(0, -15px);
    box-shadow: 0 12px 16px rgba(0, 0, 0, 0.2);
  }
  .card {
    border-radius: 5px;
    box-shadow: 2px 5px 10px #ccc;
    background: white;
    height: 335px;
    .user {
      margin-bottom: 10px;
      .avatar {
        width: 130px;
        height: 130px;
        border-radius: 50%;
        border: 3px solid #fff;
        position: absolute;
        background-size: cover;
        background-repeat: no-repeat;
        top: -60px;
        left: 60px;
        margin-top: 10px;
      }
      .user-details {
        margin: 90px 20px 10px 30px;
        h3 {
          margin-bottom: 10px;
          font-size: 1.2em;
          font-weight: bold;
        }
        .location {
          color: #444;
          font-size: 0.9em;
          margin-top: 10px;
          margin-bottom: 10px;
        }
        .personal-description {
          margin-bottom: 10px;
          font-weight: bold;
        }
      }
    }
  }
}
// .wrapper {
//   background: linear-gradient(left bottom, #62075c 0, #c30eb8 100%);
//   position: relative;
//   z-index: 1;
// }
// .user:before {
//   content: "";
//   position: absolute;
//   top: 0;
//   left: 0;
//   height: 100%;
//   width: 100%;
//   background-image: url("http://remtsoy.com/experiments/user_card/img/food.png");
//   opacity: 0.7;
//   filter: alpha(opacity=30);
// }
</style>
