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
        captcha: {
            label: '验证码',
            empty: '请输入验证码'
        },
        remember: '保持登录',
        forgotPassword: '忘记密码？'
    }
};

export default account;
