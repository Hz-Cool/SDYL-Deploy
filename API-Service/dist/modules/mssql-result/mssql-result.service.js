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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MssqlResultService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const a1000495177_result_entity_1 = require("./entities/a1000495177-result.entity");
const a1003944189_result_entity_1 = require("./entities/a1003944189-result.entity");
const a1005282639_result_entity_1 = require("./entities/a1005282639-result.entity");
const current_product_1 = require("./entities/current-product");
const sys_config_service_1 = require("../config/sys-config.service");
const store_service_1 = require("../store/store.service");
let MssqlResultService = class MssqlResultService {
    repo495177;
    repo944189;
    repo282639;
    currentProductRepository;
    sysConfigService;
    storeService;
    constructor(repo495177, repo944189, repo282639, currentProductRepository, sysConfigService, storeService) {
        this.repo495177 = repo495177;
        this.repo944189 = repo944189;
        this.repo282639 = repo282639;
        this.currentProductRepository = currentProductRepository;
        this.sysConfigService = sysConfigService;
        this.storeService = storeService;
    }
    async search495177({ pageNum = 1, pageSize = 20, barcode, }) {
        const where = {};
        if (barcode)
            where.op10Barcode = (0, typeorm_2.Like)(`%${barcode}%`);
        const [list, total] = await this.repo495177.findAndCount({
            where,
            take: pageSize,
            skip: (pageNum - 1) * pageSize,
            order: { op10OnlineTime: 'DESC' },
        });
        return { total, list };
    }
    async findOne495177(barcode) {
        return this.repo495177.findOne({ where: { op10Barcode: barcode } });
    }
    async save495177(dto) {
        return this.repo495177.save(dto);
    }
    async delete495177(barcode) {
        return this.repo495177.delete({ op10Barcode: barcode });
    }
    async search944189({ pageNum = 1, pageSize = 20, barcode, }) {
        const where = {};
        if (barcode)
            where.op10Barcode = (0, typeorm_2.Like)(`%${barcode}%`);
        const [list, total] = await this.repo944189.findAndCount({
            where,
            take: pageSize,
            skip: (pageNum - 1) * pageSize,
            order: { op10OnlineTime: 'DESC' },
        });
        return { total, list };
    }
    async findOne944189(barcode) {
        return this.repo944189.findOne({ where: { op10Barcode: barcode } });
    }
    async save944189(dto) {
        return this.repo944189.save(dto);
    }
    async delete944189(barcode) {
        return this.repo944189.delete({ op10Barcode: barcode });
    }
    async search282639({ pageNum = 1, pageSize = 20, barcode, }) {
        const where = {};
        if (barcode)
            where.op10Barcode = (0, typeorm_2.Like)(`%${barcode}%`);
        const [list, total] = await this.repo282639.findAndCount({
            where,
            take: pageSize,
            skip: (pageNum - 1) * pageSize,
            order: { op10OnlineTime: 'DESC' },
        });
        return { total, list };
    }
    async findOne282639(barcode) {
        return this.repo282639.findOne({ where: { op10Barcode: barcode } });
    }
    async save282639(dto) {
        return this.repo282639.save(dto);
    }
    async delete282639(barcode) {
        return this.repo282639.delete({ op10Barcode: barcode });
    }
    async getCurrentProductType() {
        const [list] = await this.currentProductRepository.findAndCount({
            order: { num: 'DESC' },
        });
        return list[0] ?? {};
    }
    async getCurrentProductList(overrideModel) {
        const CURRENT_PRODUCT_TYPE_KEY = 'current.productType';
        let productType;
        if (overrideModel) {
            productType = overrideModel;
        }
        else {
            const prodTemp = await this.sysConfigService.findOneByKey(CURRENT_PRODUCT_TYPE_KEY);
            productType = JSON.parse(prodTemp.configValue).current || '';
        }
        const timeCursorObj = {
            '282639': 'timeCursor.282639',
            '495177': 'timeCursor.495177',
            '944189': 'timeCursor.944189',
        };
        let processedMachineList = [];
        let standardList = [];
        if (productType.includes('944189')) {
            const t = await this.sysConfigService.findOneByKey(timeCursorObj['944189']);
            const { list, hasMore, nextCursor } = await this.loadNext944189(this.parseCursor(t.configValue), 1);
            list.forEach((d) => {
                processedMachineList.push({
                    machinCode: 'OP10',
                    inTime: d.op10OnlineTime,
                    outTime: d.op10OfflineTime,
                }, {
                    machinCode: 'OP20',
                    inTime: d.op20OnlineTime,
                    outTime: d.op20OfflineTime,
                }, {
                    machinCode: 'OP30',
                    inTime: d.op30OnlineTime,
                    outTime: d.op30OfflineTime,
                }, {
                    machinCode: 'OP40',
                    inTime: d.op40OnlineTime,
                    outTime: d.op40OfflineTime,
                }, {
                    machinCode: 'OP50',
                    inTime: d.op50OnlineTime,
                    outTime: d.op50OfflineTime,
                }, {
                    machinCode: 'OP60',
                    inTime: d.op60OnlineTime,
                    outTime: d.op60OfflineTime,
                });
                const op10_inflectionPressure = this.storeService.getLimitByKey('A1003944189', 'OP10', 'op10_inflectionPressure');
                const op10_finalDisplacement = this.storeService.getLimitByKey('A1003944189', 'OP10', 'op10_finalDisplacement');
                const op10_finalPressure = this.storeService.getLimitByKey('A1003944189', 'OP10', 'op10_finalPressure');
                const op20_inflectionPressure = this.storeService.getLimitByKey('A1003944189', 'OP20', 'op20_inflectionPressure');
                const op20_finalDisplacement = this.storeService.getLimitByKey('A1003944189', 'OP20', 'op20_finalDisplacement');
                const op20_finalPressure = this.storeService.getLimitByKey('A1003944189', 'OP20', 'op20_finalPressure');
                const op30_inflectionPressure = this.storeService.getLimitByKey('A1003944189', 'OP30', 'op30_inflectionPressure');
                const op30_finalDisplacement = this.storeService.getLimitByKey('A1003944189', 'OP30', 'op30_finalDisplacement');
                const op30_finalPressure = this.storeService.getLimitByKey('A1003944189', 'OP30', 'op30_finalPressure');
                const op50_torque = this.storeService.getLimitByKey('A1003944189', 'OP50', 'op50_torque');
                const op50_angle = this.storeService.getLimitByKey('A1003944189', 'OP50', 'op50_angle');
                const op60_leakage = this.storeService.getLimitByKey('A1003944189', 'OP60', 'op60_leakage');
                standardList.push({
                    inspectionItemName: 'OP10_拐点压力1',
                    inspectionItemType: 1,
                    maxValue: op10_inflectionPressure?.max || 0,
                    minValue: op10_inflectionPressure?.min || 0,
                    actualValue: d.op10InflectionPressure1,
                }, {
                    inspectionItemName: 'OP10_最终位移1',
                    inspectionItemType: 1,
                    maxValue: op10_finalDisplacement?.max || 0,
                    minValue: op10_finalDisplacement?.min || 0,
                    actualValue: d.op10FinalDisplacement1,
                }, {
                    inspectionItemName: 'OP10_最终压力1',
                    inspectionItemType: 1,
                    maxValue: op10_finalPressure?.max || 0,
                    minValue: op10_finalPressure?.min || 0,
                    actualValue: d.op10FinalPressure1,
                }, {
                    inspectionItemName: 'OP10_拐点压力2',
                    inspectionItemType: 1,
                    maxValue: op10_inflectionPressure?.max || 0,
                    minValue: op10_inflectionPressure?.min || 0,
                    actualValue: d.op10InflectionPressure2,
                }, {
                    inspectionItemName: 'OP10_最终位移2',
                    inspectionItemType: 1,
                    maxValue: op10_finalDisplacement?.max || 0,
                    minValue: op10_finalDisplacement?.min || 0,
                    actualValue: d.op10FinalDisplacement2,
                }, {
                    inspectionItemName: 'OP10_最终压力2',
                    inspectionItemType: 1,
                    maxValue: op10_finalPressure?.max || 0,
                    minValue: op10_finalPressure?.min || 0,
                    actualValue: d.op10FinalPressure2,
                }, {
                    inspectionItemName: 'OP20_拐点压力',
                    inspectionItemType: 1,
                    maxValue: op20_inflectionPressure?.max || 0,
                    minValue: op20_inflectionPressure?.min || 0,
                    actualValue: d.op20InflectionPressure,
                }, {
                    inspectionItemName: 'OP20_最终位移',
                    inspectionItemType: 1,
                    maxValue: op20_finalDisplacement?.max || 0,
                    minValue: op20_finalDisplacement?.min || 0,
                    actualValue: d.op20FinalDisplacement,
                }, {
                    inspectionItemName: 'OP20_最终压力',
                    inspectionItemType: 1,
                    maxValue: op20_finalPressure?.max || 0,
                    minValue: op20_finalPressure?.min || 0,
                    actualValue: d.op20FinalPressure,
                }, {
                    inspectionItemName: 'OP30_拐点压力',
                    inspectionItemType: 1,
                    maxValue: op30_inflectionPressure?.max || 0,
                    minValue: op30_inflectionPressure?.min || 0,
                    actualValue: d.op30InflectionPressure,
                }, {
                    inspectionItemName: 'OP30_最终位移',
                    inspectionItemType: 1,
                    maxValue: op30_finalDisplacement?.max || 0,
                    minValue: op30_finalDisplacement?.min || 0,
                    actualValue: d.op30FinalDisplacement,
                }, {
                    inspectionItemName: 'OP30_最终压力',
                    inspectionItemType: 1,
                    maxValue: op30_finalPressure?.max || 0,
                    minValue: op30_finalPressure?.min || 0,
                    actualValue: d.op30FinalPressure,
                }, {
                    inspectionItemName: 'OP50_扭矩',
                    inspectionItemType: 1,
                    maxValue: op50_torque?.max || 0,
                    minValue: op50_torque?.min || 0,
                    actualValue: d.op50Torque,
                }, {
                    inspectionItemName: 'OP50_角度',
                    inspectionItemType: 1,
                    maxValue: op50_angle?.max || 0,
                    minValue: op50_angle?.min || 0,
                    actualValue: d.op50Angle,
                }, {
                    inspectionItemName: 'OP60_泄漏量',
                    inspectionItemType: 1,
                    maxValue: op60_leakage?.max || 0,
                    minValue: op60_leakage?.min || 0,
                    actualValue: d.op60LeakageRate,
                });
            });
            return { processedMachineList, standardList, hasMore, cursorKey: timeCursorObj['944189'], nextCursor, barcode: list[0]?.op10Barcode };
        }
        if (productType.includes('282639')) {
            const t = await this.sysConfigService.findOneByKey(timeCursorObj['282639']);
            const { list, hasMore, nextCursor } = await this.loadNext282639(this.parseCursor(t.configValue), 1);
            list.forEach((d) => {
                processedMachineList.push({
                    machinCode: 'OP10',
                    inTime: d.op10OnlineTime,
                    outTime: d.op10OfflineTime,
                }, {
                    machinCode: 'OP20',
                    inTime: d.op20OnlineTime,
                    outTime: d.op20OfflineTime,
                }, {
                    machinCode: 'OP30',
                    inTime: d.op30OnlineTime,
                    outTime: d.op30OfflineTime,
                }, {
                    machinCode: 'OP40',
                    inTime: d.op40OnlineTime,
                    outTime: d.op40OfflineTime,
                }, {
                    machinCode: 'OP50',
                    inTime: d.op50OnlineTime,
                    outTime: d.op50OfflineTime,
                }, {
                    machinCode: 'OP60',
                    inTime: d.op60OnlineTime,
                    outTime: d.op60OfflineTime,
                });
                const op10_inflectionPressure = this.storeService.getLimitByKey('A1005282639', 'OP10', 'op10_inflectionPressure');
                const op10_finalDisplacement = this.storeService.getLimitByKey('A1005282639', 'OP10', 'op10_finalDisplacement');
                const op10_finalPressure = this.storeService.getLimitByKey('A1005282639', 'OP10', 'op10_finalPressure');
                const op20_inflectionPressure = this.storeService.getLimitByKey('A1005282639', 'OP20', 'op20_inflectionPressure');
                const op20_finalDisplacement = this.storeService.getLimitByKey('A1005282639', 'OP20', 'op20_finalDisplacement');
                const op20_finalPressure = this.storeService.getLimitByKey('A1005282639', 'OP20', 'op20_finalPressure');
                const op30_inflectionPressure = this.storeService.getLimitByKey('A1005282639', 'OP30', 'op30_inflectionPressure');
                const op30_finalDisplacement = this.storeService.getLimitByKey('A1005282639', 'OP30', 'op30_finalDisplacement');
                const op30_finalPressure = this.storeService.getLimitByKey('A1005282639', 'OP30', 'op30_finalPressure');
                const op40_inflectionPressure = this.storeService.getLimitByKey('A1005282639', 'OP40', 'op40_inflectionPressure');
                const op40_finalDisplacement = this.storeService.getLimitByKey('A1005282639', 'OP40', 'op40_finalDisplacement');
                const op40_finalPressure = this.storeService.getLimitByKey('A1005282639', 'OP40', 'op40_finalPressure');
                const op50_torque = this.storeService.getLimitByKey('A1005282639', 'OP50', 'op50_torque');
                const op50_angle = this.storeService.getLimitByKey('A1005282639', 'OP50', 'op50_angle');
                const op60_leakage = this.storeService.getLimitByKey('A1005282639', 'OP60', 'op60_leakage');
                standardList.push({
                    inspectionItemName: 'OP10_拐点压力',
                    inspectionItemType: 1,
                    maxValue: op10_inflectionPressure?.max || 0,
                    minValue: op10_inflectionPressure?.min || 0,
                    actualValue: d.op10InflectionPressure,
                }, {
                    inspectionItemName: 'OP10_最终位移',
                    inspectionItemType: 1,
                    maxValue: op10_finalDisplacement?.max || 0,
                    minValue: op10_finalDisplacement?.min || 0,
                    actualValue: d.op10FinalDisplacement,
                }, {
                    inspectionItemName: 'OP10_最终压力',
                    inspectionItemType: 1,
                    maxValue: op10_finalPressure?.max || 0,
                    minValue: op10_finalPressure?.min || 0,
                    actualValue: d.op10FinalPressure,
                }, {
                    inspectionItemName: 'OP20_拐点压力',
                    inspectionItemType: 1,
                    maxValue: op20_inflectionPressure?.max || 0,
                    minValue: op20_inflectionPressure?.min || 0,
                    actualValue: d.op20InflectionPressure,
                }, {
                    inspectionItemName: 'OP20_最终位移',
                    inspectionItemType: 1,
                    maxValue: op20_finalDisplacement?.max || 0,
                    minValue: op20_finalDisplacement?.min || 0,
                    actualValue: d.op20FinalDisplacement,
                }, {
                    inspectionItemName: 'OP20_最终压力',
                    inspectionItemType: 1,
                    maxValue: op20_finalPressure?.max || 0,
                    minValue: op20_finalPressure?.min || 0,
                    actualValue: d.op20FinalPressure,
                }, {
                    inspectionItemName: 'OP30_拐点压力1',
                    inspectionItemType: 1,
                    maxValue: op30_inflectionPressure?.max || 0,
                    minValue: op30_inflectionPressure?.min || 0,
                    actualValue: d.op30InflectionPressure1,
                }, {
                    inspectionItemName: 'OP30_最终位移1',
                    inspectionItemType: 1,
                    maxValue: op30_finalDisplacement?.max || 0,
                    minValue: op30_finalDisplacement?.min || 0,
                    actualValue: d.op30FinalDisplacement1,
                }, {
                    inspectionItemName: 'OP30_最终压力1',
                    inspectionItemType: 1,
                    maxValue: op30_finalPressure?.max || 0,
                    minValue: op30_finalPressure?.min || 0,
                    actualValue: d.op30FinalPressure1,
                }, {
                    inspectionItemName: 'OP30_拐点压力2',
                    inspectionItemType: 1,
                    maxValue: op30_inflectionPressure?.max || 0,
                    minValue: op30_inflectionPressure?.min || 0,
                    actualValue: d.op30InflectionPressure2,
                }, {
                    inspectionItemName: 'OP30_最终位移2',
                    inspectionItemType: 1,
                    maxValue: op30_finalDisplacement?.max || 0,
                    minValue: op30_finalDisplacement?.min || 0,
                    actualValue: d.op30FinalDisplacement2,
                }, {
                    inspectionItemName: 'OP30_最终压力2',
                    inspectionItemType: 1,
                    maxValue: op30_finalPressure?.max || 0,
                    minValue: op30_finalPressure?.min || 0,
                    actualValue: d.op30FinalPressure2,
                }, {
                    inspectionItemName: 'OP40_拐点压力',
                    inspectionItemType: 1,
                    maxValue: op40_inflectionPressure?.max || 0,
                    minValue: op40_inflectionPressure?.min || 0,
                    actualValue: d.op40InflectionPressure,
                }, {
                    inspectionItemName: 'OP40_最终位移',
                    inspectionItemType: 1,
                    maxValue: op40_finalDisplacement?.max || 0,
                    minValue: op40_finalDisplacement?.min || 0,
                    actualValue: d.op40FinalDisplacement,
                }, {
                    inspectionItemName: 'OP40_最终压力',
                    inspectionItemType: 1,
                    maxValue: op40_finalPressure?.max || 0,
                    minValue: op40_finalPressure?.min || 0,
                    actualValue: d.op40FinalPressure,
                }, {
                    inspectionItemName: 'OP50_扭矩1',
                    inspectionItemType: 1,
                    maxValue: op50_torque?.max || 0,
                    minValue: op50_torque?.min || 0,
                    actualValue: d.op50Torque1,
                }, {
                    inspectionItemName: 'OP50_扭矩2',
                    inspectionItemType: 1,
                    maxValue: op50_torque?.max || 0,
                    minValue: op50_torque?.min || 0,
                    actualValue: d.op50Torque2,
                }, {
                    inspectionItemName: 'OP50_扭矩3',
                    inspectionItemType: 1,
                    maxValue: op50_torque?.max || 0,
                    minValue: op50_torque?.min || 0,
                    actualValue: d.op50Torque3,
                }, {
                    inspectionItemName: 'OP50_扭矩4',
                    inspectionItemType: 1,
                    maxValue: op50_torque?.max || 0,
                    minValue: op50_torque?.min || 0,
                    actualValue: d.op50Torque4,
                }, {
                    inspectionItemName: 'OP50_角度1',
                    inspectionItemType: 1,
                    maxValue: op50_angle?.max || 0,
                    minValue: op50_angle?.min || 0,
                    actualValue: d.op50Angle1,
                }, {
                    inspectionItemName: 'OP50_角度2',
                    inspectionItemType: 1,
                    maxValue: op50_angle?.max || 0,
                    minValue: op50_angle?.min || 0,
                    actualValue: d.op50Angle2,
                }, {
                    inspectionItemName: 'OP50_角度3',
                    inspectionItemType: 1,
                    maxValue: op50_angle?.max || 0,
                    minValue: op50_angle?.min || 0,
                    actualValue: d.op50Angle3,
                }, {
                    inspectionItemName: 'OP50_角度4',
                    inspectionItemType: 1,
                    maxValue: op50_angle?.max || 0,
                    minValue: op50_angle?.min || 0,
                    actualValue: d.op50Angle4,
                }, {
                    inspectionItemName: 'OP60_泄漏量',
                    inspectionItemType: 1,
                    maxValue: op60_leakage?.max || 0,
                    minValue: op60_leakage?.min || 0,
                    actualValue: d.op60LeakageRate,
                });
            });
            return { processedMachineList, standardList, hasMore, cursorKey: timeCursorObj['282639'], nextCursor, barcode: list[0]?.op10Barcode };
        }
        if (productType.includes('495177')) {
            const t = await this.sysConfigService.findOneByKey(timeCursorObj['495177']);
            const { list, hasMore, nextCursor } = await this.loadNext495177(this.parseCursor(t.configValue), 1);
            list.forEach((d) => {
                processedMachineList.push({
                    machinCode: 'OP10',
                    inTime: d.op10OnlineTime,
                    outTime: d.op10OfflineTime,
                }, {
                    machinCode: 'OP20',
                    inTime: d.op20OnlineTime,
                    outTime: d.op20OfflineTime,
                }, {
                    machinCode: 'OP30',
                    inTime: d.op30OnlineTime,
                    outTime: d.op30OfflineTime,
                }, {
                    machinCode: 'OP40',
                    inTime: d.op40OnlineTime,
                    outTime: d.op40OfflineTime,
                });
                const op10_inflectionPressure = this.storeService.getLimitByKey('A1000495177', 'OP10', 'op10_inflectionPressure');
                const op10_finalDisplacement = this.storeService.getLimitByKey('A1000495177', 'OP10', 'op10_finalDisplacement');
                const op10_finalPressure = this.storeService.getLimitByKey('A1000495177', 'OP10', 'op10_finalPressure');
                const op20_inflectionPressure = this.storeService.getLimitByKey('A1000495177', 'OP20', 'op20_inflectionPressure');
                const op20_finalDisplacement = this.storeService.getLimitByKey('A1000495177', 'OP20', 'op20_finalDisplacement');
                const op20_finalPressure = this.storeService.getLimitByKey('A1000495177', 'OP20', 'op20_finalPressure');
                const op30_inflectionPressure = this.storeService.getLimitByKey('A1000495177', 'OP30', 'op30_inflectionPressure');
                const op30_finalDisplacement = this.storeService.getLimitByKey('A1000495177', 'OP30', 'op30_finalDisplacement');
                const op30_finalPressure = this.storeService.getLimitByKey('A1000495177', 'OP30', 'op30_finalPressure');
                const op40_torque = this.storeService.getLimitByKey('A1000495177', 'OP40', 'op40_torque');
                const op40_angle = this.storeService.getLimitByKey('A1000495177', 'OP40', 'op40_angle');
                standardList.push({
                    inspectionItemName: 'OP10_拐点压力1',
                    inspectionItemType: 1,
                    maxValue: op10_inflectionPressure?.max || 0,
                    minValue: op10_inflectionPressure?.min || 0,
                    actualValue: d.op10InflectionPressure1,
                }, {
                    inspectionItemName: 'OP10_最终位移1',
                    inspectionItemType: 1,
                    maxValue: op10_finalDisplacement?.max || 0,
                    minValue: op10_finalDisplacement?.min || 0,
                    actualValue: d.op10FinalDisplacement1,
                }, {
                    inspectionItemName: 'OP10_最终压力1',
                    inspectionItemType: 1,
                    maxValue: op10_finalPressure?.max || 0,
                    minValue: op10_finalPressure?.min || 0,
                    actualValue: d.op10FinalPressure1,
                }, {
                    inspectionItemName: 'OP10_拐点压力2',
                    inspectionItemType: 1,
                    maxValue: op10_inflectionPressure?.max || 0,
                    minValue: op10_inflectionPressure?.min || 0,
                    actualValue: d.op10InflectionPressure2,
                }, {
                    inspectionItemName: 'OP10_最终位移2',
                    inspectionItemType: 1,
                    maxValue: op10_finalDisplacement?.max || 0,
                    minValue: op10_finalDisplacement?.min || 0,
                    actualValue: d.op10FinalDisplacement2,
                }, {
                    inspectionItemName: 'OP10_最终压力2',
                    inspectionItemType: 1,
                    maxValue: op10_finalPressure?.max || 0,
                    minValue: op10_finalPressure?.min || 0,
                    actualValue: d.op10FinalPressure2,
                }, {
                    inspectionItemName: 'OP20_拐点压力',
                    inspectionItemType: 1,
                    maxValue: op20_inflectionPressure?.max || 0,
                    minValue: op20_inflectionPressure?.min || 0,
                    actualValue: d.op20InflectionPressure,
                }, {
                    inspectionItemName: 'OP20_最终位移',
                    inspectionItemType: 1,
                    maxValue: op20_finalDisplacement?.max || 0,
                    minValue: op20_finalDisplacement?.min || 0,
                    actualValue: d.op20FinalDisplacement,
                }, {
                    inspectionItemName: 'OP20_最终压力',
                    inspectionItemType: 1,
                    maxValue: op20_finalPressure?.max || 0,
                    minValue: op20_finalPressure?.min || 0,
                    actualValue: d.op20FinalPressure,
                }, {
                    inspectionItemName: 'OP30_拐点压力',
                    inspectionItemType: 1,
                    maxValue: op30_inflectionPressure?.max || 0,
                    minValue: op30_inflectionPressure?.min || 0,
                    actualValue: d.op30InflectionPressure,
                }, {
                    inspectionItemName: 'OP30_最终位移',
                    inspectionItemType: 1,
                    maxValue: op30_finalDisplacement?.max || 0,
                    minValue: op30_finalDisplacement?.min || 0,
                    actualValue: d.op30FinalDisplacement,
                }, {
                    inspectionItemName: 'OP30_最终压力',
                    inspectionItemType: 1,
                    maxValue: op30_finalPressure?.max || 0,
                    minValue: op30_finalPressure?.min || 0,
                    actualValue: d.op30FinalPressure,
                }, {
                    inspectionItemName: 'OP40_扭矩',
                    inspectionItemType: 1,
                    maxValue: op40_torque?.max || 0,
                    minValue: op40_torque?.min || 0,
                    actualValue: d.op40Torque,
                }, {
                    inspectionItemName: 'OP40_角度',
                    inspectionItemType: 1,
                    maxValue: op40_angle?.max || 0,
                    minValue: op40_angle?.min || 0,
                    actualValue: d.op40Angle,
                });
            });
            return { processedMachineList, standardList, hasMore, cursorKey: timeCursorObj['495177'], nextCursor, barcode: list[0]?.op10Barcode };
        }
        return { processedMachineList, standardList };
    }
    async loadNext495177(cursor, limit = 100) {
        const take = this.clampLimit(limit);
        const qb = this.repo495177
            .createQueryBuilder('r')
            .orderBy('r.op40OfflineTime', 'ASC')
            .addOrderBy('r.op10Barcode', 'ASC')
            .take(take);
        this.applyKeysetWhere(qb, 'r.op40OfflineTime', cursor);
        const list = await qb.getMany();
        return this.wrapCursorResult(list, take, (r) => r.op40OfflineTime, (r) => r.op10Barcode);
    }
    async loadNext944189(cursor, limit = 100) {
        const take = this.clampLimit(limit);
        const qb = this.repo944189
            .createQueryBuilder('r')
            .orderBy('r.op60OfflineTime', 'ASC')
            .addOrderBy('r.op10Barcode', 'ASC')
            .take(take);
        this.applyKeysetWhere(qb, 'r.op60OfflineTime', cursor);
        const list = await qb.getMany();
        return this.wrapCursorResult(list, take, (r) => r.op60OfflineTime, (r) => r.op10Barcode);
    }
    async loadNext282639(cursor, limit = 100) {
        const take = this.clampLimit(limit);
        const qb = this.repo282639
            .createQueryBuilder('r')
            .orderBy('r.op50OfflineTime', 'ASC')
            .addOrderBy('r.op10Barcode', 'ASC')
            .take(take);
        this.applyKeysetWhere(qb, 'r.op50OfflineTime', cursor);
        const list = await qb.getMany();
        return this.wrapCursorResult(list, take, (r) => r.op50OfflineTime, (r) => r.op10Barcode);
    }
    clampLimit(limit) {
        const n = Number(limit);
        if (!n || Number.isNaN(n))
            return 100;
        return Math.min(Math.max(Math.floor(n), 1), 1000);
    }
    applyKeysetWhere(qb, timeCol, cursor) {
        if (!cursor)
            return;
        const time = typeof cursor === 'string' ? cursor : cursor.time;
        const barcode = typeof cursor === 'string' ? '' : cursor.barcode || '';
        if (!time)
            return;
        qb.andWhere(`(${timeCol} > :cursorTime) OR (${timeCol} = :cursorTime AND r.op10Barcode > :cursorBarcode)`, { cursorTime: time, cursorBarcode: barcode });
    }
    wrapCursorResult(list, take, getTime, getBarcode) {
        const lastRow = list.length ? list[list.length - 1] : null;
        const nextCursor = lastRow
            ? {
                time: getTime(lastRow) ?? null,
                barcode: getBarcode(lastRow),
            }
            : null;
        return {
            list,
            nextCursor,
            hasMore: list.length === take,
        };
    }
    parseCursor(v) {
        if (!v)
            return undefined;
        const t = v.trim();
        if (t.startsWith('{')) {
            try {
                return JSON.parse(t);
            }
            catch {
                return v;
            }
        }
        return v;
    }
    async commitCursor(cursorKey, nextCursor, resetCount = false) {
        if (!nextCursor)
            return;
        const cfg = await this.sysConfigService.findOneByKey(cursorKey);
        let oldCount = 0;
        try {
            const old = this.parseCursor(cfg.configValue);
            if (old && typeof old === 'object' && typeof old.count === 'number') {
                oldCount = old.count;
            }
        }
        catch { }
        const nextCount = resetCount ? 0 : oldCount + 1;
        const next = { ...nextCursor, count: nextCount };
        await this.sysConfigService.update(cfg.id, {
            configValue: JSON.stringify(next),
        });
    }
};
exports.MssqlResultService = MssqlResultService;
exports.MssqlResultService = MssqlResultService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(a1000495177_result_entity_1.A1000495177Result, 'mssqlConnection')),
    __param(1, (0, typeorm_1.InjectRepository)(a1003944189_result_entity_1.A1003944189Result, 'mssqlConnection')),
    __param(2, (0, typeorm_1.InjectRepository)(a1005282639_result_entity_1.A1005282639Result, 'mssqlConnection')),
    __param(3, (0, typeorm_1.InjectRepository)(current_product_1.CurrentProduct, 'mssqlConnection')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        sys_config_service_1.SysConfigService,
        store_service_1.StoreService])
], MssqlResultService);
//# sourceMappingURL=mssql-result.service.js.map