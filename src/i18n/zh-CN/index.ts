import { LocaleMessages } from '@intlify/core-base';
import { VueMessageType } from 'vue-i18n';
import account from './modules/account';
import header from './modules/header';
import home from './modules/home';

const messages: LocaleMessages<VueMessageType> = {
    account,
    header,
    home
};

export default messages;
