"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var DizhiguanliLoader_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DizhiguanliLoader = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const store_types_1 = require("../store.types");
const PARAM_EN_MAP = {
    泄漏量: 'leakage',
    拐点压力: 'inflectionPressure',
    最终位移: 'finalDisplacement',
    最终压力: 'finalPressure',
    扭矩: 'torque',
    角度: 'angle',
};
function splitLimitName(name) {
    if (name.endsWith('下限'))
        return { base: name.slice(0, -2), type: 'lower' };
    if (name.endsWith('上限'))
        return { base: name.slice(0, -2), type: 'upper' };
    return null;
}
function paramEnKey(base) {
    const m = base.match(/^([^\d]+?)(\d*)$/);
    const core = m?.[1] ?? base;
    const suffix = m?.[2] ?? '';
    return (PARAM_EN_MAP[core] || core) + suffix;
}
function toNum(v) {
    if (v === undefined || v === null || v === '')
        return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
}
const DIZHIGUANLI_MODELS = {
    A1000495177: {
        OP10: [23, 28],
        OP20: [20, 25],
        OP30: [20, 25],
        OP40: [19, 22],
    },
    A1003944189: {
        OP10: [23, 28],
        OP20: [20, 25],
        OP30: [20, 25],
        OP50: [19, 22],
        OP60: [18, 19],
    },
    A1005282639: {
        OP10: [20, 25],
        OP20: [20, 25],
        OP30: [23, 28],
        OP40: [20, 25],
        OP50: [25, 28],
        OP60: [18, 19],
    },
};
let DizhiguanliLoader = DizhiguanliLoader_1 = class DizhiguanliLoader {
    mssql;
    name = 'dizhiguanli';
    logger = new common_1.Logger(DizhiguanliLoader_1.name);
    constructor(mssql) {
        this.mssql = mssql;
    }
    async load(store) {
        for (const [model, opRanges] of Object.entries(DIZHIGUANLI_MODELS)) {
            const opMap = {};
            const opLimits = {};
            for (const [op, [start, end]] of Object.entries(opRanges)) {
                try {
                    opMap[op] = await this.loadOneTable(model, op, start, end);
                    opLimits[op] = this.buildLimitGroups(op, opMap[op]);
                }
                catch (e) {
                    this.logger.warn(`[dizhiguanli] ${model}/${op} 加载失败: ${e?.message || String(e)}`);
                }
            }
            store.set(store_types_1.STORE.DIZHIGUANLI, model, opMap);
            store.set(store_types_1.STORE.LIMITS, model, opLimits);
            const limitCount = Object.values(opLimits).reduce((n, g) => n + Object.keys(g).length, 0);
            this.logger.log(`[dizhiguanli] 型号 ${model} 加载完成：工位 ${Object.keys(opMap).join('/')}，上下限组 ${limitCount}`);
        }
    }
    async loadOneTable(model, op, start, end) {
        const tableName = `${model}${op}dizhiguanli`;
        const rows = await this.mssql.query(`SELECT 序号, 名称, 地址, 数据类型, 访问类型, 上位机数据, 可追溯, 启用状态, 读数因子
         FROM ${tableName}
        WHERE 序号 BETWEEN ${String(start)} AND ${String(end)}`);
        const map = {};
        for (const r of rows || []) {
            const row = this.mapRow(r);
            if (row.name)
                map[row.name] = row;
        }
        return map;
    }
    buildLimitGroups(op, paramMap) {
        const pairs = {};
        for (const [name, row] of Object.entries(paramMap)) {
            const parsed = splitLimitName(name);
            if (!parsed)
                continue;
            (pairs[parsed.base] ||= {})[parsed.type] = row;
        }
        const result = {};
        for (const [base, p] of Object.entries(pairs)) {
            const key = `${op.toLowerCase()}_${paramEnKey(base)}`;
            result[key] = {
                name: base,
                min: toNum(p.lower?.hostData),
                max: toNum(p.upper?.hostData),
                minAddress: p.lower?.address,
                maxAddress: p.upper?.address,
                readFactor: toNum(p.lower?.readFactor ?? p.upper?.readFactor) ?? undefined,
                dataType: p.lower?.dataType || p.upper?.dataType,
            };
        }
        return result;
    }
    mapRow(r) {
        return {
            num: r['序号'],
            name: r['名称'],
            address: r['地址'],
            dataType: r['数据类型'],
            accessType: r['访问类型'],
            hostData: r['上位机数据'],
            traceable: r['可追溯'],
            status: r['启用状态'],
            readFactor: r['读数因子'],
        };
    }
};
exports.DizhiguanliLoader = DizhiguanliLoader;
exports.DizhiguanliLoader = DizhiguanliLoader = DizhiguanliLoader_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)('mssqlConnection')),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], DizhiguanliLoader);
//# sourceMappingURL=dizhiguanli.loader.js.map