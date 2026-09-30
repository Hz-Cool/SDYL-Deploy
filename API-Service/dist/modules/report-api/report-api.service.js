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
exports.ReportApiService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const report_api_entity_1 = require("./entities/report-api.entity");
const api_query_history_entity_1 = require("./entities/api-query-history.entity");
const http_request_client_service_1 = require("../http-request-client/http-request-client.service");
let ReportApiService = class ReportApiService {
    reportApiRepository;
    queryHistoryRepository;
    httpClientService;
    constructor(reportApiRepository, queryHistoryRepository, httpClientService) {
        this.reportApiRepository = reportApiRepository;
        this.queryHistoryRepository = queryHistoryRepository;
        this.httpClientService = httpClientService;
    }
    async saveOrUpdate(dto) {
        return await this.reportApiRepository.save(dto);
    }
    async delete(id) {
        if (!id) {
            throw new common_1.InternalServerErrorException('请输入接口配置ID');
        }
        return await this.reportApiRepository.delete(id);
    }
    async search({ pageNum = 1, pageSize = 10, apiCode, apiName, enable, }) {
        const where = {};
        if (apiCode) {
            where.apiCode = (0, typeorm_2.Like)(`%${apiCode}%`);
        }
        if (apiName) {
            where.apiName = (0, typeorm_2.Like)(`%${apiName}%`);
        }
        if (enable !== undefined && enable !== null) {
            where.enable = enable;
        }
        const options = {
            where,
            take: pageSize,
            skip: (pageNum - 1) * pageSize,
            order: { id: 'DESC' },
        };
        const [list, total] = await this.reportApiRepository.findAndCount(options);
        return {
            total,
            list,
        };
    }
    async findOneById(id) {
        if (!id) {
            throw new common_1.InternalServerErrorException('请输入接口配置ID');
        }
        const item = await this.reportApiRepository.findOneBy({ id });
        if (!item) {
            throw new common_1.InternalServerErrorException('该接口配置不存在');
        }
        return item;
    }
    async findOneByCode(apiCode) {
        if (!apiCode)
            return null;
        return await this.reportApiRepository.findOneBy({ apiCode });
    }
    async saveOrUpdateQueryHistory(dto) {
        if (!dto.apiCode) {
            throw new common_1.InternalServerErrorException('请输入关联的 apiCode');
        }
        return await this.queryHistoryRepository.save(dto);
    }
    async deleteQueryHistory(id) {
        if (!id) {
            throw new common_1.InternalServerErrorException('请输入查询历史ID');
        }
        return await this.queryHistoryRepository.delete(id);
    }
    async searchQueryHistory({ pageNum = 1, pageSize = 10, apiCode, queryName, }) {
        const where = {};
        if (apiCode) {
            where.apiCode = (0, typeorm_2.Like)(`%${apiCode}%`);
        }
        if (queryName) {
            where.queryName = (0, typeorm_2.Like)(`%${queryName}%`);
        }
        const options = {
            where,
            take: pageSize,
            skip: (pageNum - 1) * pageSize,
            order: { id: 'DESC' },
        };
        const [list, total] = await this.queryHistoryRepository.findAndCount(options);
        return {
            total,
            list,
        };
    }
    async findQueryHistoryById(id) {
        if (!id) {
            throw new common_1.InternalServerErrorException('请输入查询历史ID');
        }
        const item = await this.queryHistoryRepository.findOne({
            where: { id },
            order: { createTime: 'DESC' },
        });
        if (!item) {
            throw new common_1.InternalServerErrorException('该查询历史记录不存在');
        }
        return item;
    }
    async findQueryHistoryLastToken() {
        const apiCode = 'login';
        const item = await this.findQueryHistoryLastData(apiCode);
        return item?.queryResults?.access_token ?? 'error';
    }
    async findQueryHistoryLastData(apiCode) {
        const item = await this.queryHistoryRepository.findOne({
            where: { apiCode },
            order: { createTime: 'DESC' },
        });
        if (!item) {
            throw new common_1.InternalServerErrorException('该查询历史记录不存在');
        }
        return item;
    }
    async findQueryHistoryByApiCode(apiCode, pageNum = 1, pageSize = 10) {
        if (!apiCode) {
            return { list: [], total: 0 };
        }
        const [list, total] = await this.queryHistoryRepository.findAndCount({
            where: { apiCode },
            order: { id: 'DESC' },
            skip: (pageNum - 1) * pageSize,
            take: pageSize,
        });
        return { list, total };
    }
    async executeOnce(apiCode, payload) {
        if (!apiCode) {
            throw new common_1.InternalServerErrorException('请输入接口编码');
        }
        const apiConfig = await this.findOneByCode(apiCode);
        if (!apiConfig) {
            throw new common_1.InternalServerErrorException(`上报接口配置表中未找到 apiCode 为 '${apiCode}' 的记录`);
        }
        if (apiConfig.enable !== 1) {
            throw new common_1.InternalServerErrorException(`接口 [${apiCode}] '${apiConfig.apiName}' 当前已被禁用`);
        }
        const response = await this.httpClientService.request({
            apiCode: apiConfig.apiCode,
            apiName: apiConfig.apiName,
            url: apiConfig.apiUrl,
            method: (apiConfig.method || 'POST').toUpperCase(),
            timeout: apiConfig.timeout || 3000,
            data: payload ?? {},
        });
        return {
            success: true,
            statusCode: response.status,
            apiCode: apiConfig.apiCode,
            apiName: apiConfig.apiName,
            apiUrl: apiConfig.apiUrl,
            responseData: response.data,
        };
    }
};
exports.ReportApiService = ReportApiService;
exports.ReportApiService = ReportApiService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(report_api_entity_1.ReportApi)),
    __param(1, (0, typeorm_1.InjectRepository)(api_query_history_entity_1.ApiQueryHistory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        http_request_client_service_1.HttpRequestClientService])
], ReportApiService);
//# sourceMappingURL=report-api.service.js.map