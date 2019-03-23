<template>
  <section class="about" v-if="user">
    <div class="overview">
      <h3 class="header-box">Overview</h3>
      <hr style="margin: 0">
      <div class="user-info flex flex-col">
        <div class="info-item">
          <font-awesome-icon icon="comment"/>
          &nbsp;Fluent in {{user.language}}
        </div>
        <div class="info-item">
          <font-awesome-icon icon="venus-mars"/>
          {{getAge}}, {{user.gender}}
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
  height: 500px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.15);
  background-color: #fff;
}
.overview {
  margin: 10px;
  .header-box {
    padding: 20px;
    margin: 0px;
    text-align: left;
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
