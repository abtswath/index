import request from '../request';

interface LoginForm {
    username: string;
    password: string;
}

export { LoginForm };

export default {
    login(body: LoginForm) {
        return request.post('/api/login', body);
    },
    checkLogin() {
        return request.get('/api/login');
    }
};
