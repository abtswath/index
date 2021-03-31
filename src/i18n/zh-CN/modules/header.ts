import { LocaleMessageDictionary } from "@intlify/core-base";
import { VueMessageType } from "vue-i18n";

const header: LocaleMessageDictionary<VueMessageType> = {
    menu: {
        home: '首页',
        articles: '文章',
        projects: '项目空间'
    },
    searchInputPlaceholder: '请输入关键字...'
}

export default header;