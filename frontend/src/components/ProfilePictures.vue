<template>
  <section class="pictures" v-if="user">
    <div class="pictures-pref">
      <h3 class="header-box">PICTURES</h3>
      <hr style="margin: 0">
      <div class="user-info">
        <div
          class="display-images"
          v-for="(img, idx) in user.imgs"
          :key="idx"
          :style="'background-image: url(' + img + ')'"
        ></div>
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
.pictures {
  width: 100%;
  border-bottom: 2px solid rgba(0, 0, 0, 0.15);
  background-color: #fff;
}
.pictures-pref {
  .header-box {
    padding: 20px;
    margin: 0px;
    text-align: left;
    font-weight: bold;
    font-size: 1em;
  }

  .user-info {
    padding: 20px;
    display: grid;
    // grid-template-columns: repeat(4, 1fr);
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 10px;
    .display-images {
      margin: 0;
      max-width: 100%;
      padding-top: 100%;
      object-fit: cover;
      object-position: center center;
      background-size: cover;
      background-position: center;
    }
  }
}
</style>

