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
exports.HttpRequestErrorLogService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const http_request_error_log_entity_1 = require("./http-request-error-log.entity");
let HttpRequestErrorLogService = class HttpRequestErrorLogService {
    errorLogRepository;
    constructor(errorLogRepository) {
        this.errorLogRepository = errorLogRepository;
    }
    async search({ pageNum = 1, pageSize = 10, requestId, apiCode, apiName, method, statusCode, startTime, endTime, }) {
        const where = {};
        if (requestId) {
            where.requestId = (0, typeorm_2.Like)(`%${requestId.trim()}%`);
        }
        if (apiCode) {
            where.apiCode = (0, typeorm_2.Like)(`%${apiCode.trim()}%`);
        }
        if (apiName) {
            where.apiName = (0, typeorm_2.Like)(`%${apiName.trim()}%`);
        }
        if (method) {
            where.method = method.trim().toUpperCase();
        }
        if (statusCode !== undefined && statusCode !== null && String(statusCode) !== '') {
            where.statusCode = Number(statusCode);
        }
        if (startTime && endTime) {
            where.createTime = (0, typeorm_2.Between)(new Date(startTime), new Date(endTime));
        }
        const [list, total] = await this.errorLogRepository.findAndCount({
            where,
            take: pageSize,
            skip: (pageNum - 1) * pageSize,
            order: { id: 'DESC' },
        });
        return {
            total,
            list,
            page: pageNum,
            pageSize,
        };
    }
    async delete(id) {
        if (!id) {
            throw new common_1.InternalServerErrorException('请输入有效的日志ID');
        }
        return await this.errorLogRepository.delete(id);
    }
    async batchDelete(ids) {
        if (!ids || !ids.length) {
            throw new common_1.InternalServerErrorException('请选择要删除的日志项');
        }
        return await this.errorLogRepository.delete({ id: (0, typeorm_2.In)(ids) });
    }
    async findOneById(id) {
        if (!id) {
            throw new common_1.InternalServerErrorException('请输入有效的日志ID');
        }
        const log = await this.errorLogRepository.findOneBy({ id });
        if (!log) {
            throw new common_1.InternalServerErrorException('未找到对应日志记录');
        }
        return log;
    }
    async createErrorLog(logData) {
        const log = this.errorLogRepository.create(logData);
        return await this.errorLogRepository.save(log);
    }
};
exports.HttpRequestErrorLogService = HttpRequestErrorLogService;
exports.HttpRequestErrorLogService = HttpRequestErrorLogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(http_request_error_log_entity_1.HttpRequestErrorLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HttpRequestErrorLogService);
//# sourceMappingURL=http-request-error-log.service.js.map