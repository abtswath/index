import routes from './routes';
import { createRouter, createWebHistory } from 'vue-router';
import nProgress from 'nprogress';
import store from '@/store';

const router = createRouter({
    history: createWebHistory(),
    routes
});

nProgress.configure({
    showSpinner: false
});

router.beforeEach((to, from, next) => {
    nProgress.start();
    if (store.getters['account/session'] === true) {
        if (to.name === 'login') {
            next({ name: 'home' });
            return;
        }
        next();
        return;
    }
    if (to.name !== 'login') {
        next({ name: 'login' });
        return;
    }
    next();
});
router.afterEach(() => {
    nProgress.done();
});

export default router;
