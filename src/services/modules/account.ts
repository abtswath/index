import request from '../request';
import { Profile } from './user';

interface LoginForm {
    username: string;
    password: string;
}

export { LoginForm };

export default {
    login(body: LoginForm) {
        return request.post<Profile>('/login', body);
    },
    checkLogin() {
        return request.get('/login');
    }
};
