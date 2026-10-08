import { WorkReportEventService } from './work-report-event.service';
export declare class WorkReportEventController {
    private readonly workReportEventService;
    constructor(workReportEventService: WorkReportEventService);
    sendWorkReport(body: any): Promise<{
        success: boolean;
        statusCode: number;
        apiCode: string;
        apiName: string;
        apiUrl: string;
        responseData: any;
    }>;
    sendWorkReportGet(): Promise<{
        success: boolean;
        statusCode: number;
        apiCode: string;
        apiName: string;
        apiUrl: string;
        responseData: any;
    }>;
}
