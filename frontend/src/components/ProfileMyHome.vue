<template>
  <section class="my-home" v-if="user">
    <div class="my-home-pref">
      <h3 class="header-box">MY HOME</h3>
      <hr style="margin: 0">
      <div class="user-info flex flex-row">
        <ul class="flex flex-col" style="width: 50%; margin: 0">
          <li class="info-item">Max Number of Guests?
            <span class="ans">{{user.maxNumOfGuests}}</span>
          </li>
          <li class="info-item">Last-Minute Requests Okay?
            <span class="ans">{{(user.isLastMinReq)? 'Yes':'No'}}</span>
          </li>
          <li class="info-item">Preferred Gender to Host:
            <span class="ans">{{user.prefGenderToHost}}</span>
          </li>
          <li class="info-item">Kid Friendly?
            <span class="ans">{{(user.isKidFriendly)? 'Yes':'No'}}</span>
          </li>
          <li class="info-item">Pet Friendly?
            <span class="ans">{{(user.isPetFriendly)? 'Yes':'No'}}</span>
          </li>
          <li class="info-item" style="margin: 0">Smoking Allowed?
            <span class="ans">{{(user.isSmokeAllowed)? 'Yes':'No'}}</span>
          </li>
        </ul>
        <ul class="flex flex-col">
          <li class="info-item">Has Pets?
            <span class="ans">{{user.hasPets}}</span>
          </li>
          <li class="info-item">Has Children?
            <span class="ans">{{user.hasChildren}}</span>
          </li>
          <li class="info-item">Smoking at Home?
            <span class="ans">{{(user.isSmoking)? 'Yes':'No'}}</span>
          </li>
          <li class="info-item">Wheelchair Accessible?
            <span class="ans">{{(user.isWheelchairAccessible)? 'Yes':'No'}}</span>
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
    .ans {
      font-weight: 100;
      margin-left: 10px;
    }
  }
}
</style>
