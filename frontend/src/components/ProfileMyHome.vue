<template>
  <section class="my-home" v-if="pref">
    <div class="my-home-pref">
      <h3 class="header-box">MY HOME</h3>
      <hr style="margin: 0">
      <div class="pref-info flex">
        <ul class="pref-list flex flex-col">
          <li class="info-item">
            Max Number of Guests?
            <span class="ans">{{pref.guestCapacity}}</span>
          </li>
          <li class="info-item">
            Last-Minute Requests Okay?
            <span class="ans">{{(pref.isLastMinReq)? 'Yes':'No'}}</span>
          </li>
          <li class="info-item">
            Preferred Gender to Host:
            <span class="ans">{{pref.guestGenderPref}}</span>
          </li>
          <li class="info-item">
            Kid Friendly?
            <span class="ans">{{(pref.isKidFriendly)? 'Yes':'No'}}</span>
          </li>
          <li class="info-item">
            Pet Friendly?
            <span class="ans">{{(pref.isPetFriendly)? 'Yes':'No'}}</span>
          </li>
          <li class="info-item" style="margin: 0">
            Smoking Allowed?
            <span class="ans">{{(pref.isDisabledAccessible)? 'Yes':'No'}}</span>
          </li>
        </ul>
        <ul class="pref-list flex flex-col">
          <li class="info-item">
            Has Pets?
            <span class="ans">{{pref.pets}}</span>
          </li>
          <li class="info-item">
            Has Children?
            <span class="ans">{{pref.children}}</span>
          </li>
          <!-- <li class="info-item">Smoking at Home?
            <span class="ans">{{(pref.isSmoking)? 'Yes':'No'}}</span>
          </li>-->
          <li class="info-item">
            Disabled Accessible?
            <span class="ans">{{(pref.isDisabledAccessible)? 'Yes':'No'}}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["pref"]
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
    .pref-info {
      padding: 20px;
      flex-direction: row;
      .pref-list {
        width: 50%;
        margin: 0;
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
    }
    @media (max-width: 768px) {
      .pref-info {
        flex-direction: column;
        .pref-list {
          width: unset;
        }
      }
    }
  }
}
</style>
