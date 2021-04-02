import { LocaleMessageDictionary } from '@intlify/core-base';
import { VueMessageType } from 'vue-i18n';

const account: LocaleMessageDictionary<VueMessageType> = {
    login: {
        title: '登录',
        button: '登录',
        username: {
            label: '用户名',
            empty: '请输入用户名'
        },
        password: {
            label: '密码',
            empty: '请输入密码'
        },
    }
};

export default account;
