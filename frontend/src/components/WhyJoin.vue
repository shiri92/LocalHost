<template>
  <section class="why-join" id="whyjoin">
    <h1>Why Join?</h1>
    <div class="cards-container flex justify-center">
      <b-card
        class="card"
        title="Community"
        img-src="https://res.cloudinary.com/dcl4oabi3/image/upload/v1553566197/bg-imgs/why-join-1.jpg"
        img-alt="Image"
        img-top
      >
        <b-card-text>"A great way to experience places from a unique insider perspective. Travel is more about the people you meet than the places you see, people are inherently good."</b-card-text>
        <b-card-text class="small text-muted">- Scott and Rachel (Traveling In Asia)</b-card-text>
      </b-card>

      <b-card
        class="card"
        title="Guesting"
        img-src="https://res.cloudinary.com/dcl4oabi3/image/upload/v1553566200/bg-imgs/why-join-2.jpg"
        img-alt="Image"
        img-top
      >
        <b-card-text>"An opportunity to live very valuable and beautiful experiences. I know that anywhere in the world I visit, I'll possibly have a good friend waiting for me!"</b-card-text>
        <b-card-text class="small text-muted">- Jessica (Traveling in South America)</b-card-text>
      </b-card>

      <b-card
        class="card"
        title="Hosting"
        img-src="https://res.cloudinary.com/dcl4oabi3/image/upload/v1553566198/bg-imgs/why-join-3.jpg"
        img-alt="Image"
        img-top
      >
        <b-card-text>"We had no money to travel the world with our four kids, and decided to let the world come to us. A lot of them became friends for life!"</b-card-text>
        <b-card-text class="small text-muted">- Robbert, Brad, and Kids (Hosting in Amsterdam)</b-card-text>
      </b-card>
    </div>
  </section>
</template>

<script>
export default {
  name: "why-join",
  components: {}
};
</script>

<style lang="scss" scoped>
.why-join {
  // padding: 50px 0;
  // margin: 50px 0;

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  h1 {
    margin-top: 60px;
    margin-bottom: 40px;
    font-family: hensa-regular;
    font-size: 3rem;
  }
  .cards-container {
    max-width: 80%;
    margin: 0 auto;
    .card {
      margin: 20px;
      text-align: left;
      z-index: 0;
    }
  }
}

@media (max-width: 1050px) {
  .why-join {
    // padding: 50px 0;
    .cards-container {
      max-width: 100%;
      .card {
        margin: 10px;
      }
    }
  }
}

@media (max-width: 768px) {
  .why-join {
    // padding: 50px 0;
    .cards-container {
      flex-direction: column;
      max-width: 100%;
    }
  }
}
</style>


