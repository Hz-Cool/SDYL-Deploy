"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportApiModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const report_api_entity_1 = require("./entities/report-api.entity");
const api_query_history_entity_1 = require("./entities/api-query-history.entity");
const report_api_service_1 = require("./report-api.service");
const report_api_controller_1 = require("./report-api.controller");
const http_request_client_module_1 = require("../http-request-client/http-request-client.module");
let ReportApiModule = class ReportApiModule {
};
exports.ReportApiModule = ReportApiModule;
exports.ReportApiModule = ReportApiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([report_api_entity_1.ReportApi, api_query_history_entity_1.ApiQueryHistory]),
            http_request_client_module_1.HttpRequestClientModule,
        ],
        controllers: [report_api_controller_1.ReportApiController],
        providers: [report_api_service_1.ReportApiService],
        exports: [report_api_service_1.ReportApiService],
    })
], ReportApiModule);
//# sourceMappingURL=report-api.module.js.map