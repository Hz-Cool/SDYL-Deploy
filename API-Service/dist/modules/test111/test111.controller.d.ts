import { Test111Service } from './test111.service';
import { Table1 } from './table1.entity';
export declare class Test111Controller {
    private readonly test111Service;
    private readonly logger;
    constructor(test111Service: Test111Service);
    getAllTable1(): Promise<Table1[]>;
    getTable1ById(id: number): Promise<Table1 | null>;
}
