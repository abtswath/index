import { LocaleMessageDictionary } from "@intlify/core-base";
import { VueMessageType } from "vue-i18n";

const header: LocaleMessageDictionary<VueMessageType> = {
    menu: {
        home: 'Home',
        articles: 'Articles',
        projects: 'Projects'
    },
    searchInputPlaceholder: 'input something here...'
}

export default header;