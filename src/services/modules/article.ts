import { Pagination } from '..';
import request from '../request';

interface Article {
    id: number;
    title: string;
    description: string;
    author: string;
    lastUpdate: string;
}

export { Article };

export default {
    getArticles(page: number) {
        return request.get<Pagination<Article>>('/articles', {
            params: {
                page
            }
        });
    }
};
