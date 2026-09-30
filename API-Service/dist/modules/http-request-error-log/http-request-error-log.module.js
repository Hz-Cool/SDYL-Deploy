"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpRequestErrorLogModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const http_request_error_log_entity_1 = require("./http-request-error-log.entity");
const http_request_error_log_controller_1 = require("./http-request-error-log.controller");
const http_request_error_log_service_1 = require("./http-request-error-log.service");
let HttpRequestErrorLogModule = class HttpRequestErrorLogModule {
};
exports.HttpRequestErrorLogModule = HttpRequestErrorLogModule;
exports.HttpRequestErrorLogModule = HttpRequestErrorLogModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([http_request_error_log_entity_1.HttpRequestErrorLog])],
        controllers: [http_request_error_log_controller_1.HttpRequestErrorLogController],
        providers: [http_request_error_log_service_1.HttpRequestErrorLogService],
        exports: [http_request_error_log_service_1.HttpRequestErrorLogService],
    })
], HttpRequestErrorLogModule);
//# sourceMappingURL=http-request-error-log.module.js.map