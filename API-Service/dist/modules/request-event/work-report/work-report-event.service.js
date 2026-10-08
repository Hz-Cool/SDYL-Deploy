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
exports.WorkReportEventService = void 0;
const common_1 = require("@nestjs/common");
const report_api_service_1 = require("../../report-api/report-api.service");
const http_request_client_service_1 = require("../../http-request-client/http-request-client.service");
const sys_config_service_1 = require("../../config/sys-config.service");
const dayjs_1 = require("dayjs");
const mssql_result_service_1 = require("../../mssql-result/mssql-result.service");
let WorkReportEventService = class WorkReportEventService {
    reportApiService;
    httpClientService;
    sysConfigService;
    MssqlResultService;
    taskCode = 'work_report_job';
    aliases = ['work_report', 'work_report_job'];
    constructor(reportApiService, httpClientService, sysConfigService, MssqlResultService) {
        this.reportApiService = reportApiService;
        this.httpClientService = httpClientService;
        this.sysConfigService = sysConfigService;
        this.MssqlResultService = MssqlResultService;
    }
    async buildPayload(payloadParams) {
        const deviceGroup = await this.sysConfigService.findByKeyDeviceGroup();
        const orderNo = await this.sysConfigService.findByKeyOrderNo();
        const processedMachineList = [];
        const standardList = [];
        const productList = await this.MssqlResultService.getCurrentProductList();
        console.log("🚀 ~ WorkReportEventService ~ buildPayload ~ productList:", JSON.stringify(productList));
        return {
            deviceGroup,
            orderNo,
            type: 2,
            passFailResult: 1,
            dateTime: (0, dayjs_1.default)().format("YYYY-MM-DD HH:mm:ss"),
            processedMachineList,
            standardList,
            reportTime: new Date().toISOString(),
            source: 'request-event-work-report',
            ...(payloadParams || {}),
        };
    }
    async execute(taskConfig) {
        const payload = await this.buildPayload(taskConfig?.payloadParams);
        return await this.sendWorkReportRequest(payload);
    }
    async sendWorkReportRequest(payload) {
        const apiCode = 'work_report';
        const apiConfig = await this.reportApiService.findOneByCode(apiCode);
        const tokenData = await this.reportApiService.findQueryHistoryLastToken();
        if (!tokenData) {
            throw new common_1.InternalServerErrorException('数据不存在');
        }
        if (!apiConfig) {
            throw new common_1.NotFoundException(`上报接口配置表中未找到 apiCode 为 '${apiCode}' 的记录`);
        }
        if (apiConfig.enable !== 1) {
            throw new common_1.InternalServerErrorException(`接口 [${apiCode}] '${apiConfig.apiName}' 当前已被禁用`);
        }
        const requestData = payload || (await this.buildPayload());
        const Authorization = await this.sysConfigService.findByKeyAuthorization();
        const bladeAuth = `bearer ${tokenData}`;
        const response = await this.httpClientService.request({
            apiCode: apiConfig.apiCode,
            apiName: apiConfig.apiName,
            url: apiConfig.apiUrl,
            method: (apiConfig.method || 'POST').toUpperCase(),
            timeout: apiConfig.timeout || 3000,
            headers: {
                'blade-auth': bladeAuth,
                Authorization,
            },
            data: requestData,
        });
        await this.reportApiService.saveOrUpdateQueryHistory({
            apiCode,
            queryName: apiConfig.apiName,
            queryResults: response.data,
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
exports.WorkReportEventService = WorkReportEventService;
exports.WorkReportEventService = WorkReportEventService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [report_api_service_1.ReportApiService,
        http_request_client_service_1.HttpRequestClientService,
        sys_config_service_1.SysConfigService,
        mssql_result_service_1.MssqlResultService])
], WorkReportEventService);
//# sourceMappingURL=work-report-event.service.js.map