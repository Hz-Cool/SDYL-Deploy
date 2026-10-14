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
exports.MesInspectSubmit = void 0;
const typeorm_1 = require("typeorm");
let MesInspectSubmit = class MesInspectSubmit {
    id;
    submitNo;
    workOrderNo;
    productCode;
    productName;
    deviceGroup;
    submitType;
    submitStatus;
    submitTime;
    finishTime;
    inspectResult;
    remark;
    items;
    results;
    createTime;
    updateTime;
    isDeleted;
};
exports.MesInspectSubmit = MesInspectSubmit;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', unsigned: true, comment: '主键ID' }),
    __metadata("design:type", Number)
], MesInspectSubmit.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'submit_no', length: 64, unique: true, comment: '送检单号' }),
    __metadata("design:type", String)
], MesInspectSubmit.prototype, "submitNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'work_order_no', length: 64, comment: '工单号' }),
    __metadata("design:type", String)
], MesInspectSubmit.prototype, "workOrderNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_code', length: 64, comment: '产品编码' }),
    __metadata("design:type", String)
], MesInspectSubmit.prototype, "productCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_name', length: 128, nullable: true, comment: '产品名称' }),
    __metadata("design:type", String)
], MesInspectSubmit.prototype, "productName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'device_group', length: 128, nullable: true, comment: '设备组编码' }),
    __metadata("design:type", String)
], MesInspectSubmit.prototype, "deviceGroup", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'submit_type', type: 'tinyint', comment: '送检类型：1首件 2巡检 3完工送检 4不良复检' }),
    __metadata("design:type", Number)
], MesInspectSubmit.prototype, "submitType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'submit_status', type: 'tinyint', default: 1, comment: '送检状态：1待检验 2检验中 3已完成 4作废' }),
    __metadata("design:type", Number)
], MesInspectSubmit.prototype, "submitStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'submit_time', type: 'datetime', comment: '送检提交时间' }),
    __metadata("design:type", Date)
], MesInspectSubmit.prototype, "submitTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'finish_time', type: 'datetime', nullable: true, comment: '检验完成时间' }),
    __metadata("design:type", Date)
], MesInspectSubmit.prototype, "finishTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'inspect_result', type: 'tinyint', nullable: true, comment: '整体判定：0待判 1合格 2不合格 3让步接收' }),
    __metadata("design:type", Number)
], MesInspectSubmit.prototype, "inspectResult", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 512, nullable: true, comment: '送检备注' }),
    __metadata("design:type", String)
], MesInspectSubmit.prototype, "remark", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true, comment: '送检项目' }),
    __metadata("design:type", Object)
], MesInspectSubmit.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true, comment: '送检结果' }),
    __metadata("design:type", Object)
], MesInspectSubmit.prototype, "results", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'create_time', type: 'datetime', comment: '创建时间' }),
    __metadata("design:type", Date)
], MesInspectSubmit.prototype, "createTime", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'update_time', type: 'datetime', comment: '更新时间' }),
    __metadata("design:type", Date)
], MesInspectSubmit.prototype, "updateTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_deleted', type: 'tinyint', default: 0, comment: '逻辑删除 0未删1已删' }),
    __metadata("design:type", Number)
], MesInspectSubmit.prototype, "isDeleted", void 0);
exports.MesInspectSubmit = MesInspectSubmit = __decorate([
    (0, typeorm_1.Entity)('mes_inspect_submit')
], MesInspectSubmit);
//# sourceMappingURL=inspect-submit.entity.js.map