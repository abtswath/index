import { getPage } from '..';
import { MockTemplate } from '../../plugins/vite-plugin-mock';
import { Article } from '../../src/services';

export default [
    {
        method: 'GET',
        url: '/api/articles',
        timeout: 200,
        handle: ({ query }) => {
            const page = getPage(query);
            let articles: Article[] = [];
            for (let i = 0; i < 10; i++) {
                const id = (page - 1) * 10 + i + 1;
                articles.push({
                    id,
                    title: `title_${id}`,
                    description: `description_${id}`,
                    author: `author_${id}`,
                    lastUpdate: '2021-04-9 15:44:22'
                });
            }

            return {
                data: {
                    code: '000000',
                    data: {
                        list: articles,
                        total: 24
                    },
                    message: 'success'
                }
            };
        }
    }
] as MockTemplate[];
