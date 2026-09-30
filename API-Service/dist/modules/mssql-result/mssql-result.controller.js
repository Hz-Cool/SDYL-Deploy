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
exports.MssqlResultController = void 0;
const common_1 = require("@nestjs/common");
const mssql_result_service_1 = require("./mssql-result.service");
const mssql_result_search_dto_1 = require("./dto/mssql-result-search.dto");
const public_1 = require("../utils/decorator/public");
let MssqlResultController = class MssqlResultController {
    service;
    constructor(service) {
        this.service = service;
    }
    search495177(dto) {
        return this.service.search495177(dto);
    }
    findOne495177(barcode) {
        return this.service.findOne495177(barcode);
    }
    save495177(dto) {
        return this.service.save495177(dto);
    }
    delete495177(barcode) {
        return this.service.delete495177(barcode);
    }
    search944189(dto) {
        return this.service.search944189(dto);
    }
    findOne944189(barcode) {
        return this.service.findOne944189(barcode);
    }
    save944189(dto) {
        return this.service.save944189(dto);
    }
    delete944189(barcode) {
        return this.service.delete944189(barcode);
    }
    search282639(dto) {
        return this.service.search282639(dto);
    }
    findOne282639(barcode) {
        return this.service.findOne282639(barcode);
    }
    save282639(dto) {
        return this.service.save282639(dto);
    }
    delete282639(barcode) {
        return this.service.delete282639(barcode);
    }
    getCurrentProduct() {
        return this.service.getCurrentProduct();
    }
};
exports.MssqlResultController = MssqlResultController;
__decorate([
    (0, common_1.Post)('495177/search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mssql_result_search_dto_1.MssqlResultSearchDto]),
    __metadata("design:returntype", void 0)
], MssqlResultController.prototype, "search495177", null);
__decorate([
    (0, common_1.Get)('495177/:barcode'),
    __param(0, (0, common_1.Param)('barcode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MssqlResultController.prototype, "findOne495177", null);
__decorate([
    (0, common_1.Post)('495177/save'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MssqlResultController.prototype, "save495177", null);
__decorate([
    (0, common_1.Delete)('495177/:barcode'),
    __param(0, (0, common_1.Param)('barcode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MssqlResultController.prototype, "delete495177", null);
__decorate([
    (0, common_1.Post)('944189/search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mssql_result_search_dto_1.MssqlResultSearchDto]),
    __metadata("design:returntype", void 0)
], MssqlResultController.prototype, "search944189", null);
__decorate([
    (0, common_1.Get)('944189/:barcode'),
    __param(0, (0, common_1.Param)('barcode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MssqlResultController.prototype, "findOne944189", null);
__decorate([
    (0, common_1.Post)('944189/save'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MssqlResultController.prototype, "save944189", null);
__decorate([
    (0, common_1.Delete)('944189/:barcode'),
    __param(0, (0, common_1.Param)('barcode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MssqlResultController.prototype, "delete944189", null);
__decorate([
    (0, common_1.Post)('282639/search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mssql_result_search_dto_1.MssqlResultSearchDto]),
    __metadata("design:returntype", void 0)
], MssqlResultController.prototype, "search282639", null);
__decorate([
    (0, common_1.Get)('282639/:barcode'),
    __param(0, (0, common_1.Param)('barcode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MssqlResultController.prototype, "findOne282639", null);
__decorate([
    (0, common_1.Post)('282639/save'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MssqlResultController.prototype, "save282639", null);
__decorate([
    (0, common_1.Delete)('282639/:barcode'),
    __param(0, (0, common_1.Param)('barcode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MssqlResultController.prototype, "delete282639", null);
__decorate([
    (0, public_1.Public)(),
    (0, common_1.Get)('current-product'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MssqlResultController.prototype, "getCurrentProduct", null);
exports.MssqlResultController = MssqlResultController = __decorate([
    (0, common_1.Controller)('mssql-result'),
    __metadata("design:paramtypes", [mssql_result_service_1.MssqlResultService])
], MssqlResultController);
//# sourceMappingURL=mssql-result.controller.js.map