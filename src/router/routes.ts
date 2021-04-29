import VueRouter from 'vue-router';
import BasicLayout from '@/layouts/basic-layout/index.vue';
import BlankLayout from '@/layouts/blank-layout/index.vue';

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
                path: 'search',
                name: 'search',
                component: () => import('@/views/home/index.vue')
            },
            {
                path: 'articles',
                name: 'articles',
                component: () => import('@/views/articles/index.vue')
            },
            {
                path: 'projects',
                name: 'projects',
                component: () => import('@/views/home/index.vue')
            },
            {
                path: 'user',
                component: BlankLayout,
                children: [
                    {
                        path: '',
                        name: 'user-setting',
                        component: () =>
                            import('@/views/user/setting/index.vue')
                    },
                    {
                        path: 'password',
                        name: 'password-change',
                        component: () =>
                            import('@/views/user/setting/index.vue')
                    },
                    {
                        path: 'articles',
                        component: BlankLayout,
                        children: [
                            {
                                path: '',
                                name: 'user-articles',
                                component: () =>
                                    import('@/views/user/articles/index.vue')
                            },
                            {
                                path: 'add',
                                name: 'user-articles-add',
                                component: () =>
                                    import('@/views/user/articles/edit.vue')
                            },
                            {
                                path: 'edit/:id',
                                name: 'user-articles-edit',
                                component: () =>
                                    import('@/views/user/articles/edit.vue')
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

const routes: VueRouter.RouteRecordRaw[] = [
    ...frameOutRoutes,
    ...frameInRoutes
];

export default routes;
