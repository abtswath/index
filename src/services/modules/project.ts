import request from '../request';

interface Project {
    id: number;
    title: string;
    author: string;
}

export { Project };

export default {
    getProjects<T>() {
        return request.get<T>('/projects');
    }
};
