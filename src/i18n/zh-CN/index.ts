import { LocaleMessages } from '@intlify/core-base';
import { VueMessageType } from 'vue-i18n';
import account from './modules/account';
import header from './modules/header';
import home from './modules/home';
import user from './modules/user';
import common from './modules/common';

const messages: LocaleMessages<VueMessageType> = {
    account,
    header,
    home,
    user,
    common
};

export default messages;
