import { MockTemplate } from '../../plugins/vite-plugin-mock';
import { userInfo } from './account';

export default [
    {
        url: '/users/profile',
        method: 'PUT',
        handle: ({ body }) => {
            userInfo.name = body.name;
            userInfo.email = body.email;
            userInfo.description = body.description;
            return {
                data: {
                    data: '',
                    message: 'success'
                }
            };
        }
    },
    {
        url: '/api/avatar',
        method: 'POST',
        handle: () => {
            return {
                data: {
                    data: '/src/assets/avatar.png',
                    message: 'success'
                }
            }
        }
    }
] as MockTemplate[];
