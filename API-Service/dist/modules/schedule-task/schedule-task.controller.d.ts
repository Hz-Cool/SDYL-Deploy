import { ScheduleTaskService } from './schedule-task.service';
import { ScheduleTask } from './entities/schedule-task.entity';
import { ScheduleTaskSearchDto } from './dto/schedule-task-search.dto';
import { ScheduleTaskLogSearchDto } from './dto/schedule-task-log-search.dto';
export declare class ScheduleTaskController {
    private readonly scheduleTaskService;
    constructor(scheduleTaskService: ScheduleTaskService);
    searchTasks(queryDto: ScheduleTaskSearchDto): Promise<{
        list: ScheduleTask[];
        total: number;
        pageNum: number;
        pageSize: number;
    }>;
    findLogs(queryDto: ScheduleTaskLogSearchDto): Promise<{
        list: import("./entities/schedule-task-log.entity").ScheduleTaskLog[];
        total: number;
        pageNum: number;
        pageSize: number;
    }>;
    clearLogs(taskCode?: string): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteLog(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    findOne(id: string): Promise<ScheduleTask>;
    create(createDto: Partial<ScheduleTask>): Promise<ScheduleTask>;
    update(id: string, updateDto: Partial<ScheduleTask>): Promise<ScheduleTask>;
    toggleEnable(id: string, enable: number): Promise<ScheduleTask>;
    runTaskOnce(id: string): Promise<any>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
