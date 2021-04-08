import { MockTemplate, Request } from '../../plugins/vite-plugin-mock';

export default [
    {
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
    },
    {
        url: '/api/login',
        method: 'GET',
        handle: () => {
            return {
                statusCode: 200,
                data: {
                    data: '',
                    message: 'success'
                }
            };
        }
    }
] as MockTemplate[];
