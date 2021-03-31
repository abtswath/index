import { LocaleMessages } from '@intlify/core-base';
import { VueMessageType } from 'vue-i18n';
import header from './modules/header';
import home from './modules/home';

const messages: LocaleMessages<VueMessageType> = {
    header,
    home
}

export default messages;