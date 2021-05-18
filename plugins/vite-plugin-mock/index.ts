import { FSWatcher, Plugin } from 'vite';
import { Option, MockTemplate, NodeModuleWithCompile, Request } from './types';
import { NextHandleFunction } from 'connect';
import { build } from 'esbuild';
import { IncomingMessage } from 'http';

const path = require('path');
const fs = require('fs');

const mock = (option: Option): Plugin => {
    return {
        name: 'vite-plugin-mock',
        enforce: 'pre',
        apply: 'serve',
        configureServer: ({ middlewares, watcher }) => {
            const { enabled = true } = option;
            if (!enabled) {
                return;
            }
            mockServer(option, watcher);
            middlewares.use(requestMiddleware(option));
        }
    };
}

const realpath = (location: string) => {
    const cwd = process.cwd();
    return path.join(cwd, location);
};

const scandir = (dir: string): Promise<Array<string>> => {
    return new Promise<Array<string>>((resolve) => {
        fs.readdir(dir, function (err, files) {
            if (err) {
                throw err;
            }
            resolve(files);
        });
    });
};

const getExtension = (filename: string): string => {
    const tmpFileNameList = filename.split('.');
    return tmpFileNameList[tmpFileNameList.length - 1];
};

const getMockConfig = async (option: Option) => {
    const { templatePath } = option;
    const templateFiles = [];
    const realTemplatePath = realpath(templatePath);
    const files = await scandir(realTemplatePath);
    files.forEach((file) => {
        if (
            !fs.statSync(path.join(realTemplatePath, file)).isDirectory() &&
            ['js', 'ts'].indexOf(getExtension(file)) > -1
        ) {
            templateFiles.push(file);
        }
    });

    try {
        const resolveModuleList = [];
        for (let index = 0; index < templateFiles.length; index++) {
            const mockFile = templateFiles[index];
            resolveModuleList.push(
                resolveModule(path.join(realTemplatePath, mockFile))
            );
        }
        const loadAllResult = await Promise.all(resolveModuleList);
        let result = [];
        for (const resultModule of loadAllResult) {
            let modules = resultModule;
            if (!Array.isArray(resultModule)) {
                modules = [resultModule];
            }
            result = [...result, ...modules];
        }
        return result;
    } catch (error) {
        console.error('vite-plugin-error: ', error);
        return [];
    }
};

async function resolveModule(path: string): Promise<any> {
    const result = await build({
        entryPoints: [path],
        outfile: 'out.js',
        write: false,
        platform: 'node',
        bundle: true,
        format: 'cjs'
    });
    const { text } = result.outputFiles[0];

    return await loadConfigFromBundledFile(path, text);
}

export async function loadConfigFromBundledFile(
    fileName: string,
    bundledCode: string
) {
    const extension = path.extname(fileName);
    const defaultLoader = require.extensions[extension]!;
    require.extensions[extension] = (module: NodeModule, filename: string) => {
        if (filename === fileName) {
            (module as NodeModuleWithCompile)._compile(bundledCode, filename);
        } else {
            defaultLoader(module, filename);
        }
    };
    let config;
    try {
        delete require.cache[fileName];
        const raw = require(fileName);
        config = raw.__esModule ? raw.default : raw;
        require.extensions[extension] = defaultLoader;
    } catch (error) {}

    return config;
}

let templates: MockTemplate[] = [];

const mockServer = async (
    option: Option = { templatePath: 'mock' },
    watcher: FSWatcher
) => {
    const { templatePath } = option;
    watcher.add(realpath(templatePath));
    templates = await getMockConfig(option);
    watcher.on('all', async () => {
        templates = await getMockConfig(option);
    });
};

const sleep = (timeout: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('');
        }, timeout);
    });
};

const parseURL = (
    request: IncomingMessage
): { url?: string; query?: URLSearchParams } => {
    const base = request.headers.origin || 'http://localhost:3000';
    const url = new URL(request.url, base);
    return {
        url: url.pathname,
        query: url.searchParams
    };
};

const parseRequest = (request: IncomingMessage): Promise<Request> => {
    return new Promise((resolve) => {
        let body = '';
        request.on('data', function (chunk) {
            body += chunk;
        });
        request.on('end', function () {
            try {
                body = JSON.parse(body);
            } catch (error) {
                body = body;
            }
            resolve({
                body: body,
                headers: request.headers,
                ...parseURL(request)
            });
        });
    });
};

const requestMiddleware = (option: Option) => {
    const middleware: NextHandleFunction = async (request, response, next) => {
        const pathname = request.url;

        const template = templates.find((item) => {
            return (
                item.method.toUpperCase() === request.method?.toUpperCase() &&
                RegExp(item.url).test(pathname)
            );
        });
        if (template) {
            const { handle, timeout = 300 } = template;
            await sleep(timeout);
            const {
                statusCode = 200,
                data,
                headers = { 'Content-type': 'application/json' }
            } = handle(await parseRequest(request));
            for (const key in headers) {
                if (Object.prototype.hasOwnProperty.call(headers, key)) {
                    response.setHeader(key, headers[key]);
                }
            }
            response.statusCode = statusCode;
            response.end(JSON.stringify(data));
            return;
        }
        next();
    };
    return middleware;
};

export * from './types';
export default mock;
