/* ----- DEPEND -----*/
import userService from "../services/userService.js";

export default {
  state: {
    users: [],
    currUser: null,
    loggedUser: null
  },
  getters: {
    users(state) {
      return state.users;
    },
    user(state) {
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
    setUsers(state, { users }) {
      state.users = users;
    },
    setUser(state, { user }) {
      state.currUser = user;
    },
    setProfileImg(state, { imgUrl }) {
      state.currUser.imgUrl = imgUrl;
    }
  },
  actions: {
    async checkLogged(context) {
      let user = await userService.checkLogged();
      context.commit({ type: "setLoggedUser", user });
      console.log("Successfuly Logged In: ", user);
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
      context.commit({ type: "setUsers", users });
    },
    async loadUser(context, { userId }) {
      let user = await userService.getById(userId);
      context.commit({ type: "setUser", user });
    },
    async addRequest(context, payload) {
      await userService.addRequest(payload);
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
    async updateProfileImg(context, { imgUrl, userId }) {
      await userService.updateProfileImg(imgUrl, userId);
      context.commit({ type: 'setProfileImg', imgUrl })
    },

  }
};
