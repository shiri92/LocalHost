<template>
  <section class="about">
    <h1>ABOUT US</h1>
    <div class="worker-cards flex justify-center align-center">
      <div class="worker-card flex flex-col justify-center align-center">
        <div class="profile-image" :style="'background-image: url(https://res.cloudinary.com/dcl4oabi3/image/upload/v1554398369/profile-imgs/yehonatan-ratzon/yehonatan-ratzon.jpg)'"></div>
        <div class="worker-name">Yehonatan Ratzon</div>
        <div class="social-links flex flex-row justify-center">
          <div class="link flex justify-center align-center">
            <i class="fab fa-facebook-f"></i>
          </div>
          <div class="link flex justify-center align-center">
            <i class="fab fa-github"></i>
          </div>
          <div class="link flex justify-center align-center">
            <i class="fab fa-linkedin-in"></i>
          </div>
        </div>
        <button class="port-btn">
          <a href="https://yonir44.github.io/my-portfolio/">See My Portfolio</a>
        </button>
      </div>
      <div class="worker-card flex flex-col justify-center align-center">
        <div class="profile-image" :style="'background-image: url(https://res.cloudinary.com/dcl4oabi3/image/upload/v1554496014/profile-imgs/niv-saar/niv-saar.jpg)'"></div>
        <div class="worker-name">Niv Saar</div>
        <div class="social-links flex flex-row justify-center">
          <div class="link flex justify-center align-center">
            <i class="fab fa-facebook-f"></i>
          </div>
          <div class="link flex justify-center align-center">
            <i class="fab fa-github"></i>
          </div>
          <div class="link flex justify-center align-center">
            <i class="fab fa-linkedin-in"></i>
          </div>
        </div>
        <button class="port-btn">
          <a href="#">See My Portfolio</a>
        </button>
      </div>
      <div class="worker-card flex flex-col justify-center align-center">
        <div class="profile-image" :style="'background-image: url(https://res.cloudinary.com/dcl4oabi3/image/upload/v1554322197/profile-imgs/shiri-ron/shiri-ron.jpg)'"></div>
        <div class="worker-name">Shiri Ron</div>
        <div class="social-links flex flex-row justify-center">
          <div class="link flex justify-center align-center">
            <i class="fab fa-facebook-f"></i>
          </div>
          <div class="link flex justify-center align-center">
            <i class="fab fa-github"></i>
          </div>
          <div class="link flex justify-center align-center">
            <i class="fab fa-linkedin-in"></i>
          </div>
        </div>
        <button class="port-btn">
          <a href="#">See My Portfolio</a>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.about {
  height: 100%;
  padding-bottom: 74px;
  h1 {
    margin-top: 25px;
    text-align: center;
    font-family: hensa-regular;
  }
  .worker-cards {
    flex-direction: row;
    .worker-card {
      width: fit-content;
      margin: 10px;
      .profile-image {
        border-radius: 50%;
        height: 250px;
        width: 250px;
        background-size: cover;
      }
      .worker-name {
        font-family: "Kaushan Script", "Helvetica Neue", Helvetica, Arial,
          cursive;
        font-size: 1.75rem;
        text-align: center;
      }
      .social-links {
        .link {
          background-color: blue;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          color: white;
          margin: 5px;
          &:hover {
            background-color: #ffc107;
            cursor: pointer;
          }
        }
      }
      .port-btn {
        font-size: 20px;
        width: 210px;
        height: 57px;
        border: none;
        background: #ffc107;
        cursor: pointer;
        margin-bottom: 20px;
        transition: 0.3s;
        font-family: "Kaushan Script", "Helvetica Neue", Helvetica, Arial,
          cursive;
        margin: 5px;
        border-radius: 10px;
        color: white;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
}
@media (max-width: 768px) {
  .about {
    .worker-cards {
      flex-direction: column;
    }
  }
}
</style>

