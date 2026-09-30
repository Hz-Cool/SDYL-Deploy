export declare class HttpRequestErrorLog {
    id: number;
    requestId: string;
    apiCode: string;
    apiName: string;
    requestUrl: string;
    method: string;
    requestHeaders: string;
    requestBody: string;
    statusCode: number;
    responseBody: string;
    errorMsg: string;
    errorStack: string;
    costMs: number;
    createTime: Date;
}
