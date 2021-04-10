import utils from '@/utils';
import { ActionContext, Module } from 'vuex';
import VueI18n from '@/i18n';
import { State } from '..';

interface LocaleState {
    locale: string
}

const i18n: Module<LocaleState, State> = ({
    namespaced: true,
    state: {
        locale: ''
    },
    actions: {
        initialize({ state }: ActionContext<LocaleState, State>) {
            let locale = utils.db.get('locale').value();
            state.locale = locale;
            VueI18n.global.locale = locale;
        },
        setLocale({ state }: ActionContext<LocaleState, State>, locale = 'zh-CN') {
            state.locale = locale;
            VueI18n.global.locale = locale;
            utils.db.set('locale', locale).write();
        }
    }
});

export default i18n;
