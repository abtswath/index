import routes from './routes';
import { createRouter, createWebHistory } from 'vue-router';
import nProgress from 'nprogress';

const router = createRouter({
    history: createWebHistory(),
    routes
});

nProgress.configure({
    showSpinner: false
});

router.beforeEach(() => {
    nProgress.start();
});
router.afterEach(() => {
    nProgress.done();
});

export default router;
