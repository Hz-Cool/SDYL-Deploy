import { DataSource } from 'typeorm';
import { StoreLoader, StoreWriter } from '../store.types';
export declare class DizhiguanliLoader implements StoreLoader {
    private readonly mssql;
    readonly name = "dizhiguanli";
    private readonly logger;
    constructor(mssql: DataSource);
    load(store: StoreWriter): Promise<void>;
    private loadOneTable;
    private buildLimitGroups;
    private mapRow;
}
