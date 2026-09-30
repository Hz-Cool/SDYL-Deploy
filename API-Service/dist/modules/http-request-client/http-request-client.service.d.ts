import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpRequestErrorLogService } from '../http-request-error-log/http-request-error-log.service';
export interface CustomHttpRequestConfig<D = any> extends AxiosRequestConfig<D> {
    apiCode: string;
    apiName?: string;
    requestId?: string;
}
export declare function buildFullUrl(rawUrl: string): string;
export declare class HttpRequestClientService {
    private readonly errorLogService;
    private readonly instance;
    constructor(errorLogService: HttpRequestErrorLogService);
    request<T = any>(config: CustomHttpRequestConfig): Promise<AxiosResponse<T>>;
    get<T = any>(url: string, config: Omit<CustomHttpRequestConfig, 'url' | 'method'>): Promise<AxiosResponse<T>>;
    post<T = any>(url: string, data: any, config: Omit<CustomHttpRequestConfig, 'url' | 'method' | 'data'>): Promise<AxiosResponse<T>>;
    put<T = any>(url: string, data: any, config: Omit<CustomHttpRequestConfig, 'url' | 'method' | 'data'>): Promise<AxiosResponse<T>>;
    delete<T = any>(url: string, config: Omit<CustomHttpRequestConfig, 'url' | 'method'>): Promise<AxiosResponse<T>>;
}
