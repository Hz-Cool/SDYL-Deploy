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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcryptjs");
const user_entity_1 = require("./user.entity");
let UsersService = class UsersService {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async saveOrUpdate(dto) {
        if (dto.password) {
            if (!dto.password.startsWith('$2a$') && !dto.password.startsWith('$2b$') && !dto.password.startsWith('$2y$')) {
                dto.password = bcrypt.hashSync(dto.password, 10);
            }
        }
        return await this.usersRepository.save(dto);
    }
    async delete({ id }) {
        if (!id) {
            throw new common_1.InternalServerErrorException('请输入用户ID');
        }
        return await this.usersRepository.softDelete(id);
    }
    async search({ pageNum = 1, pageSize = 10, username, nickname, status }) {
        const where = {};
        if (username) {
            where.username = (0, typeorm_2.Like)(`%${username}%`);
        }
        if (nickname) {
            where.nickname = (0, typeorm_2.Like)(`%${nickname}%`);
        }
        if (status !== undefined && status !== null) {
            where.status = status;
        }
        const options = {
            where,
            take: pageSize,
            skip: (pageNum - 1) * pageSize,
            order: { id: 'DESC' },
            withDeleted: false,
        };
        const [users, total] = await this.usersRepository.findAndCount(options);
        return {
            total,
            list: users,
        };
    }
    async findOne(username) {
        if (!username)
            return null;
        return await this.usersRepository.findOneBy({ username });
    }
    async findOneById(id) {
        if (!id) {
            throw new common_1.InternalServerErrorException('请输入用户ID');
        }
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) {
            throw new common_1.InternalServerErrorException('该用户不存在');
        }
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map