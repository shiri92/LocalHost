import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Users from './views/Users.vue';
import Signup from './views/Signup.vue';
import UserProfile from './components/UserProfile.vue';

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/about', name: 'about', component: About },
        { path: '/signup', name: 'signup', component: Signup },
        { path: '/users/:name', name: 'users', component: Users },
        { path: '/userProfile/:userId', name: 'userProfile', component: UserProfile, }
    ]
})