<template>
  <section class="why-join">
    <h1>Why Join?</h1>
    <div class="cards-container flex justify-center">
      <b-card
        title="Community"
        img-src="https://res.cloudinary.com/dcl4oabi3/image/upload/v1553333051/ons/why-join-1.jpg"
        img-alt="Image"
        img-top
      >
        <b-card-text>"A great way to experience places from a unique insider perspective. Travel is more about the people you meet than the places you see, people are inherently good."</b-card-text>
        <b-card-text class="small text-muted">- Scott and Rachel (Traveling In Asia)</b-card-text>
      </b-card>

      <b-card
        title="Guesting"
        img-src="https://res.cloudinary.com/dcl4oabi3/image/upload/v1553333101/ons/why-join-2.jpg"
        img-alt="Image"
        img-top
      >
        <b-card-text>"An opportunity to live very valuable and beautiful experiences. I know that anywhere in the world I visit, I'll possibly have a good friend waiting for me!"</b-card-text>
        <b-card-text class="small text-muted">- Jessica (Traveling in South America)</b-card-text>
      </b-card>

      <b-card
        title="Hosting"
        img-src="https://res.cloudinary.com/dcl4oabi3/image/upload/v1553333102/ons/why-join-3.jpg"
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
  name: 'why-join',
  components: {

  }

}
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 50px;
}
.why-join {
  padding-top: 100px;
  padding-bottom: 100px;
}

.cards-container {
  max-width: 80%;
  margin: 0 auto;
}

.card {
  margin: 20px;
  text-align: left;
}
</style>


