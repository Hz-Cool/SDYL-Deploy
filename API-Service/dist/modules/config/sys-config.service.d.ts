import { Repository } from 'typeorm';
import { SysConfig } from './entities/sys-config';
import { SysConfigHistory } from './entities/sys-config-history';
import { SysConfigSearchDto } from './dto/sys-config-search.dto';
import { SysConfigHistorySearchDto } from './dto/sys-config-history-search.dto';
export declare class SysConfigService {
    private readonly configRepo;
    private readonly historyRepo;
    private readonly logger;
    constructor(configRepo: Repository<SysConfig>, historyRepo: Repository<SysConfigHistory>);
    search(queryDto: SysConfigSearchDto): Promise<{
        list: SysConfig[];
        total: number;
        pageNum: number;
        pageSize: number;
    }>;
    findOne(id: number): Promise<SysConfig>;
    findOneByKey(configKey: string): Promise<SysConfig>;
    findByKeyAuthorization(): Promise<string>;
    create(createDto: Partial<SysConfig>): Promise<SysConfig>;
    update(id: number, updateDto: Partial<SysConfig>): Promise<SysConfig>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
    searchHistory(queryDto: SysConfigHistorySearchDto): Promise<{
        list: SysConfigHistory[];
        total: number;
        pageNum: number;
        pageSize: number;
    }>;
    findHistoryOne(id: number): Promise<SysConfigHistory>;
    deleteHistory(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
    clearHistory(configId?: number): Promise<{
        success: boolean;
        message: string;
    }>;
    private formatJsonValueIfNeeded;
    private recordHistory;
}
