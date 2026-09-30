import { Observable } from 'rxjs';
import { ReportApiService } from './report-api.service';
import { ReportApi } from './entities/report-api.entity';
import { ApiQueryHistory } from './entities/api-query-history.entity';
import { ReportApiSearchDto } from './dto/report-api-search.dto';
import { ApiQueryHistorySearchDto } from './dto/api-query-history-search.dto';
export declare class ReportApiController {
    private readonly reportApiService;
    constructor(reportApiService: ReportApiService);
    saveOrUpdate(dto: Partial<ReportApi>): Promise<ReportApi>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
    search(dto: ReportApiSearchDto): Promise<{
        total: number;
        list: ReportApi[];
    }>;
    getReportApi(id: number): Promise<ReportApi>;
    getReportApiByCode(apiCode: string): Promise<ReportApi | null>;
    saveOrUpdateQueryHistory(dto: Partial<ApiQueryHistory>): Promise<ApiQueryHistory>;
    deleteQueryHistory(id: number): Promise<import("typeorm").DeleteResult>;
    searchQueryHistory(dto: ApiQueryHistorySearchDto): Promise<{
        total: number;
        list: ApiQueryHistory[];
    }>;
    getQueryHistory(id: number): Promise<ApiQueryHistory>;
    getQueryHistoryByCode(apiCode: string, pageNum?: string, pageSize?: string): Promise<{
        list: ApiQueryHistory[];
        total: number;
    }>;
    getQueryHistoryByLastCode(apiCode: string): Promise<ApiQueryHistory>;
    getQueryHistoryByOrderLastCode(): Promise<ApiQueryHistory>;
    getQueryHistoryByOrderLastCodeSse(): Observable<{
        data: ApiQueryHistory | null;
    }>;
    executeOnce(apiCode: string, body: any): Promise<{
        success: boolean;
        statusCode: number;
        apiCode: string;
        apiName: string;
        apiUrl: string;
        responseData: any;
    }>;
}
