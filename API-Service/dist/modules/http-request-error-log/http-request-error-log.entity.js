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
exports.HttpRequestErrorLog = void 0;
const typeorm_1 = require("typeorm");
let HttpRequestErrorLog = class HttpRequestErrorLog {
    id;
    requestId;
    apiCode;
    apiName;
    requestUrl;
    method;
    requestHeaders;
    requestBody;
    statusCode;
    responseBody;
    errorMsg;
    errorStack;
    costMs;
    createTime;
};
exports.HttpRequestErrorLog = HttpRequestErrorLog;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', unsigned: true, comment: '主键ID' }),
    __metadata("design:type", Number)
], HttpRequestErrorLog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'request_id', length: 128, default: '', comment: '全局请求链路ID，和pino日志保持一致' }),
    __metadata("design:type", String)
], HttpRequestErrorLog.prototype, "requestId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'api_code', length: 64, comment: '上报接口编码，关联sys_report_api.api_code' }),
    __metadata("design:type", String)
], HttpRequestErrorLog.prototype, "apiCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'api_name', length: 128, default: '', comment: '接口名称，冗余存储，方便查询不用连表' }),
    __metadata("design:type", String)
], HttpRequestErrorLog.prototype, "apiName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'request_url', length: 1024, comment: '完整请求地址' }),
    __metadata("design:type", String)
], HttpRequestErrorLog.prototype, "requestUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 16, comment: '请求方式 GET/POST/PUT' }),
    __metadata("design:type", String)
], HttpRequestErrorLog.prototype, "method", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'request_headers', type: 'text', nullable: true, comment: '请求头（敏感信息建议掩码）' }),
    __metadata("design:type", String)
], HttpRequestErrorLog.prototype, "requestHeaders", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'request_body', type: 'text', nullable: true, comment: '请求报文' }),
    __metadata("design:type", String)
], HttpRequestErrorLog.prototype, "requestBody", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status_code', type: 'smallint', nullable: true, comment: '远端返回HTTP状态码，连接超时则为NULL' }),
    __metadata("design:type", Number)
], HttpRequestErrorLog.prototype, "statusCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'response_body', type: 'text', nullable: true, comment: '远端响应内容' }),
    __metadata("design:type", String)
], HttpRequestErrorLog.prototype, "responseBody", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'error_msg', type: 'text', comment: '简短异常信息' }),
    __metadata("design:type", String)
], HttpRequestErrorLog.prototype, "errorMsg", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'error_stack', type: 'text', nullable: true, comment: '异常堆栈信息' }),
    __metadata("design:type", String)
], HttpRequestErrorLog.prototype, "errorStack", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cost_ms', type: 'int', nullable: true, comment: '请求耗时(毫秒)' }),
    __metadata("design:type", Number)
], HttpRequestErrorLog.prototype, "costMs", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'create_time', type: 'datetime', comment: '记录创建时间' }),
    __metadata("design:type", Date)
], HttpRequestErrorLog.prototype, "createTime", void 0);
exports.HttpRequestErrorLog = HttpRequestErrorLog = __decorate([
    (0, typeorm_1.Entity)('sys_http_request_error_log')
], HttpRequestErrorLog);
//# sourceMappingURL=http-request-error-log.entity.js.map