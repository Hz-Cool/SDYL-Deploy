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
var SysConfigService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SysConfigService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sys_config_1 = require("./entities/sys-config");
const sys_config_history_1 = require("./entities/sys-config-history");
const sys_config_enum_1 = require("../../common/enums/sys-config.enum");
let SysConfigService = SysConfigService_1 = class SysConfigService {
    configRepo;
    historyRepo;
    logger = new common_1.Logger(SysConfigService_1.name);
    constructor(configRepo, historyRepo) {
        this.configRepo = configRepo;
        this.historyRepo = historyRepo;
    }
    async search(queryDto) {
        const pageNum = Number(queryDto.pageNum) || 1;
        const pageSize = Number(queryDto.pageSize) || 10;
        const qb = this.configRepo.createQueryBuilder('config');
        if (queryDto.configKey) {
            qb.andWhere('config.configKey LIKE :configKey', {
                configKey: `%${queryDto.configKey}%`,
            });
        }
        if (queryDto.configName) {
            qb.andWhere('config.configName LIKE :configName', {
                configName: `%${queryDto.configName}%`,
            });
        }
        if (queryDto.configGroup) {
            qb.andWhere('config.configGroup LIKE :configGroup', {
                configGroup: `%${queryDto.configGroup}%`,
            });
        }
        if (queryDto.status !== undefined &&
            queryDto.status !== null &&
            queryDto.status !== 'all') {
            qb.andWhere('config.status = :status', {
                status: Number(queryDto.status),
            });
        }
        if (queryDto.valueType !== undefined &&
            queryDto.valueType !== null &&
            queryDto.valueType !== 'all') {
            qb.andWhere('config.valueType = :valueType', {
                valueType: Number(queryDto.valueType),
            });
        }
        if (queryDto.isSystem !== undefined &&
            queryDto.isSystem !== null &&
            queryDto.isSystem !== 'all') {
            qb.andWhere('config.isSystem = :isSystem', {
                isSystem: Number(queryDto.isSystem),
            });
        }
        qb.orderBy('config.id', 'DESC')
            .skip((pageNum - 1) * pageSize)
            .take(pageSize);
        const [list, total] = await qb.getManyAndCount();
        return { list, total, pageNum, pageSize };
    }
    async findOne(id) {
        const config = await this.configRepo.findOne({ where: { id } });
        if (!config) {
            throw new common_1.NotFoundException(`未找到 ID 为 ${id} 的配置记录`);
        }
        return config;
    }
    async findOneByKey(configKey) {
        const config = await this.configRepo.findOne({ where: { configKey } });
        if (!config) {
            throw new common_1.NotFoundException(`未找到 configKey 为 ${configKey} 的配置记录`);
        }
        return config;
    }
    async findByKeyAuthorization() {
        const config = await this.configRepo.findOne({
            where: { configKey: 'authorization' },
        });
        if (!config) {
            throw new common_1.NotFoundException(`未找到 configKey 为 authorization 的配置记录`);
        }
        return config.valueType === sys_config_enum_1.SysConfigValueType.STRING
            ? config.configValue
            : '';
    }
    async create(createDto) {
        if (!createDto.configKey) {
            throw new common_1.BadRequestException('configKey 为必填项');
        }
        const exist = await this.configRepo.findOne({
            where: { configKey: createDto.configKey },
        });
        if (exist) {
            throw new common_1.BadRequestException(`已存在 configKey 为 '${createDto.configKey}' 的配置`);
        }
        const newConfig = this.configRepo.create(createDto);
        this.formatJsonValueIfNeeded(newConfig);
        return await this.configRepo.save(newConfig);
    }
    async update(id, updateDto) {
        const config = await this.findOne(id);
        if (updateDto.configKey && updateDto.configKey !== config.configKey) {
            const exist = await this.configRepo.findOne({
                where: { configKey: updateDto.configKey },
            });
            if (exist) {
                throw new common_1.BadRequestException(`已存在 configKey 为 '${updateDto.configKey}' 的配置`);
            }
        }
        const oldValue = config.configValue;
        Object.assign(config, updateDto);
        this.formatJsonValueIfNeeded(config);
        const savedConfig = await this.configRepo.save(config);
        if (oldValue !== savedConfig.configValue) {
            await this.recordHistory(savedConfig, oldValue, savedConfig.configValue, updateDto.remark);
        }
        return savedConfig;
    }
    async remove(id) {
        const config = await this.findOne(id);
        if (config.isSystem === 1) {
            throw new common_1.BadRequestException(`配置 '${config.configName}' 为系统内置配置，不允许删除`);
        }
        await this.recordHistory(config, config.configValue, null, '删除配置');
        await this.configRepo.remove(config);
        return { success: true, message: `配置 ${config.configName} 已删除` };
    }
    async searchHistory(queryDto) {
        const pageNum = Number(queryDto.pageNum) || 1;
        const pageSize = Number(queryDto.pageSize) || 10;
        const qb = this.historyRepo.createQueryBuilder('history');
        if (queryDto.configId) {
            qb.andWhere('history.configId = :configId', {
                configId: Number(queryDto.configId),
            });
        }
        if (queryDto.configKey) {
            qb.andWhere('history.configKey LIKE :configKey', {
                configKey: `%${queryDto.configKey}%`,
            });
        }
        qb.orderBy('history.id', 'DESC')
            .skip((pageNum - 1) * pageSize)
            .take(pageSize);
        const [list, total] = await qb.getManyAndCount();
        return { list, total, pageNum, pageSize };
    }
    async findHistoryOne(id) {
        const history = await this.historyRepo.findOne({ where: { id } });
        if (!history) {
            throw new common_1.NotFoundException(`未找到 ID 为 ${id} 的配置历史记录`);
        }
        return history;
    }
    async deleteHistory(id) {
        await this.historyRepo.delete(id);
        return { success: true, message: '配置历史已删除' };
    }
    async clearHistory(configId) {
        if (configId) {
            await this.historyRepo.delete({ configId });
        }
        else {
            await this.historyRepo.clear();
        }
        return { success: true, message: '配置历史已被清空' };
    }
    formatJsonValueIfNeeded(config) {
        if (config.valueType !== sys_config_enum_1.SysConfigValueType.JSON) {
            return;
        }
        const raw = config.configValue;
        if (raw === undefined || raw === null || raw === '') {
            return;
        }
        try {
            const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
            config.configValue = JSON.stringify(parsed, null, 2);
        }
        catch {
            throw new common_1.BadRequestException(`配置 '${config.configName || config.configKey || ''}' 的值不是合法 JSON`);
        }
    }
    async recordHistory(config, oldValue, newValue, remark) {
        try {
            const history = this.historyRepo.create({
                configId: config.id,
                configKey: config.configKey,
                oldValue: oldValue ?? undefined,
                newValue: newValue ?? undefined,
                remark: remark || undefined,
            });
            await this.historyRepo.save(history);
        }
        catch (e) {
            this.logger.error(`[SysConfig] 写入配置历史失败: ${e?.message || String(e)}`);
        }
    }
};
exports.SysConfigService = SysConfigService;
exports.SysConfigService = SysConfigService = SysConfigService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sys_config_1.SysConfig)),
    __param(1, (0, typeorm_1.InjectRepository)(sys_config_history_1.SysConfigHistory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SysConfigService);
//# sourceMappingURL=sys-config.service.js.map