import { SysConfigService } from './sys-config.service';
import { SysConfig } from './entities/sys-config';
import { SysConfigSearchDto } from './dto/sys-config-search.dto';
import { SysConfigHistorySearchDto } from './dto/sys-config-history-search.dto';
export declare class SysConfigController {
    private readonly sysConfigService;
    constructor(sysConfigService: SysConfigService);
    search(queryDto: SysConfigSearchDto): Promise<{
        list: SysConfig[];
        total: number;
        pageNum: number;
        pageSize: number;
    }>;
    findOne(id: string): Promise<SysConfig>;
    create(createDto: Partial<SysConfig>): Promise<SysConfig>;
    update(id: string, updateDto: Partial<SysConfig>): Promise<SysConfig>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    searchHistory(queryDto: SysConfigHistorySearchDto): Promise<{
        list: import("./entities/sys-config-history").SysConfigHistory[];
        total: number;
        pageNum: number;
        pageSize: number;
    }>;
    findHistoryOne(id: string): Promise<import("./entities/sys-config-history").SysConfigHistory>;
    clearHistory(configId?: string): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteHistory(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
