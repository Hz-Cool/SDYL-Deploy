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
exports.OrderEventService = void 0;
const common_1 = require("@nestjs/common");
const report_api_service_1 = require("../../report-api/report-api.service");
const http_request_client_service_1 = require("../../http-request-client/http-request-client.service");
const sys_config_service_1 = require("../../config/sys-config.service");
const sys_config_enum_1 = require("../../../common/enums/sys-config.enum");
let OrderEventService = class OrderEventService {
    reportApiService;
    httpClientService;
    sysConfigService;
    taskCode = 'order_event_job';
    aliases = ['order', 'order_event'];
    constructor(reportApiService, httpClientService, sysConfigService) {
        this.reportApiService = reportApiService;
        this.httpClientService = httpClientService;
        this.sysConfigService = sysConfigService;
    }
    async buildPayload(payloadParams) {
        const sysConfigKey = 'sys.deviceGroup';
        const sysConfig = await this.sysConfigService.findOneByKey(sysConfigKey);
        if (!sysConfig) {
            throw new common_1.NotFoundException(`系统配置中未找到 sysConfigKey 为 '${sysConfigKey}' 的记录`);
        }
        if (sysConfig.status !== 1) {
            throw new common_1.InternalServerErrorException(`系统配置中 '${sysConfigKey}' 当前已被禁用`);
        }
        return {
            deviceGroup: sysConfig.valueType === sys_config_enum_1.SysConfigValueType.STRING
                ? sysConfig.configValue
                : '',
            reportTime: new Date().toISOString(),
            source: 'request-event-order',
            ...(payloadParams || {}),
        };
    }
    async execute(taskConfig) {
        const payload = await this.buildPayload(taskConfig?.payloadParams);
        return await this.sendOrderRequest(payload);
    }
    async sendOrderRequest(payload) {
        const apiCode = 'order';
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
exports.OrderEventService = OrderEventService;
exports.OrderEventService = OrderEventService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [report_api_service_1.ReportApiService,
        http_request_client_service_1.HttpRequestClientService,
        sys_config_service_1.SysConfigService])
], OrderEventService);
//# sourceMappingURL=order-event.service.js.map