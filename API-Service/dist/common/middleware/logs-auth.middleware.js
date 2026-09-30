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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogsAuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let LogsAuthMiddleware = class LogsAuthMiddleware {
    jwtService;
    configService;
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async use(req, res, next) {
        let token;
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const [type, authToken] = authHeader.split(' ');
            if (type === 'Bearer') {
                token = authToken;
            }
        }
        if (!token && req.query.token) {
            const rawToken = req.query.token.trim();
            token = rawToken.startsWith('Bearer ') ? rawToken.slice(7).trim() : rawToken;
        }
        if (!token) {
            throw new common_1.UnauthorizedException('Access denied: Missing auth token for /logs route');
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get('JWT_SECRET'),
            });
            req['user'] = payload;
            next();
        }
        catch {
            throw new common_1.UnauthorizedException('Access denied: Invalid or expired token');
        }
    }
};
exports.LogsAuthMiddleware = LogsAuthMiddleware;
exports.LogsAuthMiddleware = LogsAuthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService])
], LogsAuthMiddleware);
//# sourceMappingURL=logs-auth.middleware.js.map