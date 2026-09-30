import { Repository } from 'typeorm';
import { Table1 } from './table1.entity';
export declare class Test111Service {
    private readonly table1Repository;
    constructor(table1Repository: Repository<Table1>);
    findAll(): Promise<Table1[]>;
    findById(id: number): Promise<Table1 | null>;
}
