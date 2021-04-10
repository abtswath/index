import { Pagination } from '..';
import request from '../request';

interface Project {
    id: number;
    title: string;
    author: string;
}

export { Project };

export default {
    getProjects(page: number) {
        return request.get<Pagination<Project>>('/projects', {
            params: {
                page
            }
        });
    }
};
