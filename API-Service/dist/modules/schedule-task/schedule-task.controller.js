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
exports.ScheduleTaskController = void 0;
const common_1 = require("@nestjs/common");
const schedule_task_service_1 = require("./schedule-task.service");
const schedule_task_search_dto_1 = require("./dto/schedule-task-search.dto");
const schedule_task_log_search_dto_1 = require("./dto/schedule-task-log-search.dto");
let ScheduleTaskController = class ScheduleTaskController {
    scheduleTaskService;
    constructor(scheduleTaskService) {
        this.scheduleTaskService = scheduleTaskService;
    }
    async searchTasks(queryDto) {
        return await this.scheduleTaskService.searchTasks(queryDto);
    }
    async findLogs(queryDto) {
        return await this.scheduleTaskService.findLogs(queryDto);
    }
    async clearLogs(taskCode) {
        return await this.scheduleTaskService.clearLogs(taskCode);
    }
    async deleteLog(id) {
        return await this.scheduleTaskService.deleteLog(Number(id));
    }
    async findOne(id) {
        return await this.scheduleTaskService.findOne(Number(id));
    }
    async create(createDto) {
        return await this.scheduleTaskService.create(createDto);
    }
    async update(id, updateDto) {
        return await this.scheduleTaskService.update(Number(id), updateDto);
    }
    async toggleEnable(id, enable) {
        return await this.scheduleTaskService.toggleEnable(Number(id), enable);
    }
    async runTaskOnce(id) {
        return await this.scheduleTaskService.runTaskOnce(Number(id));
    }
    async remove(id) {
        return await this.scheduleTaskService.remove(Number(id));
    }
};
exports.ScheduleTaskController = ScheduleTaskController;
__decorate([
    (0, common_1.Post)('/search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [schedule_task_search_dto_1.ScheduleTaskSearchDto]),
    __metadata("design:returntype", Promise)
], ScheduleTaskController.prototype, "searchTasks", null);
__decorate([
    (0, common_1.Post)('/logs/search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [schedule_task_log_search_dto_1.ScheduleTaskLogSearchDto]),
    __metadata("design:returntype", Promise)
], ScheduleTaskController.prototype, "findLogs", null);
__decorate([
    (0, common_1.Delete)('/logs/clear'),
    __param(0, (0, common_1.Query)('taskCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleTaskController.prototype, "clearLogs", null);
__decorate([
    (0, common_1.Delete)('/logs/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleTaskController.prototype, "deleteLog", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleTaskController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ScheduleTaskController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ScheduleTaskController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':id/enable'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('enable')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], ScheduleTaskController.prototype, "toggleEnable", null);
__decorate([
    (0, common_1.Post)(':id/run-once'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleTaskController.prototype, "runTaskOnce", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleTaskController.prototype, "remove", null);
exports.ScheduleTaskController = ScheduleTaskController = __decorate([
    (0, common_1.Controller)('schedule-tasks'),
    __metadata("design:paramtypes", [schedule_task_service_1.ScheduleTaskService])
], ScheduleTaskController);
//# sourceMappingURL=schedule-task.controller.js.map