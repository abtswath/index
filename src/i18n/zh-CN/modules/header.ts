import { LocaleMessageDictionary } from '@intlify/core-base';
import { VueMessageType } from 'vue-i18n';

const header: LocaleMessageDictionary<VueMessageType> = {
    menu: {
        home: '首页',
        articles: '文章',
        projects: '项目空间'
    },
    searchInputPlaceholder: '请输入关键字...',
    user: {
        profile: '个人中心',
        projects: '我的项目',
        articles: '我的文章',
        management: '管理后台',
        logout: '退出登录'
    }
};

export default header;
