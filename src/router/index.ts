import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Sheets from "@/views/Sheets.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue'),
    },
    {
        path: '/sheets',
        name: 'Sheet',
        component: Sheets,
    },
];

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes,
});

export default router
