<template>
  <section class="review-form">
    <div class="top flex space-between align-center">
      <h1>Your review about {{currUser.firstName}}</h1>
      <span @click="$emit('closeReviewForm')">&times;</span>
    </div>
    <hr>
    <form class="content flex flex-col" @submit.prevent="postReview">
      <label for>{{currUser.firstName}} was your:</label>
      <div class="checkbox-container flex">
        <label>
          <input
            class="checkbox"
            type="radio"
            ref="inputHost"
            name="status"
            value="Host"
            v-model="review.getAsAHost"
            required
          >Host
        </label>
        <label>
          <input
            class="checkbox"
            type="radio"
            ref="inputGuest"
            name="status"
            value="Guest"
            v-model="review.getAsAGuest"
          >Guest
        </label>
      </div>
      <rate-stars @rate="setRate" required></rate-stars>
      <label>Your Review:</label>
      <textarea v-model="review.description" cols="30" rows="8" name="desc" required></textarea>
      <div class="btn-container flex justify-center">
        <button class="btn btn-send" type="submit">Send Review</button>
      </div>
    </form>
  </section>
</template>

<script>
import RateStars from "../components/RateStars";
import eventBus from '../services/eventbus-service.js';
export default {
  name: "review-form",
  props: ["currReviewToEdit"],
  components: {
    RateStars
  },
  data() {
    return {
      review: null
    };
  },
  created() {
    if (this.currReviewToEdit) {
      this.review = this.currReviewToEdit;
    } else {
      this.review = JSON.parse(JSON.stringify(this.$store.getters.emptyReview));
    }
  },
  computed: {
    currUser() {
      return this.$store.getters.currUser;
    },
    loggedUser() {
      return this.$store.getters.loggedUser;
    },
    isValid() {
      console.log(this.review.rating);

      return (
        (this.review.getAsAHost || this.review.getAsAGuest) &&
        this.review.description &&
        (this.review.rating !== 0)
      );
    }
  },
  methods: {
    setRate(num) {
      this.review.rating = num;
    },
    checkHost() {
      // if (this.review.getAsAHost) {
      //   this.$refs.inputGuest.checked = false;
      // } else {
      //   this.$refs.inputHost.checked = false;
      // }
    },
    checkGuest() {
      // if (this.review.getAsAGuest) {
      //   this.$refs.inputHost.checked = false;
      // } else {
      //   this.$refs.inputGuest.checked = false;
      // }
    },
    async postReview() {
      if (!this.loggedUser) {
        eventBus.$emit('popToast', 'info', 'bottom-start', 3000, 'Please sign in to add a review...');
        return;
      }
      if (this.isValid) {
        this.$emit("closeReviewForm");
        if (!this.currReviewToEdit) {
          this.review.createdAt = Date.now();
          await this.$store.dispatch({ type: 'postReview', review: this.review, targetId: this.currUser._id });
          this.$emit('resetCurrReview')
          eventBus.$emit('popToast', 'success', 'bottom-start', 3000, 'You have added a new review');
          return;
        }
        //TODO IF USER UPDATES REVIEW ADD THE UPDATED TIME
        this.$store.dispatch({ type: "editReview", currUserId: this.currUser._id, review: this.review });
        eventBus.$emit('popToast', 'success', 'bottom-start', 3000, 'You have updated the review');
      }
    }
  }
};
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
    padding: 0 30px;
    background-color: #1dbf73;
    border-radius: 5px 5px 0 0;
    color: #fff;
    h1 {
      font-size: 1.5rem;
      margin: 0;
    }
    span {
      cursor: pointer;
      font-size: 2.5rem;
      color: #fff;
    }
  }
  @media (max-width: 400px) {
    .top {
      padding: 0 10px;
    }
  }
  .content {
    padding: 20px 40px 20px 40px;
    .checkbox {
      margin: 10px 10px 10px 30px;
    }
    textarea {
      padding: 10px;
    }
    @media (max-width: 400px) {
      textarea {
        height: 7em;
      }
    }
    .btn-container {
      margin: 30px 30px 20px 30px;
      .btn-send {
        justify-self: center;
        min-width: 120px;
        width: 100%;
      }
    }
  }
}

@media (max-width: 1024px) {
  .review-form {
    width: 60%;
  }
}

@media (max-width: 568px) {
  .review-form {
    width: 95%;
  }
}

hr {
  margin: 0;
}
</style>
