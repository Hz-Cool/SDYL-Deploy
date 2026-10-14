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
exports.InspectSubmitService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const inspect_submit_entity_1 = require("./entities/inspect-submit.entity");
let InspectSubmitService = class InspectSubmitService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async search(query) {
        const pageNum = Number(query.pageNum) || 1;
        const pageSize = Number(query.pageSize) || 10;
        const qb = this.repo.createQueryBuilder('m');
        qb.where('m.isDeleted = 0');
        if (query.submitNo) {
            qb.andWhere('m.submitNo LIKE :submitNo', { submitNo: `%${query.submitNo}%` });
        }
        if (query.workOrderNo) {
            qb.andWhere('m.workOrderNo LIKE :workOrderNo', { workOrderNo: `%${query.workOrderNo}%` });
        }
        if (query.productCode) {
            qb.andWhere('m.productCode LIKE :productCode', { productCode: `%${query.productCode}%` });
        }
        if (query.submitType !== undefined && query.submitType !== null) {
            qb.andWhere('m.submitType = :submitType', { submitType: query.submitType });
        }
        if (query.submitStatus !== undefined && query.submitStatus !== null) {
            qb.andWhere('m.submitStatus = :submitStatus', { submitStatus: query.submitStatus });
        }
        if (query.inspectResult !== undefined && query.inspectResult !== null) {
            qb.andWhere('m.inspectResult = :inspectResult', { inspectResult: query.inspectResult });
        }
        qb.orderBy('m.id', 'DESC')
            .skip((pageNum - 1) * pageSize)
            .take(pageSize);
        const [list, total] = await qb.getManyAndCount();
        return { list, total, pageNum, pageSize };
    }
    async findOne(id) {
        const row = await this.repo.findOne({ where: { id, isDeleted: 0 } });
        if (!row)
            throw new common_1.NotFoundException(`送检单 ${id} 不存在`);
        return row;
    }
    async create(dto) {
        if (!dto.submitNo)
            throw new common_1.BadRequestException('submitNo 必填');
        const exist = await this.repo.findOne({ where: { submitNo: dto.submitNo } });
        if (exist)
            throw new common_1.BadRequestException(`送检单号 ${dto.submitNo} 已存在`);
        const row = this.repo.create(dto);
        return await this.repo.save(row);
    }
    async update(id, dto) {
        const row = await this.findOne(id);
        if (dto.submitNo && dto.submitNo !== row.submitNo) {
            const exist = await this.repo.findOne({ where: { submitNo: dto.submitNo } });
            if (exist)
                throw new common_1.BadRequestException(`送检单号 ${dto.submitNo} 已存在`);
        }
        Object.assign(row, dto);
        return await this.repo.save(row);
    }
    async remove(id) {
        const row = await this.findOne(id);
        row.isDeleted = 1;
        await this.repo.save(row);
        return { success: true };
    }
};
exports.InspectSubmitService = InspectSubmitService;
exports.InspectSubmitService = InspectSubmitService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(inspect_submit_entity_1.MesInspectSubmit)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], InspectSubmitService);
//# sourceMappingURL=inspect-submit.service.js.map