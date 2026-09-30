"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MssqlResultModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const a1000495177_result_entity_1 = require("./entities/a1000495177-result.entity");
const a1003944189_result_entity_1 = require("./entities/a1003944189-result.entity");
const a1005282639_result_entity_1 = require("./entities/a1005282639-result.entity");
const mssql_result_service_1 = require("./mssql-result.service");
const mssql_result_controller_1 = require("./mssql-result.controller");
const current_product_1 = require("./entities/current-product");
let MssqlResultModule = class MssqlResultModule {
};
exports.MssqlResultModule = MssqlResultModule;
exports.MssqlResultModule = MssqlResultModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([a1000495177_result_entity_1.A1000495177Result, a1003944189_result_entity_1.A1003944189Result, a1005282639_result_entity_1.A1005282639Result, current_product_1.CurrentProduct], 'mssqlConnection'),
        ],
        controllers: [mssql_result_controller_1.MssqlResultController],
        providers: [mssql_result_service_1.MssqlResultService],
        exports: [mssql_result_service_1.MssqlResultService],
    })
], MssqlResultModule);
//# sourceMappingURL=mssql-result.module.js.map