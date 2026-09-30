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
exports.SysConfig = void 0;
const typeorm_1 = require("typeorm");
const sys_config_enum_1 = require("../../../common/enums/sys-config.enum");
let SysConfig = class SysConfig {
    id;
    configKey;
    configName;
    configGroup;
    configValue;
    valueType;
    status;
    sort;
    remark;
    isSystem;
    createTime;
    updateTime;
};
exports.SysConfig = SysConfig;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', unsigned: true, comment: '主键ID' }),
    __metadata("design:type", Number)
], SysConfig.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'config_key', length: 128, unique: true, comment: '配置唯一键' }),
    __metadata("design:type", String)
], SysConfig.prototype, "configKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'config_name', length: 128, comment: '配置中文名称' }),
    __metadata("design:type", String)
], SysConfig.prototype, "configName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'config_group', length: 64, default: 'default', comment: '配置分组' }),
    __metadata("design:type", String)
], SysConfig.prototype, "configGroup", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'config_value', type: 'text', nullable: true, comment: '配置值' }),
    __metadata("design:type", String)
], SysConfig.prototype, "configValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'value_type', type: 'tinyint', default: sys_config_enum_1.SysConfigValueType.STRING, comment: '值类型：1字符串 2数字 3布尔 4JSON' }),
    __metadata("design:type", Number)
], SysConfig.prototype, "valueType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status', type: 'tinyint', default: 1, comment: '状态：0禁用 1启用' }),
    __metadata("design:type", Number)
], SysConfig.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sort', type: 'int', default: 0, comment: '排序号' }),
    __metadata("design:type", Number)
], SysConfig.prototype, "sort", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'remark', length: 512, nullable: true, comment: '备注说明' }),
    __metadata("design:type", String)
], SysConfig.prototype, "remark", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_system', type: 'tinyint', default: 0, comment: '是否系统内置：1内置不可删除，0自定义' }),
    __metadata("design:type", Number)
], SysConfig.prototype, "isSystem", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'create_time', type: 'datetime', comment: '创建时间' }),
    __metadata("design:type", Date)
], SysConfig.prototype, "createTime", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'update_time', type: 'datetime', comment: '更新时间' }),
    __metadata("design:type", Date)
], SysConfig.prototype, "updateTime", void 0);
exports.SysConfig = SysConfig = __decorate([
    (0, typeorm_1.Entity)('sys_config')
], SysConfig);
//# sourceMappingURL=sys-config.js.map