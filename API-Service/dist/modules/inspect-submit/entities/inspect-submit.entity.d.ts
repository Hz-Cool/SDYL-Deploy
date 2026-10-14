export declare class MesInspectSubmit {
    id: number;
    submitNo: string;
    workOrderNo: string;
    productCode: string;
    productName?: string;
    deviceGroup?: string;
    submitType: number;
    submitStatus: number;
    submitTime: Date;
    finishTime?: Date;
    inspectResult?: number;
    remark?: string;
    items?: any;
    results?: any;
    createTime: Date;
    updateTime: Date;
    isDeleted: number;
}
