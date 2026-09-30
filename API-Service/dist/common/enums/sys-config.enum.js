"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SysConfigValueTypeLabels = exports.SysConfigValueType = void 0;
var SysConfigValueType;
(function (SysConfigValueType) {
    SysConfigValueType[SysConfigValueType["STRING"] = 1] = "STRING";
    SysConfigValueType[SysConfigValueType["NUMBER"] = 2] = "NUMBER";
    SysConfigValueType[SysConfigValueType["BOOLEAN"] = 3] = "BOOLEAN";
    SysConfigValueType[SysConfigValueType["JSON"] = 4] = "JSON";
})(SysConfigValueType || (exports.SysConfigValueType = SysConfigValueType = {}));
exports.SysConfigValueTypeLabels = {
    [SysConfigValueType.STRING]: '字符串',
    [SysConfigValueType.NUMBER]: '数字',
    [SysConfigValueType.BOOLEAN]: '布尔',
    [SysConfigValueType.JSON]: 'JSON',
};
//# sourceMappingURL=sys-config.enum.js.map