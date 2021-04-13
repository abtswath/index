import { Profile } from '@/services';
import utils from '@/utils';
import { ActionContext, Module } from 'vuex';
import { State } from '..';

interface UserState {
    info: Profile | null;
}

const user: Module<UserState, State> = {
    namespaced: true,
    state: {
        info: null
    },
    getters: {
        info: (state): Profile | null => {
            return state.info;
        }
    },
    mutations: {
        info: (state, info: Profile | null) => {
            state.info = info;
        }
    },
    actions: {
        initialize({ commit }: ActionContext<UserState, State>) {
            if (utils.db.has('user.info')) {
                let info = utils.db.get('user.info').value() as Profile;
                if (info) {
                    commit('info', {
                        username: info.username || '',
                        avatar: info.avatar || '',
                        name: info.name || '',
                        email: info.email || '',
                        description: info.description || ''
                    });
                }
            }
        },
        setUserInfo(
            { commit }: ActionContext<UserState, State>,
            info: Profile | null
        ) {
            commit('info', info);
            if (info !== null) {
                utils.db.set('user.info', info).write();
            }
        },
        clear({commit}: ActionContext<UserState, State>) {
            commit('info', null);
            utils.db.unset('user').write();
        }
    }
};

export default user;
