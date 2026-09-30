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
exports.LoginEventService = void 0;
const common_1 = require("@nestjs/common");
const report_api_service_1 = require("../../report-api/report-api.service");
const http_request_client_service_1 = require("../../http-request-client/http-request-client.service");
const login_util_1 = require("../../../utils/login.util");
const sys_config_service_1 = require("../../config/sys-config.service");
const sys_config_enum_1 = require("../../../common/enums/sys-config.enum");
let LoginEventService = class LoginEventService {
    reportApiService;
    httpClientService;
    sysConfigService;
    taskCode = 'login_event_job';
    aliases = ['login', 'login_event'];
    constructor(reportApiService, httpClientService, sysConfigService) {
        this.reportApiService = reportApiService;
        this.httpClientService = httpClientService;
        this.sysConfigService = sysConfigService;
    }
    async buildPayload(payloadParams) {
        const sysConfigKey = 'login.account';
        const sysConfig = await this.sysConfigService.findOneByKey(sysConfigKey);
        if (!sysConfig) {
            throw new common_1.InternalServerErrorException('配置项不存在');
        }
        console.log('🚀 ~ LoginEventService ~ buildPayload ~ sysConfig.configValue:', sysConfig.configValue, typeof JSON.parse(sysConfig.configValue));
        const user = sysConfig.valueType === sys_config_enum_1.SysConfigValueType.JSON
            ? JSON.parse(sysConfig.configValue)
            : {};
        return {
            username: user.user,
            password: (0, login_util_1.encryptDES)(user.password),
            tenantId: '000000',
            pwd: user.password,
            loginTime: new Date().toISOString(),
            grant_type: 'password',
            scope: 'all',
            source: 'request-event-login',
            ...(payloadParams || {}),
        };
    }
    async execute(taskConfig) {
        const payload = await this.buildPayload(taskConfig?.payloadParams);
        return await this.sendLoginRequest(payload);
    }
    async sendLoginRequest(payload) {
        const apiCode = 'login';
        const apiConfig = await this.reportApiService.findOneByCode(apiCode);
        if (!apiConfig) {
            throw new common_1.NotFoundException(`上报接口配置表中未找到 apiCode 为 '${apiCode}' 的记录`);
        }
        if (apiConfig.enable !== 1) {
            throw new common_1.InternalServerErrorException(`接口 [${apiCode}] '${apiConfig.apiName}' 当前已被禁用`);
        }
        const requestData = payload;
        const Authorization = await this.sysConfigService.findByKeyAuthorization();
        const response = await this.httpClientService.request({
            apiCode: apiConfig.apiCode,
            apiName: apiConfig.apiName,
            url: apiConfig.apiUrl + `?${new URLSearchParams(requestData)}`,
            method: (apiConfig.method || 'POST').toUpperCase(),
            timeout: apiConfig.timeout || 3000,
            headers: {
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
exports.LoginEventService = LoginEventService;
exports.LoginEventService = LoginEventService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [report_api_service_1.ReportApiService,
        http_request_client_service_1.HttpRequestClientService,
        sys_config_service_1.SysConfigService])
], LoginEventService);
//# sourceMappingURL=login-event.service.js.map