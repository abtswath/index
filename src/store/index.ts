import { createStore } from 'vuex';
import i18n from './modules/i18n';

const store = createStore({
    modules: {
        i18n
    }
});

export default store;
