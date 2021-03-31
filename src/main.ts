import { createApp } from 'vue';
import Antd from 'ant-design-vue';

import store from './store';
import router from '@/router';
import i18n from '@/i18n';

import 'ant-design-vue/dist/antd.css';
import App from './App.vue';

const app = createApp(App);

app.use(store)
    .use(router)
    .use(Antd)
    .use(i18n);

app.mount('#app');
