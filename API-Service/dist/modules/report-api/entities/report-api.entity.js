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
exports.ReportApi = void 0;
const typeorm_1 = require("typeorm");
let ReportApi = class ReportApi {
    id;
    apiCode;
    apiName;
    apiUrl;
    method;
    timeout;
    enable;
    remark;
    createTime;
    updateTime;
};
exports.ReportApi = ReportApi;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', unsigned: true, comment: '主键ID' }),
    __metadata("design:type", Number)
], ReportApi.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'api_code', length: 64, unique: true, comment: '接口唯一编码' }),
    __metadata("design:type", String)
], ReportApi.prototype, "apiCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'api_name', length: 128, comment: '接口名称' }),
    __metadata("design:type", String)
], ReportApi.prototype, "apiName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'api_url', length: 512, comment: '上报接口完整地址 http/https' }),
    __metadata("design:type", String)
], ReportApi.prototype, "apiUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 16, default: 'POST', comment: '请求方式 GET / POST' }),
    __metadata("design:type", String)
], ReportApi.prototype, "method", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 3000, comment: '请求超时时间，单位毫秒' }),
    __metadata("design:type", Number)
], ReportApi.prototype, "timeout", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', default: 1, comment: '是否启用 1启用 0禁用' }),
    __metadata("design:type", Number)
], ReportApi.prototype, "enable", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 512, default: '', comment: '备注说明' }),
    __metadata("design:type", String)
], ReportApi.prototype, "remark", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'create_time', type: 'datetime', comment: '创建时间' }),
    __metadata("design:type", Date)
], ReportApi.prototype, "createTime", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'update_time', type: 'datetime', comment: '更新时间' }),
    __metadata("design:type", Date)
], ReportApi.prototype, "updateTime", void 0);
exports.ReportApi = ReportApi = __decorate([
    (0, typeorm_1.Entity)('sys_report_api')
], ReportApi);
//# sourceMappingURL=report-api.entity.js.map