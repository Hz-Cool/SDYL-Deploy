import { ReportApiService } from '../../report-api/report-api.service';
import { HttpRequestClientService } from '../../http-request-client/http-request-client.service';
import { ITaskHandler } from '../../schedule-task/interfaces/task-handler.interface';
import { SysConfigService } from '../../config/sys-config.service';
import { InspectSubmitService } from '../../inspect-submit/inspect-submit.service';
export declare class RefreshSubmissionStatusEventService implements ITaskHandler {
    private readonly reportApiService;
    private readonly httpClientService;
    private readonly sysConfigService;
    private readonly inspectSubmitService;
    readonly taskCode = "refresh_submission_status";
    readonly aliases: string[];
    private readonly logger;
    constructor(reportApiService: ReportApiService, httpClientService: HttpRequestClientService, sysConfigService: SysConfigService, inspectSubmitService: InspectSubmitService);
    execute(taskConfig?: any): Promise<any>;
}
