import { Repository } from 'typeorm';
import { ReportApi } from './entities/report-api.entity';
import { ApiQueryHistory } from './entities/api-query-history.entity';
import { ReportApiSearchDto } from './dto/report-api-search.dto';
import { ApiQueryHistorySearchDto } from './dto/api-query-history-search.dto';
import { HttpRequestClientService } from '../http-request-client/http-request-client.service';
export declare class ReportApiService {
    private readonly reportApiRepository;
    private readonly queryHistoryRepository;
    private readonly httpClientService;
    constructor(reportApiRepository: Repository<ReportApi>, queryHistoryRepository: Repository<ApiQueryHistory>, httpClientService: HttpRequestClientService);
    saveOrUpdate(dto: Partial<ReportApi>): Promise<ReportApi>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
    search({ pageNum, pageSize, apiCode, apiName, enable, }: ReportApiSearchDto): Promise<{
        total: number;
        list: ReportApi[];
    }>;
    findOneById(id: number): Promise<ReportApi>;
    findOneByCode(apiCode: string): Promise<ReportApi | null>;
    saveOrUpdateQueryHistory(dto: Partial<ApiQueryHistory>): Promise<ApiQueryHistory>;
    deleteQueryHistory(id: number): Promise<import("typeorm").DeleteResult>;
    searchQueryHistory({ pageNum, pageSize, apiCode, queryName, }: ApiQueryHistorySearchDto): Promise<{
        total: number;
        list: ApiQueryHistory[];
    }>;
    findQueryHistoryById(id: number): Promise<ApiQueryHistory>;
    findQueryHistoryLastToken(): Promise<string>;
    findQueryHistoryLastData(apiCode: string): Promise<ApiQueryHistory>;
    findQueryHistoryByApiCode(apiCode: string, pageNum?: number, pageSize?: number): Promise<{
        list: ApiQueryHistory[];
        total: number;
    }>;
    executeOnce(apiCode: string, payload?: any): Promise<{
        success: boolean;
        statusCode: number;
        apiCode: string;
        apiName: string;
        apiUrl: string;
        responseData: any;
    }>;
}
