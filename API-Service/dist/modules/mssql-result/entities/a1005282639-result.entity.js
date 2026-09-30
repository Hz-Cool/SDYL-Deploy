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
exports.A1005282639Result = void 0;
const typeorm_1 = require("typeorm");
let A1005282639Result = class A1005282639Result {
    op10Barcode;
    op10OnlineTime;
    op10OfflineTime;
    op10Qualified;
    op10TestPassed;
    op10InflectionPressure;
    op10FinalDisplacement;
    op10FinalPressure;
    op20OnlineTime;
    op20OfflineTime;
    op20Qualified;
    op20Barcode;
    op20TestPassed;
    op20InflectionPressure;
    op20FinalDisplacement;
    op20FinalPressure;
    op30OnlineTime;
    op30OfflineTime;
    op30Qualified;
    op30Barcode;
    op30TestPassed;
    op30InflectionPressure1;
    op30FinalDisplacement1;
    op30FinalPressure1;
    op30InflectionPressure2;
    op30FinalDisplacement2;
    op30FinalPressure2;
    op40OnlineTime;
    op40OfflineTime;
    op40Qualified;
    op40Barcode;
    op40TestPassed;
    op40InflectionPressure;
    op40FinalDisplacement;
    op40FinalPressure;
    op50OnlineTime;
    op50OfflineTime;
    op50Qualified;
    op50Barcode;
    op50TestPassed;
    op50Torque1;
    op50Torque2;
    op50Torque3;
    op50Torque4;
    op50Angle1;
    op50Angle2;
    op50Angle3;
    op50Angle4;
    op60OnlineTime;
    op60OfflineTime;
    op60Qualified;
    op60Barcode;
    op60TestPassed;
    op60LeakageRate;
};
exports.A1005282639Result = A1005282639Result;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'OP10二维码', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op10Barcode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP10上线时间', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op10OnlineTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP10下线时间', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op10OfflineTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP10是否合格', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op10Qualified", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP10测试合格', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op10TestPassed", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP10拐点压力', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op10InflectionPressure", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP10最终位移', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op10FinalDisplacement", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP10最终压力', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op10FinalPressure", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP20上线时间', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op20OnlineTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP20下线时间', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op20OfflineTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP20是否合格', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op20Qualified", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP20二维码', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op20Barcode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP20测试合格', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op20TestPassed", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP20拐点压力', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op20InflectionPressure", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP20最终位移', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op20FinalDisplacement", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP20最终压力', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op20FinalPressure", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP30上线时间', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op30OnlineTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP30下线时间', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op30OfflineTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP30是否合格', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op30Qualified", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP30二维码', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op30Barcode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP30测试合格', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op30TestPassed", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP30拐点压力1', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op30InflectionPressure1", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP30最终位移1', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op30FinalDisplacement1", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP30最终压力1', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op30FinalPressure1", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP30拐点压力2', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op30InflectionPressure2", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP30最终位移2', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op30FinalDisplacement2", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP30最终压力2', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op30FinalPressure2", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP40上线时间', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op40OnlineTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP40下线时间', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op40OfflineTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP40是否合格', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op40Qualified", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP40二维码', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op40Barcode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP40测试合格', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op40TestPassed", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP40拐点压力', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op40InflectionPressure", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP40最终位移', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op40FinalDisplacement", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP40最终压力', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op40FinalPressure", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP50上线时间', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op50OnlineTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP50下线时间', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op50OfflineTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP50是否合格', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op50Qualified", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP50二维码', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op50Barcode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP50测试合格', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op50TestPassed", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP50扭矩1', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op50Torque1", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP50扭矩2', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op50Torque2", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP50扭矩3', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op50Torque3", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP50扭矩4', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op50Torque4", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP50角度1', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op50Angle1", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP50角度2', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op50Angle2", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP50角度3', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op50Angle3", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP50角度4', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op50Angle4", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP60上线时间', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op60OnlineTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP60下线时间', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op60OfflineTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP60是否合格', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op60Qualified", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP60二维码', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op60Barcode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP60测试合格', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op60TestPassed", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'OP60泄漏量', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], A1005282639Result.prototype, "op60LeakageRate", void 0);
exports.A1005282639Result = A1005282639Result = __decorate([
    (0, typeorm_1.Entity)({ name: 'A1005282639zhengchangceshijieguozongbiao' })
], A1005282639Result);
//# sourceMappingURL=a1005282639-result.entity.js.map