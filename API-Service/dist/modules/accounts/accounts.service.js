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
exports.AccountsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const account_entity_1 = require("./account.entity");
let AccountsService = class AccountsService {
    accountsRepository;
    constructor(accountsRepository) {
        this.accountsRepository = accountsRepository;
    }
    async saveOrUpdate(dto) {
        return await this.accountsRepository.save(dto);
    }
    async delete(id) {
        if (!id) {
            throw new common_1.InternalServerErrorException('请输入账号ID');
        }
        return await this.accountsRepository.delete(id);
    }
    async search({ pageNum = 1, pageSize = 10, account, status }) {
        const where = {};
        if (account) {
            where.account = (0, typeorm_2.Like)(`%${account}%`);
        }
        if (status !== undefined && status !== null) {
            where.status = status;
        }
        const options = {
            where,
            take: pageSize,
            skip: (pageNum - 1) * pageSize,
            order: { id: 'DESC' },
        };
        const [list, total] = await this.accountsRepository.findAndCount(options);
        return {
            total,
            list,
        };
    }
    async findOneById(id) {
        if (!id) {
            throw new common_1.InternalServerErrorException('请输入账号ID');
        }
        const item = await this.accountsRepository.findOneBy({ id });
        if (!item) {
            throw new common_1.InternalServerErrorException('该账号不存在');
        }
        return item;
    }
    async findOneByAccount(account) {
        if (!account)
            return null;
        return await this.accountsRepository.findOneBy({ account });
    }
    async findOne() {
        const [item] = await this.accountsRepository.find({
            order: { id: 'DESC' },
        });
        return item;
    }
};
exports.AccountsService = AccountsService;
exports.AccountsService = AccountsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(account_entity_1.Account)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AccountsService);
//# sourceMappingURL=accounts.service.js.map