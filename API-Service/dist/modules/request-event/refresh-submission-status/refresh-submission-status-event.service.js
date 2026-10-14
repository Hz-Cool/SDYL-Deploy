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
var RefreshSubmissionStatusEventService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshSubmissionStatusEventService = void 0;
const common_1 = require("@nestjs/common");
const report_api_service_1 = require("../../report-api/report-api.service");
const http_request_client_service_1 = require("../../http-request-client/http-request-client.service");
const sys_config_service_1 = require("../../config/sys-config.service");
const inspect_submit_service_1 = require("../../inspect-submit/inspect-submit.service");
let RefreshSubmissionStatusEventService = RefreshSubmissionStatusEventService_1 = class RefreshSubmissionStatusEventService {
    reportApiService;
    httpClientService;
    sysConfigService;
    inspectSubmitService;
    taskCode = 'refresh_submission_status';
    aliases = ['refresh_submission_status', 'refresh_submission'];
    logger = new common_1.Logger(RefreshSubmissionStatusEventService_1.name);
    constructor(reportApiService, httpClientService, sysConfigService, inspectSubmitService) {
        this.reportApiService = reportApiService;
        this.httpClientService = httpClientService;
        this.sysConfigService = sysConfigService;
        this.inspectSubmitService = inspectSubmitService;
    }
    async execute(taskConfig) {
        const apiCode = 'inspection_results';
        const apiConfig = await this.reportApiService.findOneByCode(apiCode);
        if (!apiConfig) {
            throw new common_1.NotFoundException(`上报接口配置表中未找到 apiCode 为 '${apiCode}' 的记录`);
        }
        if (apiConfig.enable !== 1) {
            throw new common_1.InternalServerErrorException(`接口 [${apiCode}] '${apiConfig.apiName}' 已被禁用`);
        }
        const tokenData = await this.reportApiService.findQueryHistoryLastToken();
        if (!tokenData)
            throw new common_1.InternalServerErrorException('未找到上报 token');
        const Authorization = await this.sysConfigService.findByKeyAuthorization();
        const response = await this.httpClientService.request({
            apiCode: apiConfig.apiCode,
            apiName: apiConfig.apiName,
            url: apiConfig.apiUrl,
            method: (apiConfig.method || 'POST').toUpperCase(),
            timeout: apiConfig.timeout || 5000,
            headers: {
                'blade-auth': `bearer ${tokenData}`,
                Authorization,
            },
            data: taskConfig?.payloadParams || {},
        });
        await this.reportApiService.saveOrUpdateQueryHistory({
            apiCode,
            queryName: apiConfig.apiName,
            queryResults: response.data,
        });
        const remoteList = response.data?.data?.list || response.data?.data || [];
        let updated = 0;
        let skipped = 0;
        for (const item of remoteList) {
            const submitNo = item.submitNo || item.submit_no;
            if (!submitNo)
                continue;
            try {
                const pendingList = await this.inspectSubmitService.search({
                    pageNum: 1,
                    pageSize: 100,
                    submitNo,
                    submitStatus: 2,
                });
                let target = pendingList.list[0];
                if (!target) {
                    const pending1 = await this.inspectSubmitService.search({
                        pageNum: 1,
                        pageSize: 100,
                        submitNo,
                        submitStatus: 1,
                    });
                    target = pending1.list[0];
                }
                if (!target) {
                    skipped++;
                    continue;
                }
                await this.inspectSubmitService.update(target.id, {
                    submitStatus: item.submitStatus ?? item.submit_status ?? target.submitStatus,
                    inspectResult: item.inspectResult ?? item.inspect_result ?? target.inspectResult,
                    finishTime: item.finishTime ? new Date(item.finishTime) : target.finishTime,
                    results: item.results ?? target.results,
                });
                updated++;
            }
            catch (e) {
                this.logger.warn(`更新送检单 ${submitNo} 失败: ${e?.message || e}`);
            }
        }
        this.logger.log(`[refresh_submission_status] 接口返回 ${remoteList.length} 条，更新 ${updated} 条，跳过 ${skipped} 条`);
        return { success: true, returned: remoteList.length, updated, skipped };
    }
};
exports.RefreshSubmissionStatusEventService = RefreshSubmissionStatusEventService;
exports.RefreshSubmissionStatusEventService = RefreshSubmissionStatusEventService = RefreshSubmissionStatusEventService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [report_api_service_1.ReportApiService,
        http_request_client_service_1.HttpRequestClientService,
        sys_config_service_1.SysConfigService,
        inspect_submit_service_1.InspectSubmitService])
], RefreshSubmissionStatusEventService);
//# sourceMappingURL=refresh-submission-status-event.service.js.map