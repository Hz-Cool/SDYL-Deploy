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
var ScheduleTaskService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleTaskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const schedule_1 = require("@nestjs/schedule");
const schedule_task_entity_1 = require("./entities/schedule-task.entity");
const schedule_task_log_entity_1 = require("./entities/schedule-task-log.entity");
const login_event_service_1 = require("../request-event/login/login-event.service");
const table1_event_service_1 = require("../request-event/table1/table1-event.service");
const order_event_service_1 = require("../request-event/order/order-event.service");
const { CronJob } = require('cron');
let ScheduleTaskService = ScheduleTaskService_1 = class ScheduleTaskService {
    taskRepo;
    logRepo;
    schedulerRegistry;
    loginEventService;
    table1EventService;
    orderEventService;
    logger = new common_1.Logger(ScheduleTaskService_1.name);
    handlers = new Map();
    constructor(taskRepo, logRepo, schedulerRegistry, loginEventService, table1EventService, orderEventService) {
        this.taskRepo = taskRepo;
        this.logRepo = logRepo;
        this.schedulerRegistry = schedulerRegistry;
        this.loginEventService = loginEventService;
        this.table1EventService = table1EventService;
        this.orderEventService = orderEventService;
        this.registerHandler(this.loginEventService);
        this.registerHandler(this.table1EventService);
        this.registerHandler(this.orderEventService);
    }
    registerHandler(handler) {
        if (handler && handler.taskCode) {
            this.handlers.set(handler.taskCode, handler);
            this.logger.log(`[ScheduleTask] 已注册任务处理器: ${handler.taskCode}`);
            if (Array.isArray(handler.aliases)) {
                for (const alias of handler.aliases) {
                    this.handlers.set(alias, handler);
                    this.logger.log(`[ScheduleTask] 已注册任务处理器别名: ${alias}`);
                }
            }
        }
    }
    async onModuleInit() {
        try {
            await this.reloadAllTasks();
        }
        catch (err) {
            this.logger.error(`[ScheduleTask] 初始化拉起定时任务异常: ${err?.message || String(err)}`);
        }
    }
    async reloadAllTasks() {
        const tasks = await this.taskRepo.find();
        for (const task of tasks) {
            if (task.enable === 1) {
                this.startCronJob(task);
            }
            else {
                this.stopCronJob(task.taskCode);
            }
        }
        this.logger.log(`[ScheduleTask] 定时任务全量加载完成，共 ${tasks.length} 条配置`);
    }
    startCronJob(task) {
        const jobName = task.taskCode;
        this.stopCronJob(jobName);
        if (task.enable !== 1) {
            return;
        }
        try {
            const job = new CronJob(task.cronExpression, async () => {
                await this.runTask(task.taskCode);
            });
            this.schedulerRegistry.addCronJob(jobName, job);
            job.start();
            this.logger.log(`[ScheduleTask] 动态 Cron 任务已启动: [${task.taskName}] (${jobName}), Cron: '${task.cronExpression}'`);
        }
        catch (err) {
            this.logger.error(`[ScheduleTask] 启动 Cron 任务 [${jobName}] 失败: ${err?.message || String(err)}`);
        }
    }
    stopCronJob(taskCode) {
        if (this.schedulerRegistry.doesExist('cron', taskCode)) {
            this.schedulerRegistry.deleteCronJob(taskCode);
            this.logger.log(`[ScheduleTask] 动态 Cron 任务已停止: [${taskCode}]`);
        }
    }
    async runTask(taskCode) {
        const startTime = Date.now();
        const task = await this.taskRepo.findOne({ where: { taskCode } });
        if (!task) {
            this.logger.warn(`[ScheduleTask] 触发未找到的任务配置: ${taskCode}`);
            return;
        }
        let handler = this.handlers.get(taskCode);
        if (!handler && task.apiCode) {
            handler = this.handlers.get(task.apiCode);
        }
        if (!handler) {
            const errorMsg = `未找到编码为 [${taskCode}] (apiCode: '${task.apiCode || ''}') 的 TaskHandler 实现类`;
            this.logger.error(`[ScheduleTask] ${errorMsg}`);
            await this.recordLog(taskCode, 0, Date.now() - startTime, null, null, errorMsg);
            await this.updateTaskStatus(task.id, 0);
            return;
        }
        this.logger.log(`[ScheduleTask] 开始执行任务: ${task.taskName} (${taskCode})`);
        try {
            const responseData = await handler.execute(task);
            const executionTime = Date.now() - startTime;
            await this.recordLog(taskCode, 1, executionTime, task.payloadParams, JSON.stringify(responseData), null);
            await this.updateTaskStatus(task.id, 1);
            this.logger.log(`[ScheduleTask] 任务执行成功: ${task.taskName} (${executionTime}ms)`);
            return responseData;
        }
        catch (err) {
            const executionTime = Date.now() - startTime;
            const errorMsg = err?.message || String(err);
            await this.recordLog(taskCode, 0, executionTime, task.payloadParams, null, errorMsg);
            await this.updateTaskStatus(task.id, 0);
            this.logger.error(`[ScheduleTask] 任务执行异常 [${taskCode}]: ${errorMsg}`);
            throw err;
        }
    }
    async runTaskOnce(id) {
        const task = await this.taskRepo.findOne({ where: { id } });
        if (!task) {
            throw new common_1.NotFoundException(`未找到 ID 为 ${id} 的调度任务`);
        }
        return await this.runTask(task.taskCode);
    }
    async searchTasks(queryDto) {
        const pageNum = Number(queryDto.pageNum) || 1;
        const pageSize = Number(queryDto.pageSize) || 10;
        const qb = this.taskRepo.createQueryBuilder('task');
        if (queryDto.taskCode) {
            qb.andWhere('task.taskCode LIKE :taskCode', { taskCode: `%${queryDto.taskCode}%` });
        }
        if (queryDto.taskName) {
            qb.andWhere('task.taskName LIKE :taskName', { taskName: `%${queryDto.taskName}%` });
        }
        if (queryDto.enable !== undefined && queryDto.enable !== null && queryDto.enable !== 'all') {
            qb.andWhere('task.enable = :enable', { enable: Number(queryDto.enable) });
        }
        qb.orderBy('task.id', 'DESC')
            .skip((pageNum - 1) * pageSize)
            .take(pageSize);
        const [list, total] = await qb.getManyAndCount();
        return { list, total, pageNum, pageSize };
    }
    async findOne(id) {
        const task = await this.taskRepo.findOne({ where: { id } });
        if (!task) {
            throw new common_1.NotFoundException(`未找到 ID 为 ${id} 的任务记录`);
        }
        return task;
    }
    async create(createDto) {
        if (!createDto.taskCode || !createDto.cronExpression) {
            throw new common_1.BadRequestException('taskCode 和 cronExpression 为必填项');
        }
        const exist = await this.taskRepo.findOne({ where: { taskCode: createDto.taskCode } });
        if (exist) {
            throw new common_1.BadRequestException(`已存在 taskCode 为 '${createDto.taskCode}' 的任务`);
        }
        const newTask = this.taskRepo.create(createDto);
        const savedTask = await this.taskRepo.save(newTask);
        if (savedTask.enable === 1) {
            this.startCronJob(savedTask);
        }
        return savedTask;
    }
    async update(id, updateDto) {
        const task = await this.findOne(id);
        Object.assign(task, updateDto);
        const savedTask = await this.taskRepo.save(task);
        if (savedTask.enable === 1) {
            this.startCronJob(savedTask);
        }
        else {
            this.stopCronJob(savedTask.taskCode);
        }
        return savedTask;
    }
    async toggleEnable(id, enable) {
        return await this.update(id, { enable });
    }
    async remove(id) {
        const task = await this.findOne(id);
        this.stopCronJob(task.taskCode);
        await this.taskRepo.remove(task);
        return { success: true, message: `任务 ${task.taskName} 已删除` };
    }
    async findLogs(queryDto) {
        const pageNum = Number(queryDto.pageNum) || 1;
        const pageSize = Number(queryDto.pageSize) || 10;
        const qb = this.logRepo.createQueryBuilder('log');
        if (queryDto.taskCode) {
            qb.andWhere('log.taskCode = :taskCode', { taskCode: queryDto.taskCode });
        }
        if (queryDto.status !== undefined && queryDto.status !== null && queryDto.status !== 'all') {
            qb.andWhere('log.status = :status', { status: Number(queryDto.status) });
        }
        qb.orderBy('log.id', 'DESC')
            .skip((pageNum - 1) * pageSize)
            .take(pageSize);
        const [list, total] = await qb.getManyAndCount();
        return { list, total, pageNum, pageSize };
    }
    async deleteLog(id) {
        await this.logRepo.delete(id);
        return { success: true, message: '日志已删除' };
    }
    async clearLogs(taskCode) {
        if (taskCode) {
            await this.logRepo.delete({ taskCode });
        }
        else {
            await this.logRepo.clear();
        }
        return { success: true, message: '日志已被清空' };
    }
    async updateTaskStatus(id, lastStatus) {
        await this.taskRepo.update(id, {
            lastRunTime: new Date(),
            lastStatus,
        });
    }
    async recordLog(taskCode, status, executionTime, requestPayload, responseData = null, errorMsg = null) {
        try {
            const log = this.logRepo.create({
                taskCode,
                status,
                executionTime,
                requestPayload,
                responseData: responseData || undefined,
                errorMsg: errorMsg || undefined,
            });
            await this.logRepo.save(log);
        }
        catch (e) {
            this.logger.error(`[ScheduleTask] 写入日志失败: ${e?.message || String(e)}`);
        }
    }
};
exports.ScheduleTaskService = ScheduleTaskService;
exports.ScheduleTaskService = ScheduleTaskService = ScheduleTaskService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(schedule_task_entity_1.ScheduleTask)),
    __param(1, (0, typeorm_1.InjectRepository)(schedule_task_log_entity_1.ScheduleTaskLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        schedule_1.SchedulerRegistry,
        login_event_service_1.LoginEventService,
        table1_event_service_1.Table1EventService,
        order_event_service_1.OrderEventService])
], ScheduleTaskService);
//# sourceMappingURL=schedule-task.service.js.map