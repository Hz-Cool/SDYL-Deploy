"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestEventModule = void 0;
const common_1 = require("@nestjs/common");
const report_api_module_1 = require("../report-api/report-api.module");
const http_request_client_module_1 = require("../http-request-client/http-request-client.module");
const login_event_controller_1 = require("./login/login-event.controller");
const login_event_service_1 = require("./login/login-event.service");
const table1_event_controller_1 = require("./table1/table1-event.controller");
const table1_event_service_1 = require("./table1/table1-event.service");
const order_event_controller_1 = require("./order/order-event.controller");
const order_event_service_1 = require("./order/order-event.service");
const accounts_module_1 = require("../accounts/accounts.module");
const sys_config_module_1 = require("../config/sys-config.module");
const mssql_result_module_1 = require("../mssql-result/mssql-result.module");
const refresh_model_event_controller_1 = require("./refresh-model/refresh-model-event.controller");
const refresh_model_event_service_1 = require("./refresh-model/refresh-model-event.service");
const work_report_event_controller_1 = require("./work-report/work-report-event.controller");
const work_report_event_service_1 = require("./work-report/work-report-event.service");
let RequestEventModule = class RequestEventModule {
};
exports.RequestEventModule = RequestEventModule;
exports.RequestEventModule = RequestEventModule = __decorate([
    (0, common_1.Module)({
        imports: [
            report_api_module_1.ReportApiModule,
            http_request_client_module_1.HttpRequestClientModule,
            accounts_module_1.AccountsModule,
            sys_config_module_1.SysConfigModule,
            mssql_result_module_1.MssqlResultModule,
        ],
        controllers: [
            login_event_controller_1.LoginEventController,
            table1_event_controller_1.Table1EventController,
            order_event_controller_1.OrderEventController,
            refresh_model_event_controller_1.RefreshModelEventController,
            work_report_event_controller_1.WorkReportEventController,
        ],
        providers: [
            login_event_service_1.LoginEventService,
            table1_event_service_1.Table1EventService,
            order_event_service_1.OrderEventService,
            refresh_model_event_service_1.RefreshModelEventService,
            work_report_event_service_1.WorkReportEventService,
        ],
        exports: [
            login_event_service_1.LoginEventService,
            table1_event_service_1.Table1EventService,
            order_event_service_1.OrderEventService,
            refresh_model_event_service_1.RefreshModelEventService,
            work_report_event_service_1.WorkReportEventService,
        ],
    })
], RequestEventModule);
//# sourceMappingURL=request-event.module.js.map