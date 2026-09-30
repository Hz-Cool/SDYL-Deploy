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
exports.SysConfigHistory = void 0;
const typeorm_1 = require("typeorm");
let SysConfigHistory = class SysConfigHistory {
    id;
    configId;
    configKey;
    oldValue;
    newValue;
    remark;
    updateTime;
};
exports.SysConfigHistory = SysConfigHistory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', unsigned: true, comment: '主键ID' }),
    __metadata("design:type", Number)
], SysConfigHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'config_id', type: 'bigint', unsigned: true, comment: 'sys_config主键ID' }),
    __metadata("design:type", Number)
], SysConfigHistory.prototype, "configId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'config_key', length: 128, comment: '配置唯一键' }),
    __metadata("design:type", String)
], SysConfigHistory.prototype, "configKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'old_value', type: 'text', nullable: true, comment: '修改前值' }),
    __metadata("design:type", String)
], SysConfigHistory.prototype, "oldValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'new_value', type: 'text', nullable: true, comment: '修改后值' }),
    __metadata("design:type", String)
], SysConfigHistory.prototype, "newValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'remark', length: 256, nullable: true, comment: '修改原因备注' }),
    __metadata("design:type", String)
], SysConfigHistory.prototype, "remark", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'update_time', type: 'datetime', comment: '修改时间' }),
    __metadata("design:type", Date)
], SysConfigHistory.prototype, "updateTime", void 0);
exports.SysConfigHistory = SysConfigHistory = __decorate([
    (0, typeorm_1.Entity)('sys_config_history')
], SysConfigHistory);
//# sourceMappingURL=sys-config-history.js.map