import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ScheduleTask } from './entities/schedule-task.entity';
import { ScheduleTaskLog } from './entities/schedule-task-log.entity';
import { ITaskHandler } from './interfaces/task-handler.interface';
import { ScheduleTaskSearchDto } from './dto/schedule-task-search.dto';
import { ScheduleTaskLogSearchDto } from './dto/schedule-task-log-search.dto';
import { LoginEventService } from '../request-event/login/login-event.service';
import { Table1EventService } from '../request-event/table1/table1-event.service';
import { OrderEventService } from '../request-event/order/order-event.service';
export declare class ScheduleTaskService implements OnModuleInit {
    private readonly taskRepo;
    private readonly logRepo;
    private readonly schedulerRegistry;
    private readonly loginEventService;
    private readonly table1EventService;
    private readonly orderEventService;
    private readonly logger;
    private readonly handlers;
    constructor(taskRepo: Repository<ScheduleTask>, logRepo: Repository<ScheduleTaskLog>, schedulerRegistry: SchedulerRegistry, loginEventService: LoginEventService, table1EventService: Table1EventService, orderEventService: OrderEventService);
    registerHandler(handler: ITaskHandler): void;
    onModuleInit(): Promise<void>;
    reloadAllTasks(): Promise<void>;
    startCronJob(task: ScheduleTask): void;
    stopCronJob(taskCode: string): void;
    runTask(taskCode: string): Promise<any>;
    runTaskOnce(id: number): Promise<any>;
    searchTasks(queryDto: ScheduleTaskSearchDto): Promise<{
        list: ScheduleTask[];
        total: number;
        pageNum: number;
        pageSize: number;
    }>;
    findOne(id: number): Promise<ScheduleTask>;
    create(createDto: Partial<ScheduleTask>): Promise<ScheduleTask>;
    update(id: number, updateDto: Partial<ScheduleTask>): Promise<ScheduleTask>;
    toggleEnable(id: number, enable: number): Promise<ScheduleTask>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
    findLogs(queryDto: ScheduleTaskLogSearchDto): Promise<{
        list: ScheduleTaskLog[];
        total: number;
        pageNum: number;
        pageSize: number;
    }>;
    deleteLog(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
    clearLogs(taskCode?: string): Promise<{
        success: boolean;
        message: string;
    }>;
    private updateTaskStatus;
    private recordLog;
}
