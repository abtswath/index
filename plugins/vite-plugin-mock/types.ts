import { IncomingMessage } from 'connect';
import { IncomingHttpHeaders } from 'node:http';

export interface Option {
    enabled?: boolean;
    templatePath?: string;
    logger?: boolean;
}

export interface MockTemplate {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTION' | 'PATCH';
    timeout?: number;
    url: string;
    handle: handleFunc;
}

export interface Response {
    statusCode?: number;
    data: any;
    headers?: {
        [key: string]: [value: string];
    };
}

export interface Request {
    body?: any;
    query?: URLSearchParams;
    headers?: IncomingHttpHeaders;
    url?: string;
}

export type handleFunc = (request: Request) => Response;

export interface NodeModuleWithCompile extends NodeModule {
    _compile(code: string, filename: string): any;
}
