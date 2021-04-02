import Axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { message } from 'ant-design-vue';

const httpRequest = Axios.create({
    timeout: 30000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
});

httpRequest.interceptors.request.use(
    (request: AxiosRequestConfig) => {
        return request;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

interface ResponseInterface {
    message: string;
    data: any;
    errorCode: number;
    statusCode: number;
    ignore: boolean;
    axiosResponse?: AxiosResponse;
}

const parseError = (error: AxiosError): ResponseInterface => {
    if (error.response && error.response.data) {
        return {
            message: error.response.data.message || '未知错误',
            data: error.response.data.data || null,
            errorCode: error.response.data.errorCode || 9999,
            statusCode: error.response.status,
            ignore: error.response.data.ignore === true,
            axiosResponse: error.response
        };
    }
    return {
        message: '未知错误',
        data: null,
        errorCode: 9999,
        statusCode: error.response ? error.response.status : 500,
        ignore: false
    };
};

httpRequest.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    (error: AxiosError) => {
        const response = parseError(error);
        if (response.ignore) {
            return Promise.reject(response);
        }
        message.error(response.message);
        return Promise.reject(response);
    }
);

export default httpRequest;
