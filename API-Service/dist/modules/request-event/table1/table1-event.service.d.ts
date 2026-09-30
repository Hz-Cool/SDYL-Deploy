import { ReportApiService } from '../../report-api/report-api.service';
import { HttpRequestClientService } from '../../http-request-client/http-request-client.service';
import { ITaskHandler } from '../../schedule-task/interfaces/task-handler.interface';
export declare class Table1EventService implements ITaskHandler {
    private readonly reportApiService;
    private readonly httpClientService;
    readonly taskCode = "table1_event_job";
    readonly aliases: string[];
    constructor(reportApiService: ReportApiService, httpClientService: HttpRequestClientService);
    buildPayload(payloadParams?: any): Promise<any>;
    execute(taskConfig?: any): Promise<any>;
    sendTable1Request(payload?: any): Promise<{
        success: boolean;
        statusCode: number;
        apiCode: string;
        apiName: string;
        apiUrl: string;
        responseData: any;
    }>;
}
