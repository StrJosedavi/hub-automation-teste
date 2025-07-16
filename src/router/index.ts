import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import NotFound from '../views/NotFound.vue';
import Dashboard from '../views/Dashboard.vue';
import About from '../views/About.vue';
import Projects from '../views/Projects.vue';
import Reports from '../views/Reports.vue';
import Tests from '../views/Tests.vue';

export const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    { path: '/', component: Home },
    { path: '/dashboard', component: Dashboard },
    { path: '/About', component: About },
    { path: '/Projects', component: Projects },
    { path: '/Reports', component: Reports },
    { path: '/Tests', component: Tests },
    { path: '/:pathMatch(.*)*', component: NotFound }
  ],
});
