import { OnApplicationBootstrap } from '@nestjs/common';
import { LimitGroup, StoreLoader, StoreWriter } from './store.types';
export declare class StoreService implements OnApplicationBootstrap, StoreWriter {
    private readonly loadersRaw;
    private readonly logger;
    private readonly stores;
    constructor(loadersRaw: StoreLoader[] | StoreLoader);
    private get loaders();
    onApplicationBootstrap(): Promise<void>;
    reload(): Promise<void>;
    handleRefresh(): Promise<void>;
    getStore(storeName: string): Map<string, any>;
    get<T = any>(storeName: string, key: string): T | undefined;
    set(storeName: string, key: string, value: any): void;
    has(storeName: string, key: string): boolean;
    delete(storeName: string, key: string): void;
    setStore(storeName: string, entries: Record<string, any> | Map<string, any>): void;
    listStoreNames(): string[];
    getStoreAll(storeName?: string): Record<string, any>;
    getLimit(modelPrefix: string, op: string, cnBaseName: string): LimitGroup | undefined;
    getLimitByKey(modelPrefix: string, op: string, key: string): LimitGroup | undefined;
}
