import { MockTemplate, Request } from '../../plugins/vite-plugin-mock';

export const userInfo = {
    username: 'admin',
    avatar: '/src/assets/avatar.png',
    name: 'admin',
    email: 'admin@admin.com',
    description: 'description'
};

export default [
    {
        url: '/api/login',
        method: 'POST',
        handle: ({ body }: Request) => {
            if (body?.username !== 'admin' || body?.password !== '123456') {
                return {
                    statusCode: 400,
                    data: {
                        code: '000000',
                        data: '',
                        message: '用户名或密码错误'
                    }
                };
            }
            return {
                statusCode: 200,
                data: {
                    code: '000000',
                    data: userInfo,
                    message: 'success'
                }
            };
        }
    },
    {
        url: '/api/logout',
        method: 'DELETE',
        handle: () => {
            return {
                data: {
                    code: '000000',
                    data: '',
                    message: 'success'
                }
            };
        }
    }
] as MockTemplate[];
