import { MockTemplate, Request } from '../plugins/vite-plugin-mock';

const loginMock: MockTemplate = {
    url: '/api/login',
    method: 'POST',
    handle: ({ body }: Request) => {
        if (body?.username !== 'admin' || body?.password !== '123456') {
            return {
                statusCode: 400,
                data: {
                    data: '',
                    message: '用户名或密码错误'
                }
            };
        }
        return {
            statusCode: 200,
            data: {
                data: '',
                message: 'success'
            }
        };
    }
};

export default [loginMock] as MockTemplate[];
