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
exports.Account = void 0;
const typeorm_1 = require("typeorm");
let Account = class Account {
    id;
    account;
    password;
    token;
    expireTime;
    status;
    createTime;
    updateTime;
};
exports.Account = Account;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', unsigned: true, comment: '主键ID' }),
    __metadata("design:type", Number)
], Account.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 64, unique: true, comment: '登录账号' }),
    __metadata("design:type", String)
], Account.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 128, comment: '加密密码' }),
    __metadata("design:type", String)
], Account.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 1024, nullable: true, default: null, comment: '登录token' }),
    __metadata("design:type", String)
], Account.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expire_time', type: 'datetime', nullable: true, default: null, comment: 'token过期时间' }),
    __metadata("design:type", Date)
], Account.prototype, "expireTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', default: 1, comment: '状态1启用0禁用' }),
    __metadata("design:type", Number)
], Account.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'create_time', type: 'datetime', comment: '创建时间' }),
    __metadata("design:type", Date)
], Account.prototype, "createTime", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'update_time', type: 'datetime', comment: '更新时间' }),
    __metadata("design:type", Date)
], Account.prototype, "updateTime", void 0);
exports.Account = Account = __decorate([
    (0, typeorm_1.Entity)('sys_account')
], Account);
//# sourceMappingURL=account.entity.js.map