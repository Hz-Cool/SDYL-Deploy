"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleTaskModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const schedule_task_entity_1 = require("./entities/schedule-task.entity");
const schedule_task_log_entity_1 = require("./entities/schedule-task-log.entity");
const schedule_task_service_1 = require("./schedule-task.service");
const schedule_task_controller_1 = require("./schedule-task.controller");
const request_event_module_1 = require("../request-event/request-event.module");
let ScheduleTaskModule = class ScheduleTaskModule {
};
exports.ScheduleTaskModule = ScheduleTaskModule;
exports.ScheduleTaskModule = ScheduleTaskModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([schedule_task_entity_1.ScheduleTask, schedule_task_log_entity_1.ScheduleTaskLog]),
            request_event_module_1.RequestEventModule,
        ],
        controllers: [schedule_task_controller_1.ScheduleTaskController],
        providers: [schedule_task_service_1.ScheduleTaskService],
        exports: [schedule_task_service_1.ScheduleTaskService],
    })
], ScheduleTaskModule);
//# sourceMappingURL=schedule-task.module.js.map