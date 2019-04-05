<template>
  <section class="rate-stars">
    <form class="flex align-center">
      <span style="color: red">*</span>&nbsp;Rate:
      <fieldset class="rating">
        <input type="radio" id="star5" name="star" value="5" v-model.number="review.rate" @input="setRate" required>
        <label class="full" for="star5"></label>
        <input
          type="radio"
          id="star4half"
          name="star"
          value="4.5"
          v-model.number="review.rate"
          @input="setRate"
        >
        <label class="half" for="star4half"></label>
        <input type="radio" id="star4"  name="star" value="4" v-model.number="review.rate" @input="setRate">
        <label class="full" for="star4"></label>
        <input
          type="radio"
          id="star3half"
          name="star"
          value="3.5"
          v-model.number="review.rate"
          @input="setRate"
        >
        <label class="half" for="star3half"></label>
        <input type="radio" id="star3" name="star" value="3" v-model.number="review.rate" @input="setRate">
        <label class="full" for="star3"></label>
        <input
          type="radio"
          id="star2half"
          name="star"
          value="2.5"
          v-model.number="review.rate"
          @input="setRate"
        >
        <label class="half" for="star2half"></label>
        <input type="radio" id="star2" name="star" value="2" v-model.number="review.rate" @input="setRate">
        <label class="full" for="star2"></label>
        <input
          type="radio"
          id="star1half"
          name="star"
          value="1.5"
          v-model.number="review.rate"
          @input="setRate"
        >
        <label class="half" for="star1half"></label>
        <input type="radio" id="star1" name="star" value="1" v-model.number="review.rate" @input="setRate">
        <label class="full" for="star1"></label>
        <input type="radio" id="starhalf" name="star" value="0.5" v-model.number="review.rate" @input="setRate">
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
  min-width: 155px;
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
