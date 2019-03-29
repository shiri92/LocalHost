<template>
  <section class="review-form">
    <div class="top flex space-between align-center">
      <H1>Your review about {{currUser.firstName}}</H1>
      <span @click="$emit('closeReviewForm')">&times;</span>
    </div>
    <hr>
    <div class="content flex flex-col">
      <label for>{{currUser.firstName}} was your:</label>
      <div class="checkbox-container flex">
        <div>
          <input
            class="checkbox"
            type="checkbox"
            ref="inputHost"
            @change="checkHost"
            value="Host"
            v-model="review.getAsAHost"
            required
          >Host
        </div>
        <div>
          <input
            class="checkbox"
            type="checkbox"
            ref="inputGuest"
            @change="checkGuest"
            value="Guest"
            v-model="review.getAsAGuest"
            required
          >Guest
        </div>
      </div>
      <rate-stars @rate="setRate"></rate-stars>
      <label>Your Review:</label>
      <textarea v-model="review.description" cols="30" rows="8"></textarea>
      <div class="btn-container flex justify-center">
        <button class="btn btn-send" @click="setReview">Send Review</button>
      </div>
    </div>
  </section>
</template>

<script>
import RateStars from '../components/RateStars'
export default {
  name: 'review-form',
  data() {
    return {
      review: {
        getAsAHost: false,
        getAsAGuest: false,
        sender: { id: '', firstName: '', lastName: '', imgUrl: '', country: '', city: '' },
        recipient: { id: '', firstName: '', lastName: '' },
        createdAt: Date.now(),
        rating: 0,
        description: '',
        isClicked: false
      }
    }
  },
  created() {
    this.review.sender.id = this.loggedUser._id;
    this.review.sender.firstName = this.loggedUser.firstName;
    this.review.sender.lastName = this.loggedUser.lastName;
    this.review.sender.country = this.loggedUser.country;
    this.review.sender.city = this.loggedUser.city;
    this.review.sender.imgUrl = this.loggedUser.imgUrl;
    this.review.recipient.firstName = this.currUser.firstName;
    this.review.recipient.lastName = this.currUser.lastName;
    this.review.recipient.id = this.currUser._id;
  },
  computed: {
    currUser() {
      return this.$store.getters.currUser;
    },
    loggedUser() {
      return this.$store.getters.loggedUser
    }
  },
  methods: {
    checkHost() {
      this.$refs.inputGuest.checked = false;
      this.review.getAsAHost = true;
      this.review.getAsAGuest = false;
    },
    setRate(num) {
      this.review.rating = num;
    },
    checkGuest() {
      this.$refs.inputHost.checked = false;
      this.review.getAsAHost = false;
      this.review.getAsAGuest = true;
    },
    setReview() {
      if (!this.loggedUser) {
        console.log('Only registered users can send reviews!');
        return;
      }
      if ((this.review.getAsAHost || this.review.getAsAGuest) && this.review.description && this.review.rating) {
        this.$emit('closeReviewForm');
        this.$store.dispatch({ type: 'addReview', review: this.review })
      }
    }
  },
  components: {
    RateStars
  }
}
</script>

<style lang="scss" scoped>
.review-form {
  z-index: 10;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 40%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transform: translate(-50%, -50%);
  border-radius: 10px;
  background-color: white;
  color: rgb(62, 62, 62);
  box-shadow: 1px 1px 10px rgb(82, 81, 81);
  font-size: 1.1rem;
  .top {
    padding: 0 30px 0 30px;
    h1 {
      font-size: 1.5rem;
      margin: 0;
    }
    span {
      cursor: pointer;
      font-size: 2.5rem;
      color: rgb(175, 169, 169);
    }
  }
  .content {
    padding: 20px 40px 20px 40px;
    .checkbox {
      margin: 10px 10px 30px 30px;
    }
    textarea {
      padding: 10px;
    }
    .btn-container {
      margin: 30px 30px 20px 30px;
      .btn-send {
        justify-self: center;
        width: 120px;
      }
    }
  }
}

hr {
  margin: 0;
}
</style>
