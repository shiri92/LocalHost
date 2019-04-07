<template>
  <li>
    <div class="card-container flex space-between flex-col">
      <div class="card">
        <div class="main">
          <div class="user">
            <div class="avatar" :style="'background-image: url(' + request.source.imgUrl + ')'"></div>
            <div class="user-details">
              <h3>{{request.source.firstName}} {{request.source.lastName}}</h3>
              <span class="location">
                <font-awesome-icon icon="map-marker-alt"/>&nbsp;
                <span>{{request.source.address.city}}, {{request.source.address.country}}</span>
              </span>
              <span class="date">
                <span>Arrival Date: {{request.arrivalDate | moment("calendar")}}</span>
              </span>
              <span class="date">
                <span>Leaving Date: {{request.leavingDate | moment("calendar")}}</span>
              </span>
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
  props: ['request'],
  components: {
    StarsToshow
  },
  computed: {
    getDateFormatted() {
      return moment.locale("12-25-1995");
    }
  },
};
</script>

<style lang="scss" scoped>
li {
  .card-container {
    .card {
      padding: 10px;
      border-radius: 5px;
      background-color: #eeeeee;
      .hero {
        height: 100px;
        background: url("https://images.unsplash.com/photo-1425321395722-b1dd54a97cf3?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=6bb26c224def312127d93e664ec5d03d");
        background-size: cover;
        border-radius: 5px 5px 0px 0px;
      }
      .main {
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
            .location {
              font-weight: bold;
              color: #757575;
              font-size: 0.9em;
            }
            .date {
              font-weight: bold;
              color: #3256bf;
              font-size: 0.9em;
            }
          }
        }
      }
      @media (max-width: 600px) {
        .main {
          padding: 0;
        }
      }
    }
    @media (max-width: 400px) {
      .card {
        width: 100%;
      }
    }
  }
}
</style>
