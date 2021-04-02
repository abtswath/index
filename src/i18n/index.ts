import { LocaleMessages } from '@intlify/core-base';
import { createI18n, VueMessageType } from 'vue-i18n';
import zhCN from './zh-CN';
import enUS from './en-US';
import config from '@/config';

export const messages: LocaleMessages<VueMessageType> = {
    'zh-CN': zhCN,
    'en-US': enUS
};

export default createI18n({
    locale: config.defaultLocale,
    falllbackLocale: config.fallbackLocale,
    messages
});
