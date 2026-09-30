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
exports.MssqlResultService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const a1000495177_result_entity_1 = require("./entities/a1000495177-result.entity");
const a1003944189_result_entity_1 = require("./entities/a1003944189-result.entity");
const a1005282639_result_entity_1 = require("./entities/a1005282639-result.entity");
const current_product_1 = require("./entities/current-product");
const login_util_1 = require("../../utils/login.util");
let MssqlResultService = class MssqlResultService {
    repo495177;
    repo944189;
    repo282639;
    currentProductRepository;
    constructor(repo495177, repo944189, repo282639, currentProductRepository) {
        this.repo495177 = repo495177;
        this.repo944189 = repo944189;
        this.repo282639 = repo282639;
        this.currentProductRepository = currentProductRepository;
    }
    async search495177({ pageNum = 1, pageSize = 20, barcode, }) {
        const where = {};
        if (barcode)
            where.op10Barcode = (0, typeorm_2.Like)(`%${barcode}%`);
        const [list, total] = await this.repo495177.findAndCount({
            where,
            take: pageSize,
            skip: (pageNum - 1) * pageSize,
            order: { op10OnlineTime: 'DESC' },
        });
        return { total, list };
    }
    async findOne495177(barcode) {
        return this.repo495177.findOne({ where: { op10Barcode: barcode } });
    }
    async save495177(dto) {
        return this.repo495177.save(dto);
    }
    async delete495177(barcode) {
        return this.repo495177.delete({ op10Barcode: barcode });
    }
    async search944189({ pageNum = 1, pageSize = 20, barcode, }) {
        const where = {};
        if (barcode)
            where.op10Barcode = (0, typeorm_2.Like)(`%${barcode}%`);
        const [list, total] = await this.repo944189.findAndCount({
            where,
            take: pageSize,
            skip: (pageNum - 1) * pageSize,
            order: { op10OnlineTime: 'DESC' },
        });
        return { total, list };
    }
    async findOne944189(barcode) {
        return this.repo944189.findOne({ where: { op10Barcode: barcode } });
    }
    async save944189(dto) {
        return this.repo944189.save(dto);
    }
    async delete944189(barcode) {
        return this.repo944189.delete({ op10Barcode: barcode });
    }
    async search282639({ pageNum = 1, pageSize = 20, barcode, }) {
        const where = {};
        if (barcode)
            where.op10Barcode = (0, typeorm_2.Like)(`%${barcode}%`);
        const [list, total] = await this.repo282639.findAndCount({
            where,
            take: pageSize,
            skip: (pageNum - 1) * pageSize,
            order: { op10OnlineTime: 'DESC' },
        });
        return { total, list };
    }
    async findOne282639(barcode) {
        return this.repo282639.findOne({ where: { op10Barcode: barcode } });
    }
    async save282639(dto) {
        return this.repo282639.save(dto);
    }
    async delete282639(barcode) {
        return this.repo282639.delete({ op10Barcode: barcode });
    }
    async getCurrentProduct() {
        const [list, total] = await this.currentProductRepository.findAndCount({
            order: { num: 'DESC' },
        });
        console.log((0, login_util_1.encryptDES)('123456'));
        return { total, list };
    }
};
exports.MssqlResultService = MssqlResultService;
exports.MssqlResultService = MssqlResultService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(a1000495177_result_entity_1.A1000495177Result, 'mssqlConnection')),
    __param(1, (0, typeorm_1.InjectRepository)(a1003944189_result_entity_1.A1003944189Result, 'mssqlConnection')),
    __param(2, (0, typeorm_1.InjectRepository)(a1005282639_result_entity_1.A1005282639Result, 'mssqlConnection')),
    __param(3, (0, typeorm_1.InjectRepository)(current_product_1.CurrentProduct, 'mssqlConnection')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MssqlResultService);
//# sourceMappingURL=mssql-result.service.js.map