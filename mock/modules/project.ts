import { getPage } from '..';
import { MockTemplate } from '../../plugins/vite-plugin-mock';
import { Project } from '../../src/services';

export default [
    {
        method: 'GET',
        url: '/api/projects',
        timeout: 200,
        handle: ({ query }) => {
            const page = getPage(query);
            let projects: Project[] = [];
            const total = 34;
            for (let i = 0; i < 10; i++) {
                const id = (page - 1) * 10 + i + 1;
                projects.push({
                    id,
                    title: `title_${id}`,
                    author: `author_${id}`
                });
            }

            return {
                data: {
                    code: '000000',
                    data: {
                        total,
                        list: projects
                    },
                    message: 'success'
                }
            };
        }
    }
] as MockTemplate[];
