import { ITaskHandler } from '../../schedule-task/interfaces/task-handler.interface';
import { MssqlResultService } from '../../mssql-result/mssql-result.service';
import { SysConfigService } from '../../config/sys-config.service';
export declare class RefreshModelEventService implements ITaskHandler {
    private readonly mssqlResultService;
    private readonly sysConfigService;
    private readonly logger;
    readonly taskCode = "refresh_model_job";
    readonly aliases: string[];
    constructor(mssqlResultService: MssqlResultService, sysConfigService: SysConfigService);
    execute(taskConfig?: any): Promise<any>;
}
