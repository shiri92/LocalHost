/* ----- DEPEND -----*/
import userService from "../services/userService.js";

export default {
  state: {
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
    },
    logout(state) {
      state.loggedUser = null;
    },
    setCurrUsers(state, { users }) {
      state.currUsers = users;
    },
    setCurrUser(state, { user }) {
      state.currUser = user;
    },
    addRequest(state, { request }) {
      state.currUser.requests.push(request);
    },
    addReview(state, { res }) {
      state.currUser.references.push(res);
    },
    setCurrUserImg(state, { imgUrl }) {
      state.currUser.imgUrl = imgUrl;
    },
    setLoggedUserImg(state, { imgUrl }) {
      state.loggedUser.imgUrl = imgUrl;
    },
    removeReview(state, { reviewId }) {
      let currReviewIdx = state.currUser.references.findIndex(
        review => reviewId === review._id
      );
      state.currUser.references.splice(currReviewIdx, 1);
    }
  },
  actions: {
    async checkLogged(context) {
      let user = await userService.checkLogged();
      context.commit({ type: "setLoggedUser", user });
    },
    async login(context, { credentials }) {
      let user = await userService.login(credentials);
      context.commit({ type: "setLoggedUser", user });
    },
    async logout(context) {
      await userService.logout();
      context.commit({ type: "logout" });
    },
    async signup(context, { credentials }) {
      let user = await userService.add(credentials);
      context.commit({ type: "setLoggedUser", user });
    },
    async loadUsers(context, { city, country }) {
      let users = await userService.query(city, country);
      context.commit({ type: "setCurrUsers", users });
    },
    async loadUser(context, { userId }) {
      let user = await userService.getById(userId);
      context.commit({ type: "setCurrUser", user });
    },
    async addRequest(context, { request }) {
      await userService.addRequest(request);
      context.commit({ type: "addRequest", request });
      // TODO: show sweet alert...
    },
    async addReview(context, { review }) {
      let res = await userService.addReview(review);
      context.commit({ type: "addReview", res });
    },
    async removeReview(context, { currUserId, reviewId }) {
      await userService.removeReview(currUserId, reviewId);
      context.commit({ type: "removeReview", reviewId });
    },
    async removeRequest(context, guestId) {
      // TODO: update backend...
      // TODO: update frontend...
      // TODO: show sweet alert...
    },
    async bookGuest(context, { request }) {
      let { sender, recipient } = request;
      await userService.bookGuest(sender, recipient);
      await userService.removeRequest(sender, recipient);
      // TODO: update frontend...
      // TODO: show sweet alert...
    },
    async bookHost(context, { request }) {
      let { sender, recipient } = request;
      await userService.bookHost(sender, recipient);
      // TODO: update frontend...
      // TODO: show sweet alert...
    },
    async updateUserImg(context, { imgUrl, userId }) {
      await userService.updateUserImg(imgUrl, userId);
      // context.commit({ type: 'setCurrUserImg', imgUrl })
      context.commit({ type: "setLoggedUserImg", imgUrl });
    }
  }
};
