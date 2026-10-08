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
exports.RefreshModelEventController = void 0;
const common_1 = require("@nestjs/common");
const refresh_model_event_service_1 = require("./refresh-model-event.service");
let RefreshModelEventController = class RefreshModelEventController {
    refreshModelEventService;
    constructor(refreshModelEventService) {
        this.refreshModelEventService = refreshModelEventService;
    }
    async sendRefreshModel(body) {
        return await this.refreshModelEventService.execute(body);
    }
    async sendRefreshModelGet() {
        return await this.refreshModelEventService.execute();
    }
};
exports.RefreshModelEventController = RefreshModelEventController;
__decorate([
    (0, common_1.Post)('/send'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RefreshModelEventController.prototype, "sendRefreshModel", null);
__decorate([
    (0, common_1.Get)('/send'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RefreshModelEventController.prototype, "sendRefreshModelGet", null);
exports.RefreshModelEventController = RefreshModelEventController = __decorate([
    (0, common_1.Controller)('request-event/refresh-model'),
    __metadata("design:paramtypes", [refresh_model_event_service_1.RefreshModelEventService])
], RefreshModelEventController);
//# sourceMappingURL=refresh-model-event.controller.js.map