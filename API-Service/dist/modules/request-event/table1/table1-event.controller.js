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
exports.Table1EventController = void 0;
const common_1 = require("@nestjs/common");
const table1_event_service_1 = require("./table1-event.service");
let Table1EventController = class Table1EventController {
    table1EventService;
    constructor(table1EventService) {
        this.table1EventService = table1EventService;
    }
    async sendTable1(body) {
        return await this.table1EventService.sendTable1Request(body);
    }
    async sendTable1Get() {
        return await this.table1EventService.sendTable1Request();
    }
};
exports.Table1EventController = Table1EventController;
__decorate([
    (0, common_1.Post)('/send'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Table1EventController.prototype, "sendTable1", null);
__decorate([
    (0, common_1.Get)('/send'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Table1EventController.prototype, "sendTable1Get", null);
exports.Table1EventController = Table1EventController = __decorate([
    (0, common_1.Controller)('request-event/table1'),
    __metadata("design:paramtypes", [table1_event_service_1.Table1EventService])
], Table1EventController);
//# sourceMappingURL=table1-event.controller.js.map