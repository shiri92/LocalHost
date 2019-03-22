import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Profiles from './views/Profiles.vue';
import PersonalProfile from './components/PersonalProfile.vue';

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/profiles/:name',
            name: 'profiles',
            component: Profiles
        },
        {
            path: '/profile/:userId',
            component: PersonalProfile
        }
    ]
})