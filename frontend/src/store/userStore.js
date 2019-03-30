/* ----- DEPEND -----*/
import userService from '../services/userService.js';
import socketService from '../services/socketService.js';

export default {
  state: {
    currSocket: [],
    currUsers: [],
    currUser: null,
    loggedUser: null
  },
  getters: {
    currUsers(state) {
      return state.currUsers;
    },
    currUser(state) {
      return state.currUser;
    },
    loggedUser(state) {
      return state.loggedUser;
    }
  },

  mutations: {
    setLoggedUser(state, { user }) {
      state.loggedUser = user;
      if (user) {
        let { _id } = user;
        state.currSocket = socketService.connect(_id);
        state.currSocket.on('sendRequest', (request) => {
          this.commit({ type: "addRequest", request });
        });
        state.currSocket.on('sendReview', (review) => {
          // if user on the profile of the one got reviewd
          if (state.currUser._id === review.recipient.id)
            this.commit({ type: "addReview", review });
        });
      }
    },
    logout(state) {
      state.loggedUser = null;
      state.currSocket.disconnect();
      state.currSocket = null;;
    },
    setCurrUsers(state, { users }) {
      state.currUsers = users;
    },
    setCurrUser(state, { user }) {
      state.currUser = user;
    },
    // updateCurrUser(state, { user }) {
    //   var idx = state.currUsers.findIndex(currUser => currUser._id === user._id);
    //   state.currUsers.splice(idx, 1, user);
    // },
    setCurrUserImg(state, { imgUrl }) {
      state.currUser.imgUrl = imgUrl;
    },
    setLoggedUserImg(state, { imgUrl }) {
      state.loggedUser.imgUrl = imgUrl;
    },
    addRequest(state, { request }) {
      state.loggedUser.requests.push(request);
    },
    addReview(state, { review }) {
      state.currUser.references.push(review);
    },
    removeRequest(state, { _id }) {
      let idx = state.loggedUser.requests.findIndex(request => request._id === _id);
      state.loggedUser.requests.splice(idx, 1);
    },
    removeReview(state, { reviewId }) {
      let idx = state.currUser.references.findIndex(review => reviewId === review._id);
      state.currUser.references.splice(idx, 1);
    },
    toggleIsAccepted(state, { _id }) {
      let idx = state.loggedUser.requests.findIndex(request => request._id === _id);
      let newReq = JSON.parse(JSON.stringify(state.loggedUser.requests[idx]));
      newReq.isAccepted = true;
      state.loggedUser.requests.splice(idx, 1, newReq);
    },

  },
  actions: {
    async checkLogged(context) {

      let user = await userService.checkLogged();
      context.commit({ type: "setLoggedUser", user });
      return user;

    },
    async login(context, { credentials }) {
      let user = await userService.login(credentials);
      context.commit({ type: "setLoggedUser", user });
      return user;
    },
    async logout(context) {
      await userService.logout();
      context.commit({ type: "logout" });

    },
    async signup(context, { credentials }) {
      let user = await userService.add(credentials);
      let { email } = user;
      let { password } = user;
      await context.dispatch({
        type: "login", credentials: { email, password }
      });
    },
    async loadUsers(context, { city, country }) {
      let users = await userService.query(city, country);
      context.commit({ type: "setCurrUsers", users });
    },
    async loadUser(context, { userId }) {
      let user = await userService.getById(userId);
      context.commit({ type: "setCurrUser", user });
    },
    async updateLoggedUser(context, { user }) {
      await userService.update(user);
      context.commit({ type: "setLoggedUser", user });
    },
    // async updateCurrUser(context, { user }) {
    //   await userService.update(user);
    //   context.commit({ type: "updateCurrUser", user });
    // },
    async updateLoggedUserImg(context, { imgUrl, userId }) {
      await userService.updateUserImg(imgUrl, userId);
      context.commit({ type: "setLoggedUserImg", imgUrl });
    },
    async addRequest(context, { request }) {
      let res = await userService.addRequest(request);
      context.state.currSocket.emit('sendRequest', res);
      // TODO: show sweet alert...
    },
    async removeRequest(context, { request }) {
      let { _id } = request;
      let { recipient } = request;
      await userService.removeRequest(recipient.id, _id);
      context.commit({ type: "toggleIsAccepted", _id });
      // TODO: show sweet alert...
    },
    async addReview(context, { review }) {
      let res = await userService.addReview(review);
      let { _id } = context.state.currUser;
      context.state.currSocket.emit('sendReview', res, _id);
      // context.commit({ type: "addReview", res });
      // TODO: show sweet alert...
    },
    async removeReview(context, { currUserId, reviewId }) {
      await userService.removeReview(currUserId, reviewId);
      context.commit({ type: "removeReview", reviewId });
      // TODO: show sweet alert...
    },

    async updateReview(context, { currUserId, review }) {
      await userService.updateReview(currUserId, review);
      // context.commit({ type: "updateReview", review });
    },

    async bookGuest(context, { request }) {
      let { sender, recipient } = request;
      await userService.bookGuest(sender, recipient);
      // TODO: update frontend...
      // TODO: show sweet alert...
    },
    async bookHost(context, { request }) {
      let { sender, recipient } = request;
      await userService.bookHost(sender, recipient);
      // TODO: update frontend...
      // TODO: show sweet alert...
    },

  }
};
