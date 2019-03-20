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
            state.users = users
        }
    },
    actions: {
        async loadUsers(context) {
            let users = await userService.query();
            context.commit({ type: 'setUsers', users });
        }
    }
}