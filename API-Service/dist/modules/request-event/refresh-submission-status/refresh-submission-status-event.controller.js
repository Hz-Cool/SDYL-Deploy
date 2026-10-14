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
exports.RefreshSubmissionStatusEventController = void 0;
const common_1 = require("@nestjs/common");
const refresh_submission_status_event_service_1 = require("./refresh-submission-status-event.service");
let RefreshSubmissionStatusEventController = class RefreshSubmissionStatusEventController {
    service;
    constructor(service) {
        this.service = service;
    }
    async run(body) {
        return await this.service.execute({ payloadParams: body });
    }
    async runGet() {
        return await this.service.execute();
    }
};
exports.RefreshSubmissionStatusEventController = RefreshSubmissionStatusEventController;
__decorate([
    (0, common_1.Post)('/run'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RefreshSubmissionStatusEventController.prototype, "run", null);
__decorate([
    (0, common_1.Get)('/run'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RefreshSubmissionStatusEventController.prototype, "runGet", null);
exports.RefreshSubmissionStatusEventController = RefreshSubmissionStatusEventController = __decorate([
    (0, common_1.Controller)('request-event/refresh-submission-status'),
    __metadata("design:paramtypes", [refresh_submission_status_event_service_1.RefreshSubmissionStatusEventService])
], RefreshSubmissionStatusEventController);
//# sourceMappingURL=refresh-submission-status-event.controller.js.map