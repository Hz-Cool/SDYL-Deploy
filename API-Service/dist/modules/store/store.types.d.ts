export declare const STORE: {
    readonly DIZHIGUANLI: "dizhiguanli";
    readonly LIMITS: "limits";
};
export interface DizhiguanliRow {
    num: string;
    name: string;
    address: string;
    dataType: string;
    accessType: string;
    hostData: string;
    traceable: string;
    status: string;
    readFactor: string;
}
export interface LimitGroup {
    name: string;
    min: number | null;
    max: number | null;
    minAddress?: string;
    maxAddress?: string;
    readFactor?: number;
    dataType?: string;
}
export interface StoreWriter {
    set(storeName: string, key: string, value: any): void;
    setStore(storeName: string, entries: Record<string, any> | Map<string, any>): void;
}
export interface StoreLoader {
    readonly name: string;
    load(store: StoreWriter): Promise<void>;
}
export declare const STORE_LOADER: unique symbol;
