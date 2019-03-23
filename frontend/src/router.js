import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Profiles from './views/Profiles.vue';
import Signup from './views/Signup.vue';
// import Login from './components/Login/vue';
import PersonalProfile from './components/PersonalProfile.vue';
import ProfileAbout from './components/ProfileAbout.vue';
import ProfileMyHome from './components/ProfileMyHome.vue';
import ProfilePictures from './components/ProfilePictures.vue';
import ProfileReferences from './components/ProfileReferences.vue';

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/about', name: 'about', component: About },
        { path: '/profiles/:name', name: 'profiles', component: Profiles },
        { path: '/signup', name: 'signup', component: Signup },
        // { path: '/login', name: 'login', component: Login },
        {
            path: '/profile/:userId', component: PersonalProfile,
            children:
                [
                    { path: '/profile/:userId/profile-about', name: 'profileAbout', component: ProfileAbout },
                    { path: '/profile/:userId/profile-myHome', name: 'profileMyHome', component: ProfileMyHome },
                    { path: '/profile/:userId/profile-pictures', name: 'profilePictures', component: ProfilePictures },
                    { path: '/profile/:userId/profile-references', name: 'profileReferences', component: ProfileReferences },
                ]
        }
    ]
})