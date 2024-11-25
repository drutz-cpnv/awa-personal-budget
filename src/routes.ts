import { createMemoryHistory, createRouter, Router, RouteRecordRaw } from 'vue-router';
import Home from './components/Home.vue';

const routes: Array<RouteRecordRaw> = [
    { path: '/', component: Home },
    { path: '/home', component: Home },
];

const router: Router = createRouter({
    history: createMemoryHistory(),
    routes,
});

export default router;