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
    }
  },
  actions: {
    async loadUsers(context, { city }) {
      let users = await userService.query(city);
      context.commit({ type: "setUsers", users });
    },
    async loadUser(context, { userId }) {
      let user = await userService.getById(userId);
      context.commit({ type: "setUser", user });
    },
    async signup(context, { credentials }) {
      let user = await userService.add(credentials);
      console.log("successfuly registered: ", user);
    },
    async login(context, { credentials }) {
      let user = await userService.login(credentials);
      context.commit({ type: "setLoggedUser", user });
      return user;
    }
  }
};
