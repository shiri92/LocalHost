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
        loadUsers(context) {
            let users = userService.query();
            context.commit({ type: 'setUsers', users })
        }
    }
}