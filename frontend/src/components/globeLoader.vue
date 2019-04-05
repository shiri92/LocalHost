<template>
  <section class="globe">
    <div id="earth">
      <div class="halfShadow"></div>
      <div id="lands">
        <div class="land"></div>
        <div class="land"></div>
        <div class="land"></div>
        <div class="land"></div>
        <div class="land"></div>
      </div>
      <div id="clouds">
        <div class="cloud"></div>
        <div class="cloud"></div>
        <div class="cloud"></div>
        <div class="cloud"></div>
        <div class="cloud"></div>
      </div>
    </div>
    <!-- <div id="earthSignal">
      <div class="eSignal"></div>
      <div class="eSignal"></div>
      <div class="eSignal"></div>
    </div>-->
    <div id="earthText">
      <!-- <h1 class="eTitle">Loading...</h1> -->
    </div>
  </section>
</template>

<script>
export default {

}
</script>

<style scoped>
#earth {
  width: 50vh;
  height: 50vh;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  background-color: #228bd8;
  border-radius: 50%;
  border: 3px solid #303030;
  box-shadow: 0px 0px 110px -15px rgba(0, 0, 0, 0.75);
  overflow: hidden;
  z-index: 1;
}
/* .halfShadow {
  width: 50%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  float: right;
  position: relative;
  z-index: 1;
} */

.land {
  background-color: #47ca5e;
  position: absolute;
  border-radius: 50px;
}
.land:first-child {
  width: 15vh;
  height: 7vh;
  top: 10%;
  -webkit-animation: mymove 5s infinite linear; /* Safari 4.0 - 8.0 */
  -webkit-animation-delay: 2s; /* Safari 4.0 - 8.0 */
  animation: mymove 5s infinite linear;
  animation-delay: -1.5s;
}
.land:nth-child(2) {
  width: 15vh;
  height: 7vh;
  top: 32%;
  -webkit-animation: mymove 5s infinite linear; /* Safari 4.0 - 8.0 */
  -webkit-animation-delay: 2s; /* Safari 4.0 - 8.0 */
  animation: mymove 5s infinite linear;
  animation-delay: -0.3s;
}
.land:nth-child(3) {
  width: 25vh;
  height: 10vh;
  top: 44%;
  -webkit-animation: mymove 5s infinite linear; /* Safari 4.0 - 8.0 */
  -webkit-animation-delay: 2s; /* Safari 4.0 - 8.0 */
  animation: mymove 5s infinite linear;
  animation-delay: -3.5s;
}
.land:nth-child(4) {
  width: 11vh;
  height: 3vh;
  top: 75%;
  -webkit-animation: mymove 5s infinite linear; /* Safari 4.0 - 8.0 */
  -webkit-animation-delay: 2s; /* Safari 4.0 - 8.0 */
  animation: mymove 5s infinite linear;
  animation-delay: -2s;
}
.land:nth-child(5) {
  width: 15vh;
  height: 9vh;
  top: 67%;
  -webkit-animation: mymove 5s infinite linear; /* Safari 4.0 - 8.0 */
  -webkit-animation-delay: 2s; /* Safari 4.0 - 8.0 */
  animation: mymove 5s infinite linear;
  animation-delay: -0.6s;
}

.cloud {
  background-color: #fff;
  position: absolute;
  border-radius: 50px;
}
.cloud:first-child {
  width: 8vh;
  height: 4vh;
  top: 5%;
  -webkit-animation: mymove 5s infinite linear; /* Safari 4.0 - 8.0 */
  -webkit-animation-delay: 2s; /* Safari 4.0 - 8.0 */
  animation: mymove 5s infinite linear;
  animation-delay: -1.9s;
}
.cloud:nth-child(2) {
  width: 15vh;
  height: 3vh;
  top: 27%;
  -webkit-animation: mymove 5s infinite linear; /* Safari 4.0 - 8.0 */
  -webkit-animation-delay: 2s; /* Safari 4.0 - 8.0 */
  animation: mymove 5s infinite linear;
  animation-delay: -3.2s;
}
.cloud:nth-child(3) {
  width: 12vh;
  height: 5vh;
  top: 50%;
  -webkit-animation: mymove 5s infinite linear; /* Safari 4.0 - 8.0 */
  -webkit-animation-delay: 2s; /* Safari 4.0 - 8.0 */
  animation: mymove 5s infinite linear;
  animation-delay: -0.9s;
}
.cloud:nth-child(4) {
  width: 8vh;
  height: 3vh;
  top: 84%;
  -webkit-animation: mymove 5s infinite linear; /* Safari 4.0 - 8.0 */
  -webkit-animation-delay: 2s; /* Safari 4.0 - 8.0 */
  animation: mymove 5s infinite linear;
  animation-delay: -1.5s;
}
.cloud:nth-child(5) {
  width: 14vh;
  height: 3vh;
  top: 65%;
  -webkit-animation: mymove 5s infinite linear; /* Safari 4.0 - 8.0 */
  -webkit-animation-delay: 2s; /* Safari 4.0 - 8.0 */
  animation: mymove 5s infinite linear;
  animation-delay: -0.2s;
}

/* ANIMATE */
@keyframes moveEarth {
  from {
    left: 100%;
  }
  to {
    left: -50%;
  }
}

@keyframes mymove {
  from {
    left: 100%;
  }
  to {
    left: -50%;
  }
}

/* EARTH SIGNAL */

.eSignal {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 50%;
}

.eSignal:first-child {
  width: 58vh;
  height: 58vh;
  background-color: rgba(16, 64, 228, 0.3);
}
.eSignal:nth-child(2) {
  width: 65vh;
  height: 65vh;
  background-color: rgba(16, 64, 228, 0.2);
}
.eSignal:nth-child(3) {
  width: 72vh;
  height: 72vh;
  background-color: rgba(16, 64, 228, 0.1);
}

/* EARTH TEXT */
#earthText {
  position: fixed;
  left: 50%;
  bottom: 5%;
  transform: translateX(-50%);
  z-index: 2;
  color: #fff;
  text-align: center;
  font-family: monospace;
}
.eTitle,
.eSubTitle {
  margin: 0;
  padding: 0;
}
</style>
