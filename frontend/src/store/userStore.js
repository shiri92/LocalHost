/* ----- DEPENDENCIES -----*/
import userService from '../services/userService.js';

export default {
    state: {
        users: [],
    },
    getters: {
        users(state) {
            return state.users;
        }

    },
    mutations: {
        setUsers(state, { users }) {
            state.users = users;
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