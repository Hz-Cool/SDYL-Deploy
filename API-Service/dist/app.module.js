"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const serve_static_1 = require("@nestjs/serve-static");
const nestjs_pino_1 = require("nestjs-pino");
const path = require("path");
const dayjs = require("dayjs");
const app_controller_1 = require("./app.controller");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./modules/users/users.module");
const auth_module_1 = require("./modules/auth/auth.module");
const test111_module_1 = require("./modules/test111/test111.module");
const table1_entity_1 = require("./modules/test111/table1.entity");
const mssql_result_module_1 = require("./modules/mssql-result/mssql-result.module");
const a1000495177_result_entity_1 = require("./modules/mssql-result/entities/a1000495177-result.entity");
const a1003944189_result_entity_1 = require("./modules/mssql-result/entities/a1003944189-result.entity");
const a1005282639_result_entity_1 = require("./modules/mssql-result/entities/a1005282639-result.entity");
const current_product_1 = require("./modules/mssql-result/entities/current-product");
const accounts_module_1 = require("./modules/accounts/accounts.module");
const report_api_module_1 = require("./modules/report-api/report-api.module");
const logs_tree_module_1 = require("./modules/logs-tree/logs-tree.module");
const http_request_error_log_module_1 = require("./modules/http-request-error-log/http-request-error-log.module");
const http_request_client_module_1 = require("./modules/http-request-client/http-request-client.module");
const schedule_1 = require("@nestjs/schedule");
const request_event_module_1 = require("./modules/request-event/request-event.module");
const schedule_task_module_1 = require("./modules/schedule-task/schedule-task.module");
const sys_config_module_1 = require("./modules/config/sys-config.module");
const logs_auth_middleware_1 = require("./common/middleware/logs-auth.middleware");
const all_exceptions_filter_1 = require("./common/filters/all-exceptions.filter");
const getLogFilePath = () => {
    const now = dayjs();
    const yearMonth = now.format('YYYYMM');
    const day = now.format('DD');
    return path.join(process.cwd(), 'logs', yearMonth, day, 'app', 'app.log');
};
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logs_auth_middleware_1.LogsAuthMiddleware).forRoutes('logs', 'logs/(.*)');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path.join(process.cwd(), 'logs'),
                serveRoot: '/logs',
                serveStaticOptions: {
                    dotfiles: 'allow',
                },
            }),
            nestjs_pino_1.LoggerModule.forRoot({
                pinoHttp: {
                    level: process.env.LOG_LEVEL || 'info',
                    transport: {
                        target: 'pino-roll',
                        options: {
                            file: getLogFilePath(),
                            frequency: 'daily',
                            mkdir: true,
                            extension: '',
                        },
                    },
                },
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                autoLoadEntities: true,
                synchronize: false,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                name: 'mssqlConnection',
                type: 'mssql',
                host: process.env.MSSQL_HOST || '127.0.0.1',
                port: Number(process.env.MSSQL_PORT) || 1433,
                username: process.env.MSSQL_USERNAME || 'sa',
                password: process.env.MSSQL_PASSWORD || '900808',
                database: process.env.MSSQL_DATABASE || 'test111',
                entities: [table1_entity_1.Table1, a1000495177_result_entity_1.A1000495177Result, a1003944189_result_entity_1.A1003944189Result, a1005282639_result_entity_1.A1005282639Result, current_product_1.CurrentProduct],
                synchronize: false,
                options: {
                    encrypt: false,
                    trustServerCertificate: true,
                },
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            test111_module_1.Test111Module,
            accounts_module_1.AccountsModule,
            report_api_module_1.ReportApiModule,
            logs_tree_module_1.LogsTreeModule,
            http_request_error_log_module_1.HttpRequestErrorLogModule,
            http_request_client_module_1.HttpRequestClientModule,
            request_event_module_1.RequestEventModule,
            schedule_task_module_1.ScheduleTaskModule,
            sys_config_module_1.SysConfigModule,
            mssql_result_module_1.MssqlResultModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: all_exceptions_filter_1.AllExceptionsFilter,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map