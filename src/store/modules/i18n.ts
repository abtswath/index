import utils from '@/utils';
import { ActionContext, Module } from 'vuex';
import VueI18n from '@/i18n';

interface State {
    locale: string
}

const i18n: Module<State, State> = ({
    namespaced: true,
    state: {
        locale: ''
    },
    actions: {
        initializeLocale({ state }: ActionContext<State, State>) {
            let locale = utils.db.get('locale').value();
            state.locale = locale;
            VueI18n.global.locale = locale;
        },
        setLocale({ state }: ActionContext<State, State>, locale = 'zh-CN') {
            state.locale = locale;
            VueI18n.global.locale = locale;
            utils.db.set('locale', locale).write();
        }
    }
});

export default i18n;
