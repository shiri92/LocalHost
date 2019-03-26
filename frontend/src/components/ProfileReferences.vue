<template>
  <section class="references">
    <div>
      <h3 class="header-box">REFERENCES</h3>
      <hr style="margin: 0">
      <div class="reference" v-for="(reference, idx) in user.references" :key="idx">
        <hr>
        <div class="review-container">
          <div class="given-details flex">
            <img :src="reference.givenByImgUrl">
            <div class="dry-details flex space-between">
              <div>
                <h5>{{reference.givenBy}}</h5>
                <div>{{reference.givenLocation}}</div>
              </div>
              <div>{{reference.createdAt}}</div>
            </div>
          </div>
          <rate-stars></rate-stars>
          <div>{{reference.rating}}</div>
          <div>{{reference.description}}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import RateStars from '../../src/components/RateStars'
export default {
  props: ['user'],
  components: {
    RateStars
  }
};
</script>

<style lang="scss" scoped>
.references {
  width: 100%;
  border-bottom: 2px solid rgba(0, 0, 0, 0.15);
  background-color: #fff;
  div {
    .header-box {
      padding: 20px;
      margin: 0px;
      text-align: left;
      font-weight: bold;
      font-size: 1em;
    }
    .reference {
      .review-container {
        padding: 20px;
        .given-details {
          width: 100%;
          img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            margin: 0 20px 20px 20px;
          }
          .dry-details {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
