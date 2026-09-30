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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test111Controller = void 0;
const common_1 = require("@nestjs/common");
const test111_service_1 = require("./test111.service");
const public_1 = require("../utils/decorator/public");
const logger_util_1 = require("../../utils/logger.util");
let Test111Controller = class Test111Controller {
    test111Service;
    logger = (0, logger_util_1.getCustomLogger)('test111');
    constructor(test111Service) {
        this.test111Service = test111Service;
    }
    async getAllTable1() {
        this.logger.info('Fetching all records from table1');
        const result = await this.test111Service.findAll();
        this.logger.info({ count: result.length }, 'Successfully fetched table1 records');
        return result;
    }
    async getTable1ById(id) {
        return this.test111Service.findById(id);
    }
};
exports.Test111Controller = Test111Controller;
__decorate([
    (0, public_1.Public)(),
    (0, common_1.Get)('table1'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Test111Controller.prototype, "getAllTable1", null);
__decorate([
    (0, common_1.Get)('table1/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], Test111Controller.prototype, "getTable1ById", null);
exports.Test111Controller = Test111Controller = __decorate([
    (0, common_1.Controller)('test111'),
    __metadata("design:paramtypes", [test111_service_1.Test111Service])
], Test111Controller);
//# sourceMappingURL=test111.controller.js.map