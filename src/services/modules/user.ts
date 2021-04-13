import request from '../request';

interface Profile {
    username: string;
    avatar?: string | File;
    name: string;
    email: string;
    description: string;
}

export { Profile };

export default {
    saveProfile(data: Profile) {
        return request.put('/users/profile', data);
    }
};
