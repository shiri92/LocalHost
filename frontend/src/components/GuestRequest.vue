<template>
  <section class="guest-request">
    <div class="top flex space-between align-center">
      <h1>Request To Stay</h1>
      <span @click="$emit('requestOff')">&times;</span>
    </div>
    <hr>
    <div class="content flex flex-col">
      <el-form :inline="false" :model="requestInfo" class="demo-form-inline">
        <b-form-group class="input" required>
          Start Date:
          <b-form-input type="date" v-model="requestInfo.startDate" required/>End Date:
          <b-form-input type="date" v-model="requestInfo.endDate" required/>
        </b-form-group>

        <b-form-group class="input" required>
          <b-form-textarea
            id="textarea"
            v-model="requestInfo.message"
            placeholder="Write a Message..."
            rows="3"
            max-rows="6"
            required
          />
        </b-form-group>

        <div class="btn-container flex justify-center">
          <button class="btn" @click="onSendRequest">Send Request</button>
        </div>
      </el-form>
    </div>
  </section>
</template>

<script>
export default {
  name: "guest-request",
  data() {
    return {
      requestInfo: {
        startDate: "",
        endDate: "",
        message: ""
      }
    };
  },
  methods: {
    async onSendRequest() {
      if (!this.getLoggedUser) {
        const Toast = this.$swal.mixin({
          toast: true,
          position: "bottom-start",
          showConfirmButton: false,
          timer: 3000
        });

        Toast.fire({
          type: "info",
          title: `Please Sign In To Send Request...`
        });
        return;
      }
      if (!this.checkForm()) return;
      let request = {
        isAccepted: false,
        info: this.requestInfo,
        sender: {
          id: this.getLoggedUser._id,
          firstName: this.getLoggedUser.firstName,
          lastName: this.getLoggedUser.lastName,
          address: JSON.parse(JSON.stringify(this.getLoggedUser.address)),
          imgUrl: this.getLoggedUser.imgUrl,
          startDate: this.requestInfo.startDate,
          endDate: this.requestInfo.endDate
        },
        recipient: {
          id: this.getCurrUser._id,
          firstName: this.getCurrUser.firstName,
          lastName: this.getCurrUser.lastName
        }
      };
      this.$emit("sendRequest");
      await this.$store
        .dispatch({ type: "addRequest", request: request })
        .then(() => {
          const Toast = this.$swal.mixin({
            toast: true,
            position: "bottom-start",
            showConfirmButton: false,
            timer: 3000
          });

          Toast.fire({
            type: "success",
            title: `The Request Was Sent Successfully`
          });
        });
    },
    checkForm() {
      return (
        this.requestInfo.startDate &&
        this.requestInfo.endDate &&
        this.requestInfo.message
      );
    },
  },
  computed: {
    getLoggedUser() {
      return this.$store.getters.loggedUser;
    },
    getCurrUser() {
      return this.$store.getters.currUser;
    }
  }
};
</script>

<style lang="scss" scoped>
.guest-request {
  z-index: 10;
  position: fixed;
  top: 40%;
  left: 50%;
  width: 30%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transform: translate(-50%, -50%);
  border-radius: 10px;
  background-color: white;
  color: rgb(62, 62, 62);
}
@media (max-width: 1200px) {
  .guest-request {
    width: 40%;
  }
}
@media (max-width: 768px) {
  .guest-request {
    width: 60%;
  }
}
@media (max-width: 568px) {
  .guest-request {
    width: 90%;
  }
}

.top {
  padding: 10px 30px 10px 30px;
  background-color: #1dbf73;
  border-radius: 5px 5px 0 0;
}

h1 {
  font-size: 1.5rem;
  margin: 0;
  color: #fff;
}

hr {
  margin: 0;
}

span {
  cursor: pointer;
  font-size: 2.5rem;
  color: #fff;
}

.content {
  padding: 30px 30px 0 30px;
}

.input {
  margin: 0 30px 30px 30px;
}

.btn-container {
  margin: 30px;
  .btn {
    width: 100%;
  }
}
</style>
