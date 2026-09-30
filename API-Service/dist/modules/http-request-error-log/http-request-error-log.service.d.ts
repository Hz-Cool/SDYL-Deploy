import { Repository } from 'typeorm';
import { HttpRequestErrorLog } from './http-request-error-log.entity';
import { HttpRequestErrorLogSearchDto } from './dto/http-request-error-log-search.dto';
export declare class HttpRequestErrorLogService {
    private readonly errorLogRepository;
    constructor(errorLogRepository: Repository<HttpRequestErrorLog>);
    search({ pageNum, pageSize, requestId, apiCode, apiName, method, statusCode, startTime, endTime, }: HttpRequestErrorLogSearchDto): Promise<{
        total: number;
        list: HttpRequestErrorLog[];
        page: number;
        pageSize: number;
    }>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
    batchDelete(ids: number[]): Promise<import("typeorm").DeleteResult>;
    findOneById(id: number): Promise<HttpRequestErrorLog>;
    createErrorLog(logData: Partial<HttpRequestErrorLog>): Promise<HttpRequestErrorLog>;
}
