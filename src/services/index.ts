export * from './modules/account';
export * from './modules/project';
export * from './modules/article';
export * from './request';

export interface Pagination<T> {
    total: number;
    list: T[];
}

import AccountService from './modules/account';
import ProjectService from './modules/project';
import ArticleService from './modules/article';

export { AccountService, ProjectService, ArticleService };
