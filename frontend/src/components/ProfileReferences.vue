<template>
  <section class="references">
    <div>
      <h3 class="header-box">REFERENCES</h3>
      <hr style="margin: 0">
      <div class="filter flex">
        <h3
          class="from-guests flex align-center"
          :class="{'filter-clicked':isFromGuestsClicked}"
          @click="fromGuestsToShow"
        >
          From Guests
          <div class="num-from-guests">{{revFromGuests.length}}</div>
        </h3>
        <h3
          class="from-hosts flex align-center"
          :class="{'filter-clicked':isFromHostsClicked}"
          @click="fromHostsToShow"
        >
          From Hosts
          <div class="num-from-hosts">{{revFromHosts.length}}</div>
        </h3>
      </div>

      <div v-if="isFromGuestsClicked" class="references-container flex">
        <div class="reference flex flex-col" v-for="(reference, idx) in revFromGuests" :key="idx">
          <hr style="margin-top: 0">
          <div
            class="edit-delete-container flex"
            v-if="(loggedUser) && (loggedUser._id === reference.sender.id)"
          >
            <img
              class="btn-edit"
              @click="editReview(reference, user._id)"
              src="https://res.cloudinary.com/dcl4oabi3/image/upload/v1553852904/fav-icons/edit.png"
              title="Edit"
            >
            <img
              class="delete-review"
              @click="removeReview(reference._id, user._id)"
              src="https://res.cloudinary.com/dcl4oabi3/image/upload/v1553852904/fav-icons/trash.png"
              title="
            remove"
            >
          </div>
          <div class="review-container">
            <div class="given-details flex">
              <div
                @click="$router.push('/userProfile/' + reference.sender.id)"
                class="profile-img"
                :style="'background-image: url(' + reference.sender.imgUrl + ')'"
              ></div>
              <div class="dry-details flex space-between">
                <div>
                  <h5
                    @click="$router.push('/userProfile/' + reference.sender.id)"
                  >{{reference.sender.firstName}}, {{reference.sender.lastName}}</h5>
                  <div>{{reference.sender.address}}</div>
                  <stars-toshow :value="reference.rating" :disabled="true"></stars-toshow>
                </div>
                <div class="created-at">{{reference.createdAt | moment("calendar")}}</div>
              </div>
            </div>
            <div
              class="content"
              :class="{'read-more-clicked': reference.isClicked}"
            >{{reference.description}}</div>
            <div
              class="read-more"
              @click="readMore(reference)"
            >{{(reference.isClicked) ? 'Read less':'Read more'}}</div>
          </div>
        </div>
      </div>

      <div v-if="isFromHostsClicked" class="references-container flex">
        <div class="reference flex flex-col" v-for="(reference, idx) in revFromHosts" :key="idx">
          <hr style="margin-top: 0">
          <div
            class="edit-delete-container flex"
            v-if="(loggedUser) && (loggedUser._id === reference.sender.id)"
          >
            <img
              class="btn-edit"
              @click="editReview(reference, user._id)"
              src="https://res.cloudinary.com/dcl4oabi3/image/upload/v1553852904/fav-icons/edit.png"
              title="Edit"
            >
            <img
              class="delete-review"
              @click="removeReview(reference._id, user._id)"
              src="https://res.cloudinary.com/dcl4oabi3/image/upload/v1553852904/fav-icons/trash.png"
              title="
            remove"
            >
          </div>
          <div class="review-container">
            <div class="given-details flex">
              <div
                @click="$router.push('/userProfile/' + reference.sender.id)"
                class="profile-img"
                :style="'background-image: url(' + reference.sender.imgUrl + ')'"
              ></div>
              <div class="dry-details flex space-between">
                <div>
                  <h5
                    @click="$router.push('/userProfile/' + reference.sender.id)"
                  >{{reference.sender.firstName}}, {{reference.sender.lastName}}</h5>
                  <div>{{reference.sender.address}}</div>
                  <stars-toshow :value="reference.rating" :disabled="true"></stars-toshow>
                </div>
                <div class="created-at">{{reference.createdAt | moment("calendar")}}</div>
              </div>
            </div>
            <div
              class="content"
              :class="{'read-more-clicked': reference.isClicked}"
            >{{reference.description}}</div>
            <div
              class="read-more"
              @click="readMore(reference)"
            >{{(reference.isClicked) ? 'Read less':'Read more'}}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import StarsToshow from '../../src/components/RateStarsToShow'
export default {
  props: ['user', 'loggedUser'],
  data() {
    return {
      isFromGuestsClicked: true,
      isFromHostsClicked: false,
    }
  },
  components: {
    StarsToshow
  },
  computed: {
    revFromGuests() {
      return this.user.references.filter(rev => rev.getAsAHost);
    },
    revFromHosts() {
      return this.user.references.filter(rev => rev.getAsAGuest);
    }
  },
  methods: {
    fromGuestsToShow() {
      this.isFromGuestsClicked = true;
      this.isFromHostsClicked = false;

    },
    fromHostsToShow() {
      this.isFromHostsClicked = true;
      this.isFromGuestsClicked = false;
    },
    removeReview(reviewId, currUserId) {
      if (confirm('Are you sure you want to remove this review?')) {
        this.$store.dispatch({ type: 'removeReview', currUserId, reviewId })
      }
    },
    readMore(reference) {
      reference.isClicked = !reference.isClicked;
      this.read = !this.read;
    },
    editReview(review, currUserId) {
      this.$emit('openReviewToEdit', review);
    }
  }
};
</script>

<style lang="scss" scoped>
.references {
  width: 100%;
  border-bottom: 2px solid rgba(0, 0, 0, 0.15);
  background-color: #fff;
  div {
    .references-container {
      flex-direction: column-reverse;
    }
    .header-box {
      padding: 20px;
      margin: 0px;
      text-align: left;
      font-weight: bold;
      font-size: 1em;
    }
    .filter {
      padding: 20px;
      .from-guests,
      .from-hosts {
        font-size: 1em;
        margin: 0 10px 0 30px;
        cursor: pointer;
        transition: 0.2s;
        &:hover {
          color: orangered;
        }
        &:hover div {
          background-color: orangered;
        }
      }
    }
    .reference {
      .edit-delete-container {
        align-items: center;
        align-self: flex-end;
        justify-self: center;
        margin-right: 30px;
        .btn-edit {
          width: 30px;
          height: 30px;
          margin: 20px;
          cursor: pointer;
        }
        .delete-review {
          cursor: pointer;
          font-size: 2rem;
          color: rgb(175, 169, 169);
        }
      }
      .review-container {
        padding: 20px;
        .given-details {
          width: 100%;
          .profile-img {
            min-width: 70px;
            height: 70px;
            cursor: pointer;
            border-radius: 50%;
            margin: 0 20px 20px 20px;
            background-size: cover;
            background-repeat: no-repeat;
          }
          h5 {
            cursor: pointer;
          }
          .created-at {
            padding-right: 20px;
          }
          @media (max-width: 568px) {
            .created-at {
              padding-right: 0;
              text-align: center;
            }
          }
          .dry-details {
            width: 100%;
          }
        }
        @media (max-width: 568px) {
          .given-details {
            flex-direction: column;
          }
        }
        .content {
          margin: 30px 50px 30px 110px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        @media (max-width: 568px) {
          .content {
            margin: 10px;
          }
        }
        .read-more-clicked {
          white-space: normal;
          overflow: visible;
          text-overflow: clip;
        }
        .read-more {
          float: right;
          width: 110px;
          padding-right: 20px;
          margin-bottom: 20px;
          cursor: pointer;
          font-weight: bold;
          transition: 0.2s;
          &:hover {
            color: orangered;
          }
        }
      }
    }
  }
}
.num-from-guests,
.num-from-hosts {
  background-color: #2f3e4e;
  color: white;
  border-radius: 50%;
  min-width: 25px;
  height: 25px;
  text-align: center;
  margin-left: 10px;
  padding-top: 4px;
  transition: 0.2s;
}

.filter-clicked {
  color: orangered;
  div {
    background-color: orangered;
  }
}
</style>
