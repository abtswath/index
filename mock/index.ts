import Account from './modules/account';
import Project from './modules/project';
import Article from './modules/article';
import User from './modules/user';

export default [...Account, ...Project, ...Article, ...User];

export const getPage = (query: URLSearchParams): number => {
    const queryPage = query.get('page');
    return Number(queryPage) > 0 ? Number(queryPage) : 1;
};
