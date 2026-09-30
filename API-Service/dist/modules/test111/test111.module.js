"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test111Module = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const table1_entity_1 = require("./table1.entity");
const test111_service_1 = require("./test111.service");
const test111_controller_1 = require("./test111.controller");
let Test111Module = class Test111Module {
};
exports.Test111Module = Test111Module;
exports.Test111Module = Test111Module = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([table1_entity_1.Table1], 'mssqlConnection'),
        ],
        controllers: [test111_controller_1.Test111Controller],
        providers: [test111_service_1.Test111Service],
        exports: [test111_service_1.Test111Service],
    })
], Test111Module);
//# sourceMappingURL=test111.module.js.map