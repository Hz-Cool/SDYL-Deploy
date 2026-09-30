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
exports.ApiQueryHistory = void 0;
const typeorm_1 = require("typeorm");
let ApiQueryHistory = class ApiQueryHistory {
    id;
    apiCode;
    queryName;
    queryResults;
    createTime;
    updateTime;
    remark;
};
exports.ApiQueryHistory = ApiQueryHistory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', unsigned: true, comment: '主键ID' }),
    __metadata("design:type", Number)
], ApiQueryHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'api_code', length: 64, comment: '关联 sys_report_api.api_code' }),
    __metadata("design:type", String)
], ApiQueryHistory.prototype, "apiCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'query_name', length: 128, nullable: true, comment: '查询名称' }),
    __metadata("design:type", String)
], ApiQueryHistory.prototype, "queryName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'query_results', type: 'json', nullable: true, comment: '查询结果' }),
    __metadata("design:type", Object)
], ApiQueryHistory.prototype, "queryResults", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'create_time', type: 'datetime', comment: '创建时间' }),
    __metadata("design:type", Date)
], ApiQueryHistory.prototype, "createTime", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'update_time', type: 'datetime', comment: '更新时间' }),
    __metadata("design:type", Date)
], ApiQueryHistory.prototype, "updateTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true, comment: '备注' }),
    __metadata("design:type", String)
], ApiQueryHistory.prototype, "remark", void 0);
exports.ApiQueryHistory = ApiQueryHistory = __decorate([
    (0, typeorm_1.Entity)('api_query_history')
], ApiQueryHistory);
//# sourceMappingURL=api-query-history.entity.js.map