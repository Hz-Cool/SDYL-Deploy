export declare class ScheduleTask {
    id: number;
    taskCode: string;
    taskName: string;
    apiCode: string;
    cronExpression: string;
    enable: number;
    payloadParams: any;
    lastRunTime: Date;
    lastStatus: number;
    remark: string;
    createTime: Date;
    updateTime: Date;
}
