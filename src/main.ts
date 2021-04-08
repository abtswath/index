import { createApp } from 'vue';
import Antd from 'ant-design-vue';

import store from './store';
import router from '@/router';
import i18n from '@/i18n';

import '@/styles/index.less';

import App from './App.vue';
import config from './config';

document.title = config.appName;
const app = createApp(App);

app.use(store).use(router).use(Antd).use(i18n);

app.mount('#app');
