import { Repository } from 'typeorm';
import { A1000495177Result } from './entities/a1000495177-result.entity';
import { A1003944189Result } from './entities/a1003944189-result.entity';
import { A1005282639Result } from './entities/a1005282639-result.entity';
import { CurrentProduct } from './entities/current-product';
import { MssqlResultSearchDto } from './dto/mssql-result-search.dto';
import { SysConfigService } from '../config/sys-config.service';
export type TimeBarcodeCursor = {
    time?: string;
    barcode?: string;
};
export interface processedMachineItem {
    machinCode: string;
    inTime: string;
    outTime: string;
}
export interface standardItem {
    qcDeviceCode?: string;
    inspectionItemCode?: string;
    inspectionItemName: string;
    inspectionItemType: number;
    maxValue: number;
    minValue: number;
    actualValue: string;
}
export declare class MssqlResultService {
    private readonly repo495177;
    private readonly repo944189;
    private readonly repo282639;
    private readonly currentProductRepository;
    private readonly sysConfigService;
    constructor(repo495177: Repository<A1000495177Result>, repo944189: Repository<A1003944189Result>, repo282639: Repository<A1005282639Result>, currentProductRepository: Repository<CurrentProduct>, sysConfigService: SysConfigService);
    search495177({ pageNum, pageSize, barcode, }: MssqlResultSearchDto): Promise<{
        total: number;
        list: A1000495177Result[];
    }>;
    findOne495177(barcode: string): Promise<A1000495177Result | null>;
    save495177(dto: Partial<A1000495177Result>): Promise<Partial<A1000495177Result> & A1000495177Result>;
    delete495177(barcode: string): Promise<import("typeorm").DeleteResult>;
    search944189({ pageNum, pageSize, barcode, }: MssqlResultSearchDto): Promise<{
        total: number;
        list: A1003944189Result[];
    }>;
    findOne944189(barcode: string): Promise<A1003944189Result | null>;
    save944189(dto: Partial<A1003944189Result>): Promise<Partial<A1003944189Result> & A1003944189Result>;
    delete944189(barcode: string): Promise<import("typeorm").DeleteResult>;
    search282639({ pageNum, pageSize, barcode, }: MssqlResultSearchDto): Promise<{
        total: number;
        list: A1005282639Result[];
    }>;
    findOne282639(barcode: string): Promise<A1005282639Result | null>;
    save282639(dto: Partial<A1005282639Result>): Promise<Partial<A1005282639Result> & A1005282639Result>;
    delete282639(barcode: string): Promise<import("typeorm").DeleteResult>;
    getCurrentProductType(): Promise<CurrentProduct>;
    getCurrentProductList(): Promise<{
        processedMachineList: processedMachineItem[];
        standardList: standardItem[];
    }>;
    loadNext495177(cursor?: string | TimeBarcodeCursor, limit?: number): Promise<{
        list: A1000495177Result[];
        nextCursor: {
            time: string | null;
            barcode: string;
        } | null;
        hasMore: boolean;
    }>;
    loadNext944189(cursor?: string | TimeBarcodeCursor, limit?: number): Promise<{
        list: A1003944189Result[];
        nextCursor: {
            time: string | null;
            barcode: string;
        } | null;
        hasMore: boolean;
    }>;
    loadNext282639(cursor?: string | TimeBarcodeCursor, limit?: number): Promise<{
        list: A1005282639Result[];
        nextCursor: {
            time: string | null;
            barcode: string;
        } | null;
        hasMore: boolean;
    }>;
    private clampLimit;
    private applyKeysetWhere;
    private wrapCursorResult;
}
