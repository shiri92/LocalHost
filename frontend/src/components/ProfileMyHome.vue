<template>
  <section class="my-home" v-if="user">
    <div class="my-home-pref">
      <h3 class="header-box">MY HOME</h3>
      <hr style="margin: 0">
      <div class="user-info flex flex-row">
        <ul class="flex flex-col" style="width: 50%; margin: 0">
          <li class="info-item">Max Number of Guests?
            <span></span>
          </li>
          <li class="info-item">Last-Minute Requests Okay?
            <span></span>
          </li>
          <li class="info-item">Preferred Gender to Host:
            <span></span>
          </li>
          <li class="info-item">Kid Friendly?
            <span></span>
          </li>
          <li class="info-item">Pet Friendly?
            <span></span>
          </li>
          <li class="info-item" style="margin: 0">Smoking Allowed?
            <span></span>
          </li>
        </ul>
        <ul class="flex flex-col">
          <li class="info-item">Has Pets?
            <span></span>
          </li>
          <li class="info-item">Has Children?
            <span></span>
          </li>
          <li class="info-item">Smoking at Home?
            <span></span>
          </li>
          <li class="info-item">Wheelchair Accessible?
            <span></span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["user"]
};
</script>

<style lang="scss" scoped>
.my-home {
  width: 100%;
  border-bottom: 2px solid rgba(0, 0, 0, 0.15);
  background-color: #fff;
  .my-home-pref {
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
    font-weight: bold;
  }
}
</style>
