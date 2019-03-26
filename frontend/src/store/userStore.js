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
    setCurrUserImg(state, { imgUrl }) {
      state.currUser.imgUrl = imgUrl;
    },
    setLoggedUserImg(state, { imgUrl }) {
      state.loggedUser.imgUrl = imgUrl;
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
      // add to front...
      // show friendly tiny modal...
    },
    async removeRequest(context, guestId) { // by id
      // remove from front...
      // show friednky tiny modal...
    },
    async BookGuest(context, request) {
      // get request (with guestId, hostId), register the guest to the host...

    },
    async BookHost(context, request) {
      // get request (with guestId, hostId), register the host to the guest...
    },
    async updateUserImg(context, { imgUrl, userId }) {
      await userService.updateUserImg(imgUrl, userId);
      // context.commit({ type: 'setCurrUserImg', imgUrl })
      context.commit({ type: 'setLoggedUserImg', imgUrl })
    },

  }
};
