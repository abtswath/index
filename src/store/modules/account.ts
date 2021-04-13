import { AccountService, LoginForm } from '@/services';
import utils from '@/utils';
import { ActionContext, Module } from 'vuex';
import { State } from '..';
import router from '@/router';

interface AccountState {
    session: boolean;
}

const account: Module<AccountState, State> = {
    namespaced: true,
    state: {
        session: false
    },
    getters: {
        session(state): boolean {
            return state.session;
        }
    },
    mutations: {
        session(state, status: boolean) {
            state.session = status;
        }
    },
    actions: {
        initialize({ commit }: ActionContext<AccountState, State>) {
            commit('session', Number(utils.db.get('user.session')) === 1);
        },
        login(
            { commit, dispatch }: ActionContext<AccountState, State>,
            data: LoginForm
        ) {
            return new Promise((resolve, reject) => {
                AccountService.login(data)
                    .then((response) => {
                        commit('session', true);
                        utils.db.set('user.session', true).write();
                        dispatch('user/setUserInfo', response.data, {
                            root: true
                        });
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        logout({ commit, dispatch }: ActionContext<AccountState, State>) {
            AccountService.logout()
                .then()
                .catch(() => {})
                .finally(() => {
                    commit('session', false);
                    router.push({ name: 'login' }).then(() => {
                        dispatch('user/clear', null, { root: true });
                    });
                });
        }
    }
};

export default account;
