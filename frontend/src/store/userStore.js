/* ----- DEPEND -----*/
import userService from "../services/userService.js";
import socketService from "../services/socketService.js";
import utilService from '../services/utilService.js';
import cloudService from '../services/cloudService.js';
import eventBus from '../services/eventbus-service.js';

export default {
  state: {
    currSocket: null,
    loggedUser: null,
    currUser: null,
    currUsers: [],
    homeUsers: []
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
        isOpen: false,
        createdAt: Date.now(),
        source: {
          id: state.loggedUser._id,
          firstName: state.loggedUser.firstName,
          lastName: state.loggedUser.lastName,
          imgUrl: state.loggedUser.imgUrl,
          address: state.loggedUser.address
        }
      };
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
          placeDetails: state.loggedUser.placeDetails
        }
      };
    },
    emptyReview(state) {
      return {
        isClicked: false,
        getAsAHost: false,
        getAsAGuest: false,
        rating: 0,
        description: "",
        source: {
          id: state.loggedUser._id,
          firstName: state.loggedUser.firstName,
          lastName: state.loggedUser.lastName,
          imgUrl: state.loggedUser.imgUrl,
          address: state.loggedUser.address
        }
      };
    }
  },

  mutations: {
    setLoggedUser(state, { user }) {
      state.loggedUser = user;
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
    setPortrait(state, { imgUrl }) {
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
    deleteReview(state, { reviewId }) {
      let idx = state.currUser.references.findIndex(review => reviewId === review._id);
      state.currUser.references.splice(idx, 1);
    },
    updateReview(state, { review }) {
      let idx = state.currUser.references.findIndex(currReview => review._id === currReview._id);
      state.currUser.references.splice(idx, 1, review);
    },
    initCurrSocket(state, { user }) {
      let { _id } = user;
      state.currSocket = socketService.connect(_id);

      state.currSocket.on("sendRequest", request => {
        this.commit({ type: "addPendingRequest", request });
        let msg = 'You got a new request! for more check out your manager inbox...';
        let link = '/userProfile/' + state.loggedUser._id + '/manager/managerInbox';
        eventBus.$emit('popToast', 'info', 'bottom-start', 6000, msg, link);
      });

      state.currSocket.on("sendResponse", response => {
        this.commit({ type: "addAcceptedResponse", response });
        let msg = `${response.source.firstName} ${response.source.lastName} approved your request! for more check out your hosts manager...`;
        let link = '/userProfile/' + state.loggedUser._id + '/manager/managerHosts';
        eventBus.$emit('popToast', 'info', 'bottom-start', 6000, msg, link);
      });

      state.currSocket.on("postReview", (review, targetId) => {
        if (state.currUser._id === targetId) this.commit({ type: "addReview", review });
        if (state.loggedUser._id === targetId) {
          let msg = 'You got a new reference! for more check out your profile...';
          let link = '/userProfile/' + state.loggedUser._id;
          eventBus.$emit('popToast', 'info', 'bottom-start', 6000, msg, link);
        }
      });

      state.currSocket.on("unpostReview", (reviewId, targetId) => {
        if (state.currUser._id === targetId) this.commit({ type: "deleteReview", reviewId });
      });
      state.currSocket.on("editReview", (review, targetId) => {
        if (state.currUser._id === targetId) this.commit({ type: "updateReview", review });
      });
    }
  },
  actions: {
    async checkLogged(context) {
      let user = await userService.checkLogged();
      if (user) {
        context.commit({ type: "setLoggedUser", user });
        context.commit({ type: "initCurrSocket", user });
      }
    },
    async login(context, { credentials }) {
      let user = await userService.login(credentials);
      if (user) {
        context.commit({ type: "setLoggedUser", user });
        context.commit({ type: "initCurrSocket", user });
      }
      return user;
    },
    async logout(context) {
      await userService.logout();
      context.state.loggedUser = null;
      context.state.currSocket.disconnect();
      context.state.currSocket = null;
    },
    async signup(context, { credentials }) {
      let user = await userService.add(credentials);
      let { email } = user;
      let { password } = user;
      await context.dispatch({
        type: "login",
        credentials: { email, password }
      });
    },
    async loadUsers(context, { city, country }) {
      let users = await userService.query(city, country);
      context.commit({ type: "setCurrUsers", users });
    },
    async loadUser(context, { userId }) {
      let user = await userService.getById(userId);
      context.commit({ type: "setCurrUser", user });
      return user;
    },
    async loadHomeUser(context, { userId }) {
      let user = await userService.getById(userId);
      context.commit({ type: "setHomeUser", user });
    },
    async sendRequest(context, { request, targetId }) {
      request.arrivalDate = utilService.getTimeStamp(request.arrivalDate);
      request.leavingDate = utilService.getTimeStamp(request.leavingDate);
      let res = await userService.sendRequest(request, targetId);
      context.state.currSocket.emit("sendRequest", targetId, res);
    },
    async cancelRequest(context, { request, targetId }) {
      // TODO
    },
    async acceptRequest(context, { request, targetId }) {
      await userService.acceptRequest(request, targetId);
      request.isAccepted = true; // fire the fade animation
      setTimeout(() => {
        context.commit({
          type: "deletePendingRequest",
          requestId: request._id
        });
        context.commit({ type: "addAcceptedRequest", request });
      }, 1000);
    },
    async declineRequest(context, { request, targetId }) {
      await userService.declineRequest(request._id, targetId);
      request.isAccepted = true; // fire the fade animation
      setTimeout(() => {
        context.commit({
          type: "deletePendingRequest",
          requestId: request._id
        });
      }, 1000);
    },
    async sendResponse(context, { response, targetId }) {
      let res = await userService.sendResponse(response, targetId);
      context.state.currSocket.emit("sendResponse", targetId, res);
    },
    async postReview(context, { review, targetId }) {
      let res = await userService.postReview(review, targetId);
      context.state.currSocket.emit("postReview", res, targetId);
    },
    async unpostReview(context, { currUserId, reviewId }) {
      await userService.unpostReview(currUserId, reviewId);
      context.state.currSocket.emit("unpostReview", reviewId, currUserId);
    },
    async editReview(context, { currUserId, review }) {
      await userService.editReview(currUserId, review);
      context.state.currSocket.emit("editReview", review, currUserId);
    },
    async updateLoggedUser(context, { user }) {
      await userService.update(user);
      context.commit({ type: "setLoggedUser", user });
    },
    async updatePortrait(context, { imgFile, imgPath, targetId }) {
      let imgUrl = await cloudService.uploadPortrait(imgFile, imgPath);
      await userService.updatePortrait(imgUrl, targetId);
      context.commit({ type: "setPortrait", imgUrl });
    }
  }
};
