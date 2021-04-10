import request from '../request';

interface Profile {
    username: string;
    avatar?: string;
    name: string;
    email: string;
    description: string;
}

export { Profile };

export default {
    getProfile() {
        return request.get<Profile>('/user/profile');
    },
    saveProfile(data: Profile) {
        return request.put('/user/profile', data);
    }
};
