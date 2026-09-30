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
exports.SysConfigController = void 0;
const common_1 = require("@nestjs/common");
const sys_config_service_1 = require("./sys-config.service");
const sys_config_search_dto_1 = require("./dto/sys-config-search.dto");
const sys_config_history_search_dto_1 = require("./dto/sys-config-history-search.dto");
let SysConfigController = class SysConfigController {
    sysConfigService;
    constructor(sysConfigService) {
        this.sysConfigService = sysConfigService;
    }
    async search(queryDto) {
        return await this.sysConfigService.search(queryDto);
    }
    async findOne(id) {
        return await this.sysConfigService.findOne(Number(id));
    }
    async create(createDto) {
        return await this.sysConfigService.create(createDto);
    }
    async update(id, updateDto) {
        return await this.sysConfigService.update(Number(id), updateDto);
    }
    async remove(id) {
        return await this.sysConfigService.remove(Number(id));
    }
    async searchHistory(queryDto) {
        return await this.sysConfigService.searchHistory(queryDto);
    }
    async findHistoryOne(id) {
        return await this.sysConfigService.findHistoryOne(Number(id));
    }
    async clearHistory(configId) {
        return await this.sysConfigService.clearHistory(configId ? Number(configId) : undefined);
    }
    async deleteHistory(id) {
        return await this.sysConfigService.deleteHistory(Number(id));
    }
};
exports.SysConfigController = SysConfigController;
__decorate([
    (0, common_1.Post)('/search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sys_config_search_dto_1.SysConfigSearchDto]),
    __metadata("design:returntype", Promise)
], SysConfigController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SysConfigController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SysConfigController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SysConfigController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SysConfigController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('/history/search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sys_config_history_search_dto_1.SysConfigHistorySearchDto]),
    __metadata("design:returntype", Promise)
], SysConfigController.prototype, "searchHistory", null);
__decorate([
    (0, common_1.Get)('/history/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SysConfigController.prototype, "findHistoryOne", null);
__decorate([
    (0, common_1.Delete)('/history/clear'),
    __param(0, (0, common_1.Query)('configId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SysConfigController.prototype, "clearHistory", null);
__decorate([
    (0, common_1.Delete)('/history/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SysConfigController.prototype, "deleteHistory", null);
exports.SysConfigController = SysConfigController = __decorate([
    (0, common_1.Controller)('configs'),
    __metadata("design:paramtypes", [sys_config_service_1.SysConfigService])
], SysConfigController);
//# sourceMappingURL=sys-config.controller.js.map