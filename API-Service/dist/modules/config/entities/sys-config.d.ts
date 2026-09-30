import { SysConfigValueType } from '../../../common/enums/sys-config.enum';
export declare class SysConfig {
    id: number;
    configKey: string;
    configName: string;
    configGroup: string;
    configValue: string;
    valueType: SysConfigValueType;
    status: number;
    sort: number;
    remark: string;
    isSystem: number;
    createTime: Date;
    updateTime: Date;
}
