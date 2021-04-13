import { createStore } from 'vuex';
import i18n from './modules/i18n';
import user from './modules/user';
import account from './modules/account';

export type State = any;

const store = createStore({
    modules: {
        i18n,
        user,
        account
    },
    actions: {
        initialize({ dispatch }) {
            dispatch('i18n/initialize');
            dispatch('account/initialize');
            dispatch('user/initialize');
        }
    }
});

export default store;
