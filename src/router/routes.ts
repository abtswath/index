import VueRouter from 'vue-router';
import BasicLayout from '@/layouts/basic-layout/index.vue';

const frameOutRoutes: VueRouter.RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/account/login.vue')
    },
    {
        path: '/password_reset',
        name: 'password_reset',
        component: () => BasicLayout
    }
];

const frameInRoutes: VueRouter.RouteRecordRaw[] = [
    {
        path: '/',
        component: BasicLayout,
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('@/views/home/index.vue')
            },
            {
                path: 'articles',
                name: 'articles',
                component: () => import('@/views/articles/index.vue'),
            },
            {
                path: 'projects',
                name: 'projects',
                component: () => import('@/views/home/index.vue')
            }
        ]
    }
];

const routes: VueRouter.RouteRecordRaw[] = [
    ...frameOutRoutes,
    ...frameInRoutes
];

export default routes;
