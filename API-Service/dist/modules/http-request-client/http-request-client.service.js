"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpRequestClientService = void 0;
exports.buildFullUrl = buildFullUrl;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const crypto = require("crypto");
const logger_util_1 = require("../../utils/logger.util");
const http_request_error_log_service_1 = require("../http-request-error-log/http-request-error-log.service");
function buildFullUrl(rawUrl) {
    if (!rawUrl)
        return '';
    if (/^(https?:)?\/\//i.test(rawUrl)) {
        return rawUrl;
    }
    const domainHost = process.env.DOMAIN_REQUEST_HOST || '';
    if (!domainHost) {
        return rawUrl;
    }
    const normalizedHost = domainHost.endsWith('/')
        ? domainHost.slice(0, -1)
        : domainHost;
    const normalizedPath = rawUrl.startsWith('/') ? rawUrl : `/${rawUrl}`;
    return `${normalizedHost}${normalizedPath}`;
}
function maskSensitiveHeaders(headers) {
    if (!headers)
        return {};
    const masked = {};
    const sensitiveKeys = [
        'authorization',
        'cookie',
        'token',
        'x-api-key',
        'secret',
        'password',
        'blade-auth',
    ];
    const plainHeaders = typeof headers.toJSON === 'function' ? headers.toJSON() : headers;
    if (typeof plainHeaders === 'object' && plainHeaders !== null) {
        for (const [key, value] of Object.entries(plainHeaders)) {
            if (sensitiveKeys.some((s) => key.toLowerCase().includes(s))) {
                masked[key] = `***${String(value).slice(-10) || ''}`;
            }
            else {
                masked[key] = value;
            }
        }
    }
    return masked;
}
function stringifyBody(body) {
    if (body === undefined || body === null)
        return '';
    if (typeof body === 'string')
        return body;
    try {
        return JSON.stringify(body);
    }
    catch {
        return String(body);
    }
}
let HttpRequestClientService = class HttpRequestClientService {
    errorLogService;
    instance;
    constructor(errorLogService) {
        this.errorLogService = errorLogService;
        this.instance = axios_1.default.create({
            timeout: 10000,
        });
    }
    async request(config) {
        const { apiCode, apiName = '', requestId: customRequestId } = config;
        if (!apiCode) {
            throw new Error('[HttpRequestClientService] apiCode 为必需参数，用于标识日志与关联配置');
        }
        const requestId = customRequestId || crypto.randomUUID();
        const startTime = Date.now();
        const logger = (0, logger_util_1.getCustomLogger)(apiCode);
        const targetUrl = buildFullUrl(config.url || '');
        const fullUrl = axios_1.default.getUri({ ...config, url: targetUrl }) || targetUrl;
        const method = (config.method || 'GET').toUpperCase();
        const maskedHeaders = maskSensitiveHeaders(config.headers);
        const requestBodyStr = stringifyBody(config.data);
        logger.info({
            requestId,
            apiCode,
            apiName,
            url: fullUrl,
            method,
            headers: maskedHeaders,
            params: config.params,
            body: config.data,
        }, `[${apiCode}] HTTP 请求开始: ${method} ${fullUrl}`);
        try {
            const response = await this.instance.request({
                ...config,
                url: targetUrl,
                headers: config.headers,
            });
            const costMs = Date.now() - startTime;
            logger.info({
                requestId,
                apiCode,
                apiName,
                url: fullUrl,
                method,
                statusCode: response.status,
                costMs,
                responseBody: response.data,
            }, `[${apiCode}] HTTP 请求成功: ${method} ${fullUrl} (${response.status}) - ${costMs}ms`);
            return response;
        }
        catch (error) {
            const costMs = Date.now() - startTime;
            let statusCode = undefined;
            let responseBodyStr = null;
            if (error.response) {
                statusCode = error.response.status;
                responseBodyStr = stringifyBody(error.response.data);
            }
            const errorMsg = error.message || 'HTTP 请求失败';
            const errorStack = error.stack || null;
            logger.error({
                requestId,
                apiCode,
                apiName,
                url: fullUrl,
                method,
                statusCode,
                costMs,
                errorMsg,
                errorStack,
                responseBody: responseBodyStr,
            }, `[${apiCode}] HTTP 请求失败: ${method} ${fullUrl} (${statusCode ?? 'TIMEOUT'}) - ${costMs}ms - Error: ${errorMsg}`);
            try {
                await this.errorLogService.createErrorLog({
                    requestId,
                    apiCode,
                    apiName,
                    requestUrl: fullUrl,
                    method,
                    requestHeaders: stringifyBody(maskedHeaders),
                    requestBody: requestBodyStr,
                    statusCode: statusCode,
                    responseBody: responseBodyStr || '',
                    errorMsg,
                    errorStack: errorStack || '',
                    costMs,
                });
            }
            catch (dbErr) {
                common_1.Logger.error(`[${apiCode}] 写入 sys_http_request_error_log 失败: ${dbErr?.message}`, dbErr?.stack);
            }
            throw error;
        }
    }
    async get(url, config) {
        return this.request({ ...config, url, method: 'GET' });
    }
    async post(url, data, config) {
        return this.request({ ...config, url, method: 'POST', data });
    }
    async put(url, data, config) {
        return this.request({ ...config, url, method: 'PUT', data });
    }
    async delete(url, config) {
        return this.request({ ...config, url, method: 'DELETE' });
    }
};
exports.HttpRequestClientService = HttpRequestClientService;
exports.HttpRequestClientService = HttpRequestClientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [http_request_error_log_service_1.HttpRequestErrorLogService])
], HttpRequestClientService);
//# sourceMappingURL=http-request-client.service.js.map