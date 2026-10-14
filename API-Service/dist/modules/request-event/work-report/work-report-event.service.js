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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var WorkReportEventService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkReportEventService = void 0;
const common_1 = require("@nestjs/common");
const report_api_service_1 = require("../../report-api/report-api.service");
const http_request_client_service_1 = require("../../http-request-client/http-request-client.service");
const sys_config_service_1 = require("../../config/sys-config.service");
const dayjs_1 = __importDefault(require("dayjs"));
const mssql_result_service_1 = require("../../mssql-result/mssql-result.service");
const inspect_submit_service_1 = require("../../inspect-submit/inspect-submit.service");
const MAX_DRAIN_PER_RUN = 20;
let WorkReportEventService = WorkReportEventService_1 = class WorkReportEventService {
    reportApiService;
    httpClientService;
    sysConfigService;
    MssqlResultService;
    inspectSubmitService;
    taskCode = 'work_report_job';
    aliases = ['work_report', 'work_report_job'];
    logger = new common_1.Logger(WorkReportEventService_1.name);
    running = false;
    constructor(reportApiService, httpClientService, sysConfigService, MssqlResultService, inspectSubmitService) {
        this.reportApiService = reportApiService;
        this.httpClientService = httpClientService;
        this.sysConfigService = sysConfigService;
        this.MssqlResultService = MssqlResultService;
        this.inspectSubmitService = inspectSubmitService;
    }
    async execute(taskConfig) {
        if (this.running) {
            this.logger.warn('[work_report_job] 上一轮尚未结束，跳过本次触发');
            return { skipped: true, reason: 'already_running' };
        }
        this.running = true;
        let interval = 0;
        try {
            const cfg = await this.sysConfigService.findOneByKey('inspect.interval');
            interval = Number(cfg?.configValue) || 0;
        }
        catch {
            interval = 0;
        }
        this.logger.log(`[work_report_job] inspect.interval = ${interval}`);
        let success = 0;
        let fail = 0;
        const MODELS = ['944189', '282639', '495177'];
        try {
            for (const model of MODELS) {
                this.logger.log(`[work_report_job] === 开始处理型号 ${model} ===`);
                for (let i = 0; i < MAX_DRAIN_PER_RUN; i++) {
                    let data;
                    try {
                        data = await this.MssqlResultService.getCurrentProductList(model);
                    }
                    catch (e) {
                        this.logger.warn(`[work_report_job] [${model}] 查询失败: ${e?.message || String(e)}`);
                        break;
                    }
                    const hasData = (data.processedMachineList && data.processedMachineList.length) ||
                        (data.standardList && data.standardList.length);
                    if (!hasData) {
                        this.logger.log(`[work_report_job] [${model}] 无更多数据`);
                        break;
                    }
                    const payload = await this.buildPayloadFromData(data, taskConfig?.payloadParams);
                    try {
                        await this.sendWorkReportRequest(payload);
                        success++;
                        this.logger.log(`[work_report_job] [${model}] 第 ${i + 1} 条发送成功, partCode=${data.barcode || ''}`);
                    }
                    catch (e) {
                        fail++;
                        this.logger.error(`[work_report_job] [${model}] 第 ${i + 1} 条发送失败，游标不推进: ${e?.message || String(e)}`);
                        break;
                    }
                    if (data.cursorKey && data.nextCursor) {
                        try {
                            await this.MssqlResultService.commitCursor(data.cursorKey, data.nextCursor);
                        }
                        catch (ce) {
                            this.logger.error(`[work_report_job] 游标提交失败（数据已发送，下轮可能重发）: ${ce?.message || String(ce)}`);
                        }
                    }
                    try {
                        await this.maybeSendFirstPartInspection(model, data, payload);
                    }
                    catch (fe) {
                        this.logger.error(`[work_report_job] 首件送检失败: ${fe?.message || String(fe)}`);
                    }
                    try {
                        await this.maybeSendIntervalInspection(model, data, payload);
                    }
                    catch (ie) {
                        this.logger.error(`[work_report_job] 间隔送检失败: ${ie?.message || String(ie)}`);
                    }
                    if (!data.hasMore) {
                        this.logger.log(`[work_report_job] [${model}] hasMore=false，切换下一型号`);
                        break;
                    }
                }
            }
            this.logger.log(`[work_report_job] 全部型号处理完毕（成功 ${success} 条，失败 ${fail} 条）`);
        }
        finally {
            this.running = false;
        }
        return { success, fail, maxDrain: MAX_DRAIN_PER_RUN };
    }
    async buildPayloadFromData(data, payloadParams) {
        const deviceGroup = await this.sysConfigService.findByKeyDeviceGroup();
        const orderNo = await this.sysConfigService.findByKeyOrderNo();
        return {
            deviceGroup,
            orderNo,
            partCode: data.barcode || "",
            type: 2,
            passFailResult: 1,
            dateTime: (0, dayjs_1.default)().format('YYYY-MM-DD HH:mm:ss'),
            processedMachineList: data.processedMachineList,
            standardList: data.standardList,
            reportTime: new Date().toISOString(),
            source: 'request-event-work-report',
            ...(payloadParams || {}),
        };
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
        const requestData = payload;
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
    async maybeSendFirstPartInspection(model, data, payload) {
        const KEY = 'inspect.needFirstPart';
        let cfg;
        try {
            cfg = await this.sysConfigService.findOneByKey(KEY);
        }
        catch {
            return;
        }
        let flagObj = {};
        try {
            flagObj = JSON.parse(cfg?.configValue || '{}');
        }
        catch {
            flagObj = {};
        }
        if (!flagObj[model])
            return;
        this.logger.log(`[inspect] 检测到型号 ${model} 首件，开始发送首件送检请求`);
        const inspectPayload = {
            deviceGroup: payload.deviceGroup,
            orderNo: payload.orderNo,
            partCode: payload.partCode,
            productCode: payload.productCode || '',
            productName: payload.productName || '',
            submitType: 1,
            submitTime: (0, dayjs_1.default)().format('YYYY-MM-DD HH:mm:ss'),
            processedMachineList: data.processedMachineList,
            standardList: data.standardList,
        };
        await this.sendReportApiRequest('sent_for_inspection', inspectPayload);
        await this.inspectSubmitService.create({
            submitNo: `SF${(0, dayjs_1.default)().format('YYYYMMDDHHmmss')}`,
            workOrderNo: payload.orderNo || '',
            productCode: inspectPayload.productCode,
            productName: inspectPayload.productName,
            deviceGroup: payload.deviceGroup,
            submitType: 1,
            submitStatus: 1,
            submitTime: new Date(),
            inspectResult: 0,
            remark: `首件送检（型号 ${model}，条码 ${payload.partCode || ''}）`,
            items: data.standardList,
        });
        flagObj[model] = false;
        await this.sysConfigService.update(cfg.id, { configValue: JSON.stringify(flagObj) });
        this.logger.log(`[inspect] 型号 ${model} 首件送检完成，标志已清空`);
    }
    async maybeSendIntervalInspection(model, data, payload) {
        let interval = 0;
        try {
            const cfg = await this.sysConfigService.findOneByKey('inspect.interval');
            interval = Number(cfg?.configValue) || 0;
        }
        catch {
            interval = 0;
        }
        if (interval <= 0)
            return;
        let count = 0;
        let curCfg = null;
        try {
            curCfg = await this.sysConfigService.findOneByKey(data.cursorKey);
            const cur = JSON.parse(curCfg?.configValue || '{}');
            count = typeof cur.count === 'number' ? cur.count : 0;
        }
        catch { }
        if (count <= interval)
            return;
        this.logger.log(`[inspect] [${model}] count=${count} 达到间隔 ${interval}，发送巡检送检`);
        const inspectPayload = {
            deviceGroup: payload.deviceGroup,
            orderNo: payload.orderNo,
            partCode: payload.partCode,
            productCode: payload.productCode || '',
            productName: payload.productName || '',
            submitType: 2,
            submitTime: (0, dayjs_1.default)().format('YYYY-MM-DD HH:mm:ss'),
            processedMachineList: data.processedMachineList,
            standardList: data.standardList,
        };
        await this.sendReportApiRequest('sent_for_inspection', inspectPayload);
        await this.inspectSubmitService.create({
            submitNo: 'IJ' + (0, dayjs_1.default)().format('YYYYMMDDHHmmss'),
            workOrderNo: payload.orderNo || '',
            productCode: inspectPayload.productCode,
            productName: inspectPayload.productName,
            deviceGroup: payload.deviceGroup,
            submitType: 2,
            submitStatus: 1,
            submitTime: new Date(),
            inspectResult: 0,
            remark: `巡检送检（型号 ${model}，第 ${count} 件，条码 ${payload.partCode || ''}）`,
            items: data.standardList,
        });
        if (curCfg) {
            const cur = JSON.parse(curCfg.configValue || '{}');
            cur.count = 0;
            await this.sysConfigService.update(curCfg.id, { configValue: JSON.stringify(cur) });
        }
        this.logger.log(`[inspect] [${model}] 巡检送检完成，count 已重置为 0`);
    }
    async sendReportApiRequest(apiCode, data) {
        const apiConfig = await this.reportApiService.findOneByCode(apiCode);
        if (!apiConfig)
            throw new common_1.NotFoundException(`接口配置 ${apiCode} 不存在`);
        if (apiConfig.enable !== 1)
            throw new common_1.InternalServerErrorException(`接口 ${apiCode} 已禁用`);
        const tokenData = await this.reportApiService.findQueryHistoryLastToken();
        if (!tokenData)
            throw new common_1.InternalServerErrorException('未找到上报 token');
        const Authorization = await this.sysConfigService.findByKeyAuthorization();
        const response = await this.httpClientService.request({
            apiCode: apiConfig.apiCode,
            apiName: apiConfig.apiName,
            url: apiConfig.apiUrl,
            method: (apiConfig.method || 'POST').toUpperCase(),
            timeout: apiConfig.timeout || 3000,
            headers: {
                'blade-auth': `bearer ${tokenData}`,
                Authorization,
            },
            data,
        });
        await this.reportApiService.saveOrUpdateQueryHistory({
            apiCode,
            queryName: apiConfig.apiName,
            queryResults: response.data,
        });
        return response;
    }
};
exports.WorkReportEventService = WorkReportEventService;
exports.WorkReportEventService = WorkReportEventService = WorkReportEventService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [report_api_service_1.ReportApiService,
        http_request_client_service_1.HttpRequestClientService,
        sys_config_service_1.SysConfigService,
        mssql_result_service_1.MssqlResultService,
        inspect_submit_service_1.InspectSubmitService])
], WorkReportEventService);
//# sourceMappingURL=work-report-event.service.js.map