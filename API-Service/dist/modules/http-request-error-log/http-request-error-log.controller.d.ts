import { HttpRequestErrorLogService } from './http-request-error-log.service';
import { HttpRequestErrorLogSearchDto } from './dto/http-request-error-log-search.dto';
export declare class HttpRequestErrorLogController {
    private readonly errorLogService;
    constructor(errorLogService: HttpRequestErrorLogService);
    search(dto: HttpRequestErrorLogSearchDto): Promise<{
        total: number;
        list: import("./http-request-error-log.entity").HttpRequestErrorLog[];
        page: number;
        pageSize: number;
    }>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
    batchDelete(ids: number[]): Promise<import("typeorm").DeleteResult>;
    getDetail(id: number): Promise<import("./http-request-error-log.entity").HttpRequestErrorLog>;
}
