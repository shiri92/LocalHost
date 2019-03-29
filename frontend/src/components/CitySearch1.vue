<template>
  <section class="city-search-1">
    <label
      ref="search"
      :class="{active:isOpen}"
      @click="isOpen=!isOpen"
      @focus="onFocus"
      @blur="onBlur"
      class="search"
      for="inpt_search"
    >
      <input ref="inpt_search" id="inpt_search" type="text">
    </label>
    <p>Hover to see the magic.</p>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    }
  },
  created() {
  },
  methods: {
    onFocus() {
      // this.$refs.inpt_search.
    },
    onBlue() {

    }
  }
}
</script>

<style scoped lang="scss">
.search {
  background-color: rgb(129, 129, 129);
  width: 35px;
  box-sizing: border-box;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
  border-radius: 25px;
  transition: width 1s, background-color 1s;
  cursor: text;

  &.active {
    width: 500px;
    background: white;
  }

  input {
    width: 100%;
    padding: 10px;
    border: none;
    outline-width: 0px;
    background: transparent;
    color: rgb(73, 73, 73);
    font-size: 1.1rem;
    font-family: lato-reg;
  }
}
</style>
