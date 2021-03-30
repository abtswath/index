import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import Antd from 'ant-design-vue';

import router from '@/router';
import messages from '@/i18n';

import 'ant-design-vue/dist/antd.css';
import App from './App.vue';

const app = createApp(App);

const i18n = createI18n({
    locale: 'zh',
    falllbackLocale: 'en',
    messages
});

app.use(i18n);

app.use(router);

app.use(Antd);

app.mount('#app');
