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
exports.ScheduleTaskLog = void 0;
const typeorm_1 = require("typeorm");
let ScheduleTaskLog = class ScheduleTaskLog {
    id;
    taskCode;
    status;
    executionTime;
    requestPayload;
    responseData;
    errorMsg;
    createTime;
};
exports.ScheduleTaskLog = ScheduleTaskLog;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', unsigned: true, comment: '日志ID' }),
    __metadata("design:type", Number)
], ScheduleTaskLog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'task_code', length: 64, comment: '任务唯一标识' }),
    __metadata("design:type", String)
], ScheduleTaskLog.prototype, "taskCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', comment: '执行状态: 1成功 0失败' }),
    __metadata("design:type", Number)
], ScheduleTaskLog.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'execution_time', type: 'int', default: 0, comment: '执行耗时，单位毫秒(ms)' }),
    __metadata("design:type", Number)
], ScheduleTaskLog.prototype, "executionTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'request_payload', type: 'json', nullable: true, comment: '本次实际发送的 payload' }),
    __metadata("design:type", Object)
], ScheduleTaskLog.prototype, "requestPayload", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'response_data', type: 'text', nullable: true, comment: '返回结果/响应内容' }),
    __metadata("design:type", String)
], ScheduleTaskLog.prototype, "responseData", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'error_msg', type: 'text', nullable: true, comment: '失败异常信息' }),
    __metadata("design:type", String)
], ScheduleTaskLog.prototype, "errorMsg", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'create_time', type: 'datetime', comment: '记录时间' }),
    __metadata("design:type", Date)
], ScheduleTaskLog.prototype, "createTime", void 0);
exports.ScheduleTaskLog = ScheduleTaskLog = __decorate([
    (0, typeorm_1.Entity)('sys_schedule_task_log')
], ScheduleTaskLog);
//# sourceMappingURL=schedule-task-log.entity.js.map