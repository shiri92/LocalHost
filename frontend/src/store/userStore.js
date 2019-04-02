/* ----- DEPEND -----*/
import userService from "../services/userService.js";
import socketService from "../services/socketService.js";
import utilService from '../services/utilService.js';

export default {
  state: {
    currSocket: null,
    loggedUser: null,
    currUser: null,
    currUsers: [],
    homeUsers: [],
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
    },
    homeUsers(state) {
      return state.homeUsers;
    },
    emptyRequest(state) {
      return {
        isAccepted: false,
        source: {
          id: state.loggedUser._id,
          firstName: state.loggedUser.firstName,
          lastName: state.loggedUser.lastName,
          imgUrl: state.loggedUser.imgUrl,
          address: state.loggedUser.address,
        }
      }
    },
    emptyResponse(state) {
      return {
        isAccepted: true,
        source: {
          id: state.loggedUser._id,
          firstName: state.loggedUser.firstName,
          lastName: state.loggedUser.lastName,
          imgUrl: state.loggedUser.imgUrl,
          address: state.loggedUser.address,
          placeDetails: state.loggedUser.placeDetails,
        }
      }
    },
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
    setHomeUser(state, { user }) {
      if (state.homeUsers.length < 4) state.homeUsers.push(user);
    },
    setCurrUserImg(state, { imgUrl }) {
      state.currUser.imgUrl = imgUrl;
    },
    setLoggedUserImg(state, { imgUrl }) {
      state.loggedUser.imgUrl = imgUrl;
    },
    addPendingRequest(state, { request }) {
      state.loggedUser.pendingRequests.push(request);
    },
    addAcceptedRequest(state, { request }) {
      state.loggedUser.acceptedRequests.push(request);
    },
    addAcceptedResponse(state, { response }) {
      state.loggedUser.acceptedResponses.push(response);
    },
    addReview(state, { review }) {
      state.currUser.references.push(review);
    },
    deletePendingRequest(state, { requestId }) {
      let idx = state.loggedUser.pendingRequests.findIndex(request => request._id === requestId);
      state.loggedUser.pendingRequests.splice(idx, 1);
    },
    removeReview(state, { reviewId }) {
      let idx = state.currUser.references.findIndex(review => reviewId === review._id);
      state.currUser.references.splice(idx, 1);
    },
    updateLoggedUser(state, { user }) {
      let idx = state.currUsers.findIndex(currUser => currUser._id === user._id);
      state.currUsers.splice(idx, 1, user);
    },
    initCurrSocket(state, { user }) {
      if (user) {
        let { _id } = user;
        state.currSocket = socketService.connect(_id);

        state.currSocket.on("sendRequest", request => {
          this.commit({ type: "addPendingRequest", request });
          // TODO: show swal 'You Got New Request Check Inobx...!'
        });
        state.currSocket.on("sendResponse", response => {
          this.commit({ type: "addAcceptedResponse", response });
          // TODO: show swal '~user Approved Your Request, check host details to know more... (link)'
        });
        state.currSocket.on("sendReview", review => {
          // if user on the profile of the one got reviewd
          if (state.currUser._id === review.recipient.id)
            this.commit({ type: "addReview", review });
        });
      }
    }
  },
  actions: {
    async checkLogged(context) {
      let user = await userService.checkLogged();
      if (user) {
        context.commit({ type: 'setLoggedUser', user });
        context.commit({ type: 'initCurrSocket', user });
      }
      return user;
    },
    async login(context, { credentials }) {
      let user = await userService.login(credentials);
      if (user) {
        context.commit({ type: 'setLoggedUser', user });
        context.commit({ type: 'initCurrSocket', user });
      }
      return user;
    },
    async logout(context) {
      await userService.logout();
      context.commit({ type: "logout" });
      context.state.currSocket.disconnect();
      context.state.currSocket = null;
    },
    async signup(context, { credentials }) {
      let user = await userService.add(credentials);
      let { email } = user;
      let { password } = user;
      await context.dispatch({ type: "login", credentials: { email, password } });
    },
    async loadUsers(context, { city, country }) {
      let users = await userService.query(city, country);
      context.commit({ type: "setCurrUsers", users });
    },
    async loadUser(context, { userId }) {
      let user = await userService.getById(userId);
      context.commit({ type: "setCurrUser", user });
    },
    async loadHomeUser(context, { userId }) {
      let user = await userService.getById(userId);
      context.commit({ type: "setHomeUser", user });
    },
    async updateLoggedUserImg(context, { imgUrl, userId }) {
      await userService.updateUserImg(imgUrl, userId);
      context.commit({ type: "setLoggedUserImg", imgUrl });
    },
    async sendRequest(context, { request, targetId }) {
      request.arrivalDate = utilService.getTimeStamp(request.arrivalDate);
      request.leavingDate = utilService.getTimeStamp(request.leavingDate);
      let res = await userService.sendRequest(request, targetId);
      context.state.currSocket.emit('sendRequest', targetId, res);
    },
    async cancelRequest(context, { request, targetId }) {
      // TODO
    },
    async acceptRequest(context, { request, targetId }) {
      await userService.acceptRequest(request, targetId);
      request.isAccepted = true; // fire the fade animation
      setTimeout(() => {
        context.commit({ type: 'deletePendingRequest', requestId: request._id });
        context.commit({ type: 'addAcceptedRequest', request });
      }, 1000);
    },
    async declineRequest(context, { request, targetId }) {
      await userService.declineRequest(request._id, targetId);
      request.isAccepted = true; // fire the fade animation
      setTimeout(() => {
        context.commit({ type: 'deletePendingRequest', requestId: request._id });
      }, 1000);
    },
    async sendResponse(context, { response, targetId }) {
      let res = await userService.sendResponse(response, targetId);
      context.state.currSocket.emit('sendResponse', targetId, res)
    },
    async addReview(context, { review }) {
      let res = await userService.addReview(review);
      let { _id } = context.state.currUser;
      context.state.currSocket.emit("sendReview", res, _id);
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
    async updateUserImg(context, { imgUrl, userId }) {
      await userService.updateUserImg(imgUrl, userId);
      context.commit({ type: "setLoggedUserImg", imgUrl });
    },
    async updateLoggedUser(context, { user }) {
      await userService.update(user);
      context.commit({ type: "updateLoggedUser", user });
    }
  }
};
