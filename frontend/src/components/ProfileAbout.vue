<template>
  <section class="about" v-if="user">
    <div class="overview">
      <h5 class="header-box">OVERVIEW</h5>
      <hr style="margin: 0">
      <div class="user-info flex">
        <div class="side flex flex-col">
          <div class="info-item">
            <font-awesome-icon icon="quote-left"/>&nbsp;0 References
          </div>
          <div class="info-item">
            <font-awesome-icon icon="comment"/>&nbsp;Fluent in
            <span v-for="(language, idx) in user.languages" :key="idx">{{language}}</span>
          </div>
          <div class="info-item">
            <font-awesome-icon icon="venus-mars"/>
            {{getAge}}, {{user.gender}}
          </div>
        </div>
        <div class="side flex flex-col">
          <div class="info-item">
            <font-awesome-icon icon="briefcase"/>
            &nbsp;{{(user.occupation)? user.occupation:'No occupation listed'}}
          </div>
          <div class="info-item">
            <font-awesome-icon icon="book"/>
            &nbsp;{{(user.education)? user.education:'No education listed'}}
          </div>
          <div class="info-item">
            <font-awesome-icon icon="map-marker-alt"/>
            &nbsp;{{user.address.city}}, {{user.address.country}}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["user"],
  computed: {
    getAge() {
      return this.calcAge();
    }
  },
  methods: {
    calcAge() {
      var birthYear = this.user.birthdate.year;
      var birthMonth = this.user.birthdate.month;
      var birthDay = this.user.birthdate.day;

      var today = new Date();
      var age = today.getFullYear() - birthYear;

      if (today.getMonth() + 1 < birthMonth) age--;
      else if (today.getMonth() + 1 === birthMonth) {
        if (today.getDay() < birthDay) age--;
      }

      return age;
    }
  }
};
</script>

<style lang="scss" scoped>
.about {
  width: 100%;
  border-bottom: 2px solid rgba(0, 0, 0, 0.15);
  background-color: #fff;
}
.overview {
  margin-top: 50px;
  .header-box {
    padding: 20px;
    margin: 0px;
    text-align: left;
    font-weight: bold;
    font-size: 1em;
  }
  .user-info {
    padding: 20px;
    flex-direction: row;
    .side {
      width: 50%;
      .info-item:last-child {
        margin-bottom: 0;
      }
    }
  }
  @media (max-width: 768px) {
    .user-info {
      flex-direction: column;
      .side {
        width: unset;
        .info-item:last-child {
          margin-bottom: 10px;
        }
      }
    }
  }
}

@media (max-width: 568px) {
  .overview {
    margin-top: unset;
  }
}
.info-item {
  display: inline-block;
  text-align: left;
  margin-bottom: 10px;
}
</style>
