import { MockTemplate } from '../../plugins/vite-plugin-mock';
import { Project } from '../../src/services';

export default [
    {
        method: 'GET',
        url: '/api/projects',
        timeout: 200,
        handle: () => {
            let projects: Project[] = [];
            for (let i = 0; i < 10; i++) {
                projects.push({
                    id: i + 1,
                    title: `title_${i}`,
                    author: `author_${i}`
                });
            }

            return {
                data: {
                    data: projects,
                    message: 'success'
                }
            };
        }
    }
] as MockTemplate[];
