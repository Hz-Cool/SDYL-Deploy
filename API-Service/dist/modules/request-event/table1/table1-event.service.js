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
exports.Table1EventService = void 0;
const common_1 = require("@nestjs/common");
const report_api_service_1 = require("../../report-api/report-api.service");
const http_request_client_service_1 = require("../../http-request-client/http-request-client.service");
let Table1EventService = class Table1EventService {
    reportApiService;
    httpClientService;
    taskCode = 'table1_event_job';
    aliases = ['table1', 'table1_event'];
    constructor(reportApiService, httpClientService) {
        this.reportApiService = reportApiService;
        this.httpClientService = httpClientService;
    }
    async buildPayload(payloadParams) {
        return {
            username: payloadParams?.username || 'admin',
            loginTime: new Date().toISOString(),
            source: 'request-event-table1-dynamic',
            ...(payloadParams || {}),
        };
    }
    async execute(taskConfig) {
        const payload = await this.buildPayload(taskConfig?.payloadParams);
        return await this.sendTable1Request(payload);
    }
    async sendTable1Request(payload) {
        const apiCode = 'table1';
        const apiConfig = await this.reportApiService.findOneByCode(apiCode);
        if (!apiConfig) {
            throw new common_1.NotFoundException(`上报接口配置表中未找到 apiCode 为 '${apiCode}' 的记录`);
        }
        if (apiConfig.enable !== 1) {
            throw new common_1.InternalServerErrorException(`接口 [${apiCode}] '${apiConfig.apiName}' 当前已被禁用`);
        }
        const requestData = payload || {
            username: 'admin',
            loginTime: new Date().toISOString(),
            source: 'request-event-login',
        };
        const response = await this.httpClientService.request({
            apiCode: apiConfig.apiCode,
            apiName: apiConfig.apiName,
            url: apiConfig.apiUrl,
            method: (apiConfig.method || 'POST').toUpperCase(),
            timeout: apiConfig.timeout || 3000,
            data: requestData,
        });
        return {
            success: true,
            statusCode: response.status,
            apiCode: apiConfig.apiCode,
            apiName: apiConfig.apiName,
            apiUrl: apiConfig.apiUrl,
            responseData: response.data,
        };
    }
};
exports.Table1EventService = Table1EventService;
exports.Table1EventService = Table1EventService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [report_api_service_1.ReportApiService,
        http_request_client_service_1.HttpRequestClientService])
], Table1EventService);
//# sourceMappingURL=table1-event.service.js.map