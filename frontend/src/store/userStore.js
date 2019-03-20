/* ----- DEPENDENCIES -----*/
import userService from '../services/userService.js';

export default {
    state: {
        users: [],
        currUser: null,
    },
    getters: {
        users(state) {
            return state.users;
        },
        userToDisplay(state) {
            return state.currUser;
        }
        
    },
    mutations: {
        setUsers(state, { users }) {
            state.users = users;
        },
        setUser(state, payload) {
            state.currUser = payload.user;
        },
        // addUser(state, { user }) {
        //     state.users.push(user);
        // }
    },
    actions: {
        async loadUsers(context) {
            let users = await userService.query();
            context.commit({ type: 'setUsers', users });
        },
        async loadUser(context, { userId }) {
            let userPayload = await userService.getById(userId)
            context.commit({ type: 'setUser', user: userPayload.user });
            return { ...userPayload.user };
        },
        // async signup(context, { credentials }) {
        //     return UserService.addUser(credentials);
        // },
        // async login(context, { credentials }) {
        //     return UserService.login(credentials)
        //         .then(user => {
        //             context.commit({ type: 'setUser', user })
        //             return user;
        //         });
        // },
    }
}