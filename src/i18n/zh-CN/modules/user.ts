import { LocaleMessageDictionary } from '@intlify/core-base';
import { VueMessageType } from 'vue-i18n';

export default {
    profile: {
        username: {
            label: '用户名'
        },
        name: {
            label: '姓名',
            empty: '请填写姓名'
        },
        email: {
            label: '邮箱',
            empty: '请填写邮箱',
            invalid: '邮箱格式错误'
        },
        description: {
            label: '描述',
            invalid: '描述不能超过200字'
        }
    }
} as LocaleMessageDictionary<VueMessageType>;
