import { ReportApiService } from '../../report-api/report-api.service';
import { HttpRequestClientService } from '../../http-request-client/http-request-client.service';
import { ITaskHandler } from '../../schedule-task/interfaces/task-handler.interface';
import { SysConfigService } from '../../config/sys-config.service';
import { MssqlResultService } from 'src/modules/mssql-result/mssql-result.service';
import { InspectSubmitService } from '../../inspect-submit/inspect-submit.service';
export declare class WorkReportEventService implements ITaskHandler {
    private readonly reportApiService;
    private readonly httpClientService;
    private readonly sysConfigService;
    private readonly MssqlResultService;
    private readonly inspectSubmitService;
    readonly taskCode = "work_report_job";
    readonly aliases: string[];
    private readonly logger;
    private running;
    constructor(reportApiService: ReportApiService, httpClientService: HttpRequestClientService, sysConfigService: SysConfigService, MssqlResultService: MssqlResultService, inspectSubmitService: InspectSubmitService);
    execute(taskConfig?: any): Promise<any>;
    private buildPayloadFromData;
    sendWorkReportRequest(payload?: any): Promise<{
        success: boolean;
        statusCode: number;
        apiCode: string;
        apiName: string;
        apiUrl: string;
        responseData: any;
    }>;
    private maybeSendFirstPartInspection;
    private maybeSendIntervalInspection;
    private sendReportApiRequest;
}
