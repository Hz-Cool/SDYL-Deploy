import { MssqlResultService } from './mssql-result.service';
import { MssqlResultSearchDto } from './dto/mssql-result-search.dto';
import { A1000495177Result } from './entities/a1000495177-result.entity';
import { A1003944189Result } from './entities/a1003944189-result.entity';
import { A1005282639Result } from './entities/a1005282639-result.entity';
export declare class MssqlResultController {
    private readonly service;
    constructor(service: MssqlResultService);
    search495177(dto: MssqlResultSearchDto): Promise<{
        total: number;
        list: A1000495177Result[];
    }>;
    findOne495177(barcode: string): Promise<A1000495177Result | null>;
    save495177(dto: Partial<A1000495177Result>): Promise<Partial<A1000495177Result> & A1000495177Result>;
    delete495177(barcode: string): Promise<import("typeorm").DeleteResult>;
    search944189(dto: MssqlResultSearchDto): Promise<{
        total: number;
        list: A1003944189Result[];
    }>;
    findOne944189(barcode: string): Promise<A1003944189Result | null>;
    save944189(dto: Partial<A1003944189Result>): Promise<Partial<A1003944189Result> & A1003944189Result>;
    delete944189(barcode: string): Promise<import("typeorm").DeleteResult>;
    search282639(dto: MssqlResultSearchDto): Promise<{
        total: number;
        list: A1005282639Result[];
    }>;
    findOne282639(barcode: string): Promise<A1005282639Result | null>;
    save282639(dto: Partial<A1005282639Result>): Promise<Partial<A1005282639Result> & A1005282639Result>;
    delete282639(barcode: string): Promise<import("typeorm").DeleteResult>;
    getCurrentProduct(): Promise<{
        total: number;
        list: import("./entities/current-product").CurrentProduct[];
    }>;
}
