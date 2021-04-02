import { LocaleMessageDictionary } from '@intlify/core-base';
import { VueMessageType } from 'vue-i18n';

const header: LocaleMessageDictionary<VueMessageType> = {
    menu: {
        home: 'Home',
        articles: 'Articles',
        projects: 'Projects'
    },
    searchInputPlaceholder: 'input something here...',
    user: {
        profile: 'Profile',
        projects: 'Projects',
        articles: 'Articles',
        management: 'Management',
        logout: 'Logout'
    }
};

export default header;
