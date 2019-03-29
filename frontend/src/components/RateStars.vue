<template>
  <section class="rate-stars">
    <form class="flex align-center">
      Rate:
      <fieldset class="rating">
        <input type="radio" id="star5" value="5" v-model.number="review.rate" @input="setRate">
        <label class="full" for="star5"></label>
        <input
          type="radio"
          id="star4half"
          value="4.5"
          v-model.number="review.rate"
          @input="setRate"
        >
        <label class="half" for="star4half"></label>
        <input type="radio" id="star4" value="4" v-model.number="review.rate" @input="setRate">
        <label class="full" for="star4"></label>
        <input
          type="radio"
          id="star3half"
          value="3.5"
          v-model.number="review.rate"
          @input="setRate"
        >
        <label class="half" for="star3half"></label>
        <input type="radio" id="star3" value="3" v-model.number="review.rate" @input="setRate">
        <label class="full" for="star3"></label>
        <input
          type="radio"
          id="star2half"
          value="2.5"
          v-model.number="review.rate"
          @input="setRate"
        >
        <label class="half" for="star2half"></label>
        <input type="radio" id="star2" value="2" v-model.number="review.rate" @input="setRate">
        <label class="full" for="star2"></label>
        <input
          type="radio"
          id="star1half"
          value="1.5"
          v-model.number="review.rate"
          @input="setRate"
        >
        <label class="half" for="star1half"></label>
        <input type="radio" id="star1" value="1" v-model.number="review.rate" @input="setRate">
        <label class="full" for="star1"></label>
        <input type="radio" id="starhalf" value="0.5" v-model.number="review.rate" @input="setRate">
        <label class="half" for="starhalf"></label>
      </fieldset>
    </form>
  </section>
</template>

<script>
export default {
  props: ['rating'],
  name: 'rate-stars',
  data() {
    return {
      review: {
        rate: 0
      }
    }
  },
  methods: {
    setRate(ev) {
      this.$emit('rate', ev.target.value);
    }
  },
}
</script>

<style lang="scss" scoped>
@import url(//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css);

fieldset,
label {
  margin: 0;
  padding: 0;
}

.rate-stars {
  margin-bottom: 30px;
}
@media (max-width: 400px) {
  .rate-stars {
    margin-bottom: 0;
  }
}
.rating {
  border: none;
  float: left;
  max-width: 50%;
  margin-left: 30px;
}
@media (max-width: 568px) {
  .rating {
    max-width: unset;
    margin-left: 10px;
  }
}

.rating > input {
  display: none;
}
.rating > label:before {
  margin: 5px;
  font-size: 1.25em;
  font-family: FontAwesome;
  display: inline-block;
  content: "\f005";
}

.rating > .half:before {
  content: "\f089";
  position: absolute;
}

.rating > label {
  color: #ddd;
  float: right;
  cursor: pointer;
}

/***** CSS Magic to Highlight Stars on Hover *****/

.rating > input:checked ~ label, /* show gold star when clicked */
.rating:not(:checked) > label:hover, /* hover current star */
.rating:not(:checked) > label:hover ~ label {
  color: #ffd700;
} /* hover previous stars in list */

.rating > input:checked + label:hover, /* hover current star when changing rating */
.rating > input:checked ~ label:hover,
.rating > label:hover ~ input:checked ~ label, /* lighten current selection */
.rating > input:checked ~ label:hover ~ label {
  color: #ffed85;
}
</style>
