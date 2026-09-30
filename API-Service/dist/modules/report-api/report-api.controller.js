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
exports.ReportApiController = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const report_api_service_1 = require("./report-api.service");
const report_api_search_dto_1 = require("./dto/report-api-search.dto");
const api_query_history_search_dto_1 = require("./dto/api-query-history-search.dto");
const public_1 = require("../utils/decorator/public");
let ReportApiController = class ReportApiController {
    reportApiService;
    constructor(reportApiService) {
        this.reportApiService = reportApiService;
    }
    async saveOrUpdate(dto) {
        return await this.reportApiService.saveOrUpdate(dto);
    }
    async delete(id) {
        return await this.reportApiService.delete(id);
    }
    async search(dto) {
        return await this.reportApiService.search(dto);
    }
    async getReportApi(id) {
        return await this.reportApiService.findOneById(id);
    }
    async getReportApiByCode(apiCode) {
        return await this.reportApiService.findOneByCode(apiCode);
    }
    async saveOrUpdateQueryHistory(dto) {
        return await this.reportApiService.saveOrUpdateQueryHistory(dto);
    }
    async deleteQueryHistory(id) {
        return await this.reportApiService.deleteQueryHistory(id);
    }
    async searchQueryHistory(dto) {
        return await this.reportApiService.searchQueryHistory(dto);
    }
    async getQueryHistory(id) {
        return await this.reportApiService.findQueryHistoryById(id);
    }
    async getQueryHistoryByCode(apiCode, pageNum, pageSize) {
        return await this.reportApiService.findQueryHistoryByApiCode(apiCode, pageNum ? Number(pageNum) : 1, pageSize ? Number(pageSize) : 10);
    }
    async getQueryHistoryByLastCode(apiCode) {
        return await this.reportApiService.findQueryHistoryLastData(apiCode);
    }
    async getQueryHistoryByOrderLastCode() {
        return await this.reportApiService.findQueryHistoryLastData('order');
    }
    getQueryHistoryByOrderLastCodeSse() {
        let lastRecord = null;
        return (0, rxjs_1.interval)(5000).pipe((0, rxjs_1.startWith)(0), (0, rxjs_1.switchMap)(async () => {
            try {
                return await this.reportApiService.findQueryHistoryLastData('order');
            }
            catch {
                return null;
            }
        }), (0, rxjs_1.filter)((current) => {
            if (JSON.stringify(current) === JSON.stringify(lastRecord))
                return false;
            lastRecord = current;
            return true;
        }), (0, rxjs_1.map)((record) => ({ data: record })));
    }
    async executeOnce(apiCode, body) {
        return await this.reportApiService.executeOnce(apiCode, body ?? {});
    }
};
exports.ReportApiController = ReportApiController;
__decorate([
    (0, common_1.Post)('/saveOrUpdate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportApiController.prototype, "saveOrUpdate", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReportApiController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('/search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_api_search_dto_1.ReportApiSearchDto]),
    __metadata("design:returntype", Promise)
], ReportApiController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('/get/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReportApiController.prototype, "getReportApi", null);
__decorate([
    (0, common_1.Get)('/getByCode/:apiCode'),
    __param(0, (0, common_1.Param)('apiCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportApiController.prototype, "getReportApiByCode", null);
__decorate([
    (0, common_1.Post)('/query-history/saveOrUpdate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportApiController.prototype, "saveOrUpdateQueryHistory", null);
__decorate([
    (0, common_1.Delete)('/query-history/delete/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReportApiController.prototype, "deleteQueryHistory", null);
__decorate([
    (0, common_1.Post)('/query-history/search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [api_query_history_search_dto_1.ApiQueryHistorySearchDto]),
    __metadata("design:returntype", Promise)
], ReportApiController.prototype, "searchQueryHistory", null);
__decorate([
    (0, common_1.Get)('/query-history/get/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReportApiController.prototype, "getQueryHistory", null);
__decorate([
    (0, common_1.Get)('/query-history/getByCode/:apiCode'),
    __param(0, (0, common_1.Param)('apiCode')),
    __param(1, (0, common_1.Query)('pageNum')),
    __param(2, (0, common_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ReportApiController.prototype, "getQueryHistoryByCode", null);
__decorate([
    (0, common_1.Get)('/query-history/getByCodeLastData/:apiCode'),
    __param(0, (0, common_1.Param)('apiCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportApiController.prototype, "getQueryHistoryByLastCode", null);
__decorate([
    (0, public_1.Public)(),
    (0, common_1.Get)('/query-history/getByCodeOrderLastData'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportApiController.prototype, "getQueryHistoryByOrderLastCode", null);
__decorate([
    (0, public_1.Public)(),
    (0, common_1.Sse)('/query-history/getByCodeOrderLastData/sse'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], ReportApiController.prototype, "getQueryHistoryByOrderLastCodeSse", null);
__decorate([
    (0, common_1.Post)('/execute/:apiCode'),
    __param(0, (0, common_1.Param)('apiCode')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReportApiController.prototype, "executeOnce", null);
exports.ReportApiController = ReportApiController = __decorate([
    (0, common_1.Controller)('report-api'),
    __metadata("design:paramtypes", [report_api_service_1.ReportApiService])
], ReportApiController);
//# sourceMappingURL=report-api.controller.js.map