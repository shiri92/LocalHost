<template>
  <section class="about" v-if="user">
    <div class="overview">
      <h5 class="header-box">OVERVIEW</h5>
      <hr style="margin: 0">
      <div class="user-info flex flex-row ">
        <div class="flex flex-col" style="width: 50%">
          <div class="info-item">
            <font-awesome-icon icon="quote-left"/>&nbsp;0 References
          </div>
          <div class="info-item">
            <font-awesome-icon icon="comment"/>
            &nbsp;Fluent in {{user.language[0]}}
          </div>
          <div class="info-item" style="margin-bottom: 0">
            <font-awesome-icon icon="venus-mars"/>
            {{getAge}}, {{user.gender}}
          </div>
        </div>
        <div class="flex flex-col">
          <div class="info-item">
            <font-awesome-icon icon="briefcase"/>&nbsp;{{(user.occupation)? user.occupation:'No occupation listed'}}
          </div>
          <div class="info-item">
            <font-awesome-icon icon="book"/>&nbsp;{{(user.education)? user.education:'No education listed'}}
          </div>
          <div class="info-item" style="margin-bottom: 0">
            <font-awesome-icon icon="map-marker-alt"/>
            &nbsp;{{user.city}}, {{user.country}}
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
  .header-box {
    padding: 20px;
    margin: 0px;
    text-align: left;
    font-weight: bold;
    font-size: 1em;
  }
  .user-info {
    padding: 20px;
  }
}
.info-item {
  display: inline-block;
  text-align: left;
  margin-bottom: 10px;
}
</style>
