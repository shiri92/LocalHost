/* ----- DEPEND -----*/
import userService from "../services/userService.js";
import { log } from "util";

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
    setProfileImg(state, { cloudImgUrl }) {
      state.currUser.imgUrl = cloudImgUrl;
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
    async loadUsers(context, payload) {
      let users = await userService.query(payload.city, payload.country);
      context.commit({ type: "setUsers", users });
    },
    async loadUser(context, { userId }) {
      let user = await userService.getById(userId);
      context.commit({ type: "setUser", user });
    },
    async addRequest(context, payload) {
      await userService.addRequest(payload);
      // show friendly tiny modal
    },
    async updateProfileImg(context, { imgFile, userId }) {
      let cloudImgUrl = await userService.updateProfileImg(imgFile, userId);
      context.commit({ type: 'setProfileImg', cloudImgUrl })
    }
  }
};
