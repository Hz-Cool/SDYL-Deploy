"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InspectSubmitModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const inspect_submit_entity_1 = require("./entities/inspect-submit.entity");
const inspect_submit_service_1 = require("./inspect-submit.service");
const inspect_submit_controller_1 = require("./inspect-submit.controller");
let InspectSubmitModule = class InspectSubmitModule {
};
exports.InspectSubmitModule = InspectSubmitModule;
exports.InspectSubmitModule = InspectSubmitModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([inspect_submit_entity_1.MesInspectSubmit])],
        controllers: [inspect_submit_controller_1.InspectSubmitController],
        providers: [inspect_submit_service_1.InspectSubmitService],
        exports: [inspect_submit_service_1.InspectSubmitService],
    })
], InspectSubmitModule);
//# sourceMappingURL=inspect-submit.module.js.map