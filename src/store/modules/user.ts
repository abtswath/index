import { Profile } from '@/services';
import utils from '@/utils';
import { ActionContext, Module } from 'vuex';
import { State } from '..';

interface UserState {
    info: Profile;
}

const user: Module<UserState, State> = {
    namespaced: true,
    state: {
        info: {
            username: '',
            avatar: '',
            name: '',
            email: '',
            description: ''
        }
    },
    getters: {
        info: (state): Profile => {
            return state.info;
        }
    },
    actions: {
        initialize({ state }: ActionContext<UserState, State>) {
            if (utils.db.has('user.info')) {
                let info = utils.db.get('user.info').value() as Profile;
                if (info) {
                    state.info = {
                        username: info.username || '',
                        avatar: info.avatar || '',
                        name: info.name || '',
                        email: info.email || '',
                        description: info.description || ''
                    };
                }
            }
        },
        setUserInfo({ state }: ActionContext<UserState, State>, info: Profile) {
            state.info = info;
            utils.db.set('user.info', info).write();
        }
    }
};

export default user;
