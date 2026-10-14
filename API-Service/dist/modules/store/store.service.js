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
var StoreService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const store_types_1 = require("./store.types");
let StoreService = StoreService_1 = class StoreService {
    loadersRaw;
    logger = new common_1.Logger(StoreService_1.name);
    stores = new Map();
    constructor(loadersRaw) {
        this.loadersRaw = loadersRaw;
    }
    get loaders() {
        if (!this.loadersRaw)
            return [];
        return Array.isArray(this.loadersRaw) ? this.loadersRaw : [this.loadersRaw];
    }
    async onApplicationBootstrap() {
        try {
            await this.reload();
        }
        catch (e) {
            this.logger.error(`[Store] 启动加载失败: ${e?.message || String(e)}`);
        }
    }
    async reload() {
        this.stores.clear();
        this.logger.log(`[Store] reload start, loaders=${this.loaders.length}`);
        for (const loader of this.loaders) {
            try {
                await loader.load(this);
            }
            catch (e) {
                this.logger.error(`[Store] loader[${loader.name}] 加载失败: ${e?.message || String(e)}`);
            }
        }
        this.logger.log(`[Store] 数据加载完成，共 ${this.stores.size} 个 store: ${this.listStoreNames().join(', ')}`);
    }
    async handleRefresh() {
        await this.reload();
    }
    getStore(storeName) {
        let store = this.stores.get(storeName);
        if (!store) {
            store = new Map();
            this.stores.set(storeName, store);
        }
        return store;
    }
    get(storeName, key) {
        return this.getStore(storeName).get(key);
    }
    set(storeName, key, value) {
        this.getStore(storeName).set(key, value);
    }
    has(storeName, key) {
        return this.getStore(storeName).has(key);
    }
    delete(storeName, key) {
        this.getStore(storeName).delete(key);
    }
    setStore(storeName, entries) {
        const store = this.getStore(storeName);
        store.clear();
        if (entries instanceof Map) {
            entries.forEach((v, k) => store.set(k, v));
        }
        else {
            Object.entries(entries || {}).forEach(([k, v]) => store.set(k, v));
        }
    }
    listStoreNames() {
        return Array.from(this.stores.keys());
    }
    getStoreAll(storeName) {
        if (storeName) {
            const store = this.stores.get(storeName);
            const result = {};
            store?.forEach((v, k) => (result[k] = v));
            return result;
        }
        const all = {};
        this.stores.forEach((store, name) => {
            const item = {};
            store.forEach((v, k) => (item[k] = v));
            all[name] = item;
        });
        return all;
    }
    getLimit(modelPrefix, op, cnBaseName) {
        const opLimits = this.get(store_types_1.STORE.LIMITS, modelPrefix)?.[op];
        if (!opLimits)
            return undefined;
        return Object.values(opLimits).find((g) => g.name === cnBaseName);
    }
    getLimitByKey(modelPrefix, op, key) {
        return this.get(store_types_1.STORE.LIMITS, modelPrefix)?.[op]?.[key];
    }
};
exports.StoreService = StoreService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_30_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StoreService.prototype, "handleRefresh", null);
exports.StoreService = StoreService = StoreService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(store_types_1.STORE_LOADER)),
    __metadata("design:paramtypes", [Object])
], StoreService);
//# sourceMappingURL=store.service.js.map