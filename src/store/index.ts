import { createStore } from 'vuex';
import i18n from './modules/i18n';
import user from './modules/user';

export type State = any;

const store = createStore({
    modules: {
        i18n,
        user
    },
    actions: {
        initialize({ dispatch }) {
            dispatch('i18n/initialize');
            dispatch('user/initialize');
        }
    }
});

export default store;
