import { LocaleMessageDictionary } from '@intlify/core-base';
import { VueMessageType } from 'vue-i18n';

const account: LocaleMessageDictionary<VueMessageType> = {
    login: {
        title: 'Login',
        button: 'Sign in',
        username: {
            label: 'Username',
            empty: 'Username cannot be empty'
        },
        password: {
            label: 'Password',
            empty: 'Password cannot be empty'
        },
        captcha: {
            label: 'Captcha',
            empty: 'Captcha cannot be empty'
        },
        remember: 'Remember me',
        forgotPassword: 'Forgot password?'
    }
};

export default account;
