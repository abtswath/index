import VueRouter from 'vue-router';

const frameRoutes: VueRouter.RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/index.vue')
    }
];


const routes: VueRouter.RouteRecordRaw[] = [
    ...frameRoutes
];

export default routes;