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
exports.DeviceController = void 0;
const common_1 = require("@nestjs/common");
const device_service_1 = require("./device.service");
let DeviceController = class DeviceController {
    constructor(deviceService) {
        this.deviceService = deviceService;
    }
    async validate_qr(deviceId, qr) {
        return this.deviceService.validate_qr(qr, deviceId);
    }
};
__decorate([
    (0, common_1.Get)('device/:deviceId/:qr'),
    __param(0, (0, common_1.Param)('deviceId')),
    __param(1, (0, common_1.Param)('qr')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "validate_qr", null);
DeviceController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [device_service_1.DeviceService])
], DeviceController);
exports.DeviceController = DeviceController;
//# sourceMappingURL=device.controller.js.map