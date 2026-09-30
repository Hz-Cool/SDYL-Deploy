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
exports.ScheduleTask = void 0;
const typeorm_1 = require("typeorm");
let ScheduleTask = class ScheduleTask {
    id;
    taskCode;
    taskName;
    apiCode;
    cronExpression;
    enable;
    payloadParams;
    lastRunTime;
    lastStatus;
    remark;
    createTime;
    updateTime;
};
exports.ScheduleTask = ScheduleTask;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', unsigned: true, comment: '主键ID' }),
    __metadata("design:type", Number)
], ScheduleTask.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'task_code', length: 64, unique: true, comment: '任务唯一标识，对应 Handler 标识' }),
    __metadata("design:type", String)
], ScheduleTask.prototype, "taskCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'task_name', length: 128, comment: '任务名称' }),
    __metadata("design:type", String)
], ScheduleTask.prototype, "taskName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'api_code', length: 64, default: '', comment: '关联的上报接口编码 (sys_report_api)' }),
    __metadata("design:type", String)
], ScheduleTask.prototype, "apiCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cron_expression', length: 64, comment: 'Cron表达式' }),
    __metadata("design:type", String)
], ScheduleTask.prototype, "cronExpression", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', default: 1, comment: '是否启用: 1启用 0禁用' }),
    __metadata("design:type", Number)
], ScheduleTask.prototype, "enable", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payload_params', type: 'json', nullable: true, comment: '静态配置参数/模板' }),
    __metadata("design:type", Object)
], ScheduleTask.prototype, "payloadParams", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_run_time', type: 'datetime', nullable: true, comment: '最近一次运行时间' }),
    __metadata("design:type", Date)
], ScheduleTask.prototype, "lastRunTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_status', type: 'tinyint', nullable: true, default: 1, comment: '最近一次运行状态: 1成功 0失败' }),
    __metadata("design:type", Number)
], ScheduleTask.prototype, "lastStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 512, default: '', comment: '备注说明' }),
    __metadata("design:type", String)
], ScheduleTask.prototype, "remark", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'create_time', type: 'datetime', comment: '创建时间' }),
    __metadata("design:type", Date)
], ScheduleTask.prototype, "createTime", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'update_time', type: 'datetime', comment: '更新时间' }),
    __metadata("design:type", Date)
], ScheduleTask.prototype, "updateTime", void 0);
exports.ScheduleTask = ScheduleTask = __decorate([
    (0, typeorm_1.Entity)('sys_schedule_task')
], ScheduleTask);
//# sourceMappingURL=schedule-task.entity.js.map