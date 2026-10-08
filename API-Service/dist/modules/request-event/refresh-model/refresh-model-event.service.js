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
var RefreshModelEventService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshModelEventService = void 0;
const common_1 = require("@nestjs/common");
const mssql_result_service_1 = require("../../mssql-result/mssql-result.service");
const sys_config_service_1 = require("../../config/sys-config.service");
const sys_config_enum_1 = require("../../../common/enums/sys-config.enum");
const CURRENT_PRODUCT_TYPE_KEY = 'current.productType';
let RefreshModelEventService = RefreshModelEventService_1 = class RefreshModelEventService {
    mssqlResultService;
    sysConfigService;
    logger = new common_1.Logger(RefreshModelEventService_1.name);
    taskCode = 'refresh_model_job';
    aliases = ['refresh_model', 'refresh_model_job'];
    constructor(mssqlResultService, sysConfigService) {
        this.mssqlResultService = mssqlResultService;
        this.sysConfigService = sysConfigService;
    }
    async execute(taskConfig) {
        const currentProduct = await this.mssqlResultService.getCurrentProductType();
        const productModel = (currentProduct?.productModel ?? '').trim();
        if (!productModel) {
            this.logger.warn('未读取到产品型号，跳过本次刷新');
            return {
                success: true,
                changed: false,
                skipped: true,
                reason: 'productModel is empty',
            };
        }
        let oldConfig = null;
        try {
            oldConfig = await this.sysConfigService.findOneByKey(CURRENT_PRODUCT_TYPE_KEY);
        }
        catch {
            oldConfig = null;
        }
        const oldValue = JSON.parse(oldConfig?.configValue || '').current ?? '';
        if (oldValue === productModel) {
            this.logger.log(`产品型号未变化（${productModel}），跳过写入`);
            return {
                success: true,
                changed: false,
                skipped: true,
                productModel,
                oldValue,
            };
        }
        if (!oldConfig) {
            await this.sysConfigService.create({
                configKey: CURRENT_PRODUCT_TYPE_KEY,
                configName: '当前产品型号',
                configGroup: 'default',
                configValue: `{current:"",prev:""}`,
                valueType: sys_config_enum_1.SysConfigValueType.JSON,
                status: 1,
                isSystem: 1,
                remark: '由 refresh_model_job 任务自动写入',
            });
            this.logger.log(`产品型号配置新建完成: ${productModel}`);
        }
        else {
            const nextData = {
                current: currentProduct?.productModel,
                prev: JSON.parse(oldConfig.configValue).current,
            };
            await this.sysConfigService.update(oldConfig.id, {
                configValue: JSON.stringify(nextData),
                remark: `型号由 ${nextData.prev || '空'} 切换为 ${nextData.current}。【由 refresh_model_job 任务自动写入】`,
            });
            this.logger.log(`产品型号配置已更新: ${oldValue} -> ${productModel}`);
        }
        return {
            success: true,
            changed: true,
            productModel,
            oldValue,
        };
    }
};
exports.RefreshModelEventService = RefreshModelEventService;
exports.RefreshModelEventService = RefreshModelEventService = RefreshModelEventService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mssql_result_service_1.MssqlResultService,
        sys_config_service_1.SysConfigService])
], RefreshModelEventService);
//# sourceMappingURL=refresh-model-event.service.js.map