import VueRouter from 'vue-router';
import BasicLayout from '@/layouts/basic-layout/index.vue';

const frameRoutes: VueRouter.RouteRecordRaw[] = [
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
                component: () => import('@/views/home/index.vue')
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
    ...frameRoutes
];

export default routes;