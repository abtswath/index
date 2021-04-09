import request from '../request';

interface Project {
    id: number;
    title: string;
    author: string;
}

export { Project };

export default {
    getProjects() {
        return request.get<Project[]>('/projects');
    }
};
