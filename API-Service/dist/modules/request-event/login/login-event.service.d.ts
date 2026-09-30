import { ReportApiService } from '../../report-api/report-api.service';
import { HttpRequestClientService } from '../../http-request-client/http-request-client.service';
import { ITaskHandler } from '../../schedule-task/interfaces/task-handler.interface';
import { SysConfigService } from '../../config/sys-config.service';
export declare class LoginEventService implements ITaskHandler {
    private readonly reportApiService;
    private readonly httpClientService;
    private readonly sysConfigService;
    readonly taskCode = "login_event_job";
    readonly aliases: string[];
    constructor(reportApiService: ReportApiService, httpClientService: HttpRequestClientService, sysConfigService: SysConfigService);
    buildPayload(payloadParams?: any): Promise<any>;
    execute(taskConfig?: any): Promise<any>;
    sendLoginRequest(payload?: any): Promise<{
        success: boolean;
        statusCode: number;
        apiCode: string;
        apiName: string;
        apiUrl: string;
        responseData: any;
    }>;
}
