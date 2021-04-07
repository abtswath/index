import { message } from 'ant-design-vue';
import Axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
    CancelTokenStatic,
    CancelToken,
    Canceler,
    AxiosPromise
} from 'axios';
import router from '@/router';

export interface Response {
    message: string;
    data: any;
    ignore?: boolean;
}

class Request {
    private static _instance: Request;

    private axiosInstance: AxiosInstance;

    private cancelToken: CancelTokenStatic;

    private sourceMap: Map<CancelToken, Canceler> = new Map();

    static getInstance(): Request {
        if (!this._instance) {
            this._instance = new Request({
                timeout: 30000,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
        }
        return this._instance;
    }

    private constructor(config?: AxiosRequestConfig) {
        this.axiosInstance = this.create(config);
        this.cancelToken = Axios.CancelToken;
        this.requestHook();
        this.responseHook();
    }

    public cancelAll(): void {
        this.sourceMap.forEach((item) => {
            item();
        });
        this.sourceMap.clear();
    }

    public cancel(cancelToken: CancelToken): void {
        const canceler = this.sourceMap.get(cancelToken);
        if (canceler !== undefined) {
            canceler();
        }
        this.sourceMap.delete(cancelToken);
    }

    protected requestHook(): void {
        this.axiosInstance.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                if (config.cancelToken === undefined) {
                    const source = this.cancelToken.source();
                    config.cancelToken = source.token;
                    this.sourceMap.set(source.token, source.cancel);
                }
                return config;
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            }
        );
    }

    protected removeToken(cancelToken: CancelToken | undefined) {
        if (cancelToken !== undefined) {
            this.sourceMap.delete(cancelToken);
        }
    }

    protected responseHook(): void {
        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse<Response>) => {
                return response;
            },
            (error: AxiosError<Response>) => {
                if (error.response?.status === 401) {
                    if (window.location.pathname !== '/login') {
                        router.push({ name: 'login' });
                    }
                    this.cancelAll();
                    return Promise.reject(error);
                }
                if (error.response?.data.ignore === false) {
                    message.error(
                        error.response?.data?.message || '未知错误，请稍后重试'
                    );
                }
                this.removeToken(error.config.cancelToken);
                return Promise.reject(error);
            }
        );
    }

    create(config?: AxiosRequestConfig): AxiosInstance {
        return Axios.create(config);
    }

    isCancel(value: any): boolean {
        return Axios.isCancel(value);
    }

    all<T>(values: (T | Promise<T>)[]): Promise<T[]> {
        return Axios.all<T>(values);
    }

    spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R {
        return Axios.spread<T, R>(callback);
    }

    getUri(config?: AxiosRequestConfig): string {
        return Axios.getUri(config);
    }

    protected packagingAxiosPromise(
        promise: AxiosPromise<Response>
    ): Promise<Response> {
        return new Promise((resolve, reject) => {
            promise
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error: AxiosError<Response>) => {
                    reject(error.response?.data);
                });
        });
    }

    request(config: AxiosRequestConfig): Promise<Response> {
        return this.packagingAxiosPromise(
            this.axiosInstance.request<Response>(config)
        );
    }

    get(url: string, config?: AxiosRequestConfig): Promise<Response> {
        return this.packagingAxiosPromise(
            this.axiosInstance.get<Response>(url, config)
        );
    }

    delete(url: string, config?: AxiosRequestConfig): Promise<Response> {
        return this.packagingAxiosPromise(
            this.axiosInstance.delete<Response>(url, config)
        );
    }

    head(url: string, config?: AxiosRequestConfig): Promise<Response> {
        return this.packagingAxiosPromise(
            this.axiosInstance.head<Response>(url, config)
        );
    }

    options(url: string, config?: AxiosRequestConfig): Promise<Response> {
        return this.packagingAxiosPromise(
            this.axiosInstance.options<Response>(url, config)
        );
    }

    post(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<Response> {
        return this.packagingAxiosPromise(
            this.axiosInstance.post<Response>(url, data, config)
        );
    }

    put(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<Response> {
        return this.packagingAxiosPromise(
            this.axiosInstance.put<Response>(url, data, config)
        );
    }

    patch(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<Response> {
        return this.packagingAxiosPromise(
            this.axiosInstance.patch<Response>(url, data, config)
        );
    }

    isAxiosError(payload: any): payload is AxiosError {
        return Axios.isAxiosError(payload);
    }
}

export default Request.getInstance();
