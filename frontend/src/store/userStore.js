/* ----- DEPENDENCIES -----*/
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
    setUsers(state, { users }) {
      state.users = users;
    },
    setUser(state, { user }) {
      state.currUser = user;
    },
    setLoggedUser(state, { user }) {
      state.loggedUser = user;
    },
    logout(state) {
      state.loggedUser = null;
    }
  },
  actions: {
    async loadUsers(context, payload) {
      let users = await userService.query(payload.city, payload.country);
      context.commit({ type: "setUsers", users });
    },
    async loadUser(context, { userId }) {
      let user = await userService.getById(userId);
      context.commit({ type: "setUser", user });
    },
    async signup(context, { credentials }) {
      let user = await userService.add(credentials);
      context.commit({ type: "setLoggedUser", user });
      console.log("Successfuly Registered: ", user);
    },
    async login(context, { credentials }) {
      let user = await userService.login(credentials);
      context.commit({ type: "setLoggedUser", user });
      console.log("Successfuly Logged In: ", user);
    },
    async checkLogged(context) {
      let user = await userService.checkLogged();
      context.commit({ type: "setLoggedUser", user });
      console.log("Successfuly Logged In: ", user);
    },
    async logout(context) {
      await userService.logout();
      context.commit({ type: "logout" });
    },
    async addRequest(context, payload) {
      await userService.addRequest(payload);
      // show friendly tiny modal
    }
  }
};
