import { MockTemplate } from '../../plugins/vite-plugin-mock';
import { userInfo } from './account';

export default [
    {
        url: '/user/profile',
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
    }
] as MockTemplate[];
