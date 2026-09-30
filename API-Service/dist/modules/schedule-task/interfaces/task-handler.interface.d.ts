export interface ITaskHandler {
    readonly taskCode: string;
    readonly aliases?: string[];
    buildPayload?(payloadParams?: any): Promise<any>;
    execute(taskConfig?: any): Promise<any>;
}
