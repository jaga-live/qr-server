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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../users/user.service");
const speakeasy = require("speakeasy");
const mongoose_1 = require("mongoose");
const logs_service_1 = require("../logs/scan_log/logs.service");
let DeviceService = class DeviceService {
    constructor(userService, scanlogService) {
        this.userService = userService;
        this.scanlogService = scanlogService;
    }
    async validate_qr(qr, deviceId) {
        var userId = new mongoose_1.Types.ObjectId(qr.split('-')[0]);
        var code = qr.split('-')[1];
        var createError = {};
        if (!userId || code)
            createError.type = "invalid_qr";
        var isuserValid = await this.userService.view_user_by_id(new mongoose_1.Types.ObjectId(userId));
        if (!isuserValid)
            createError.type = "invalid_user";
        var isVerified = speakeasy.totp.verify({
            secret: isuserValid.twoFactorAuth.totp,
            encoding: 'base32',
            token: code
        });
        if (!isVerified)
            createError.type = "invalid_otp";
        await this.scanlogService.logScan(deviceId, userId, createError ? createError.type : 'success');
        if (createError)
            throw new common_1.BadRequestException('Invalid QR');
        return {
            messgae: 'ok'
        };
    }
};
DeviceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        logs_service_1.ScanLogsService])
], DeviceService);
exports.DeviceService = DeviceService;
//# sourceMappingURL=device.service.js.map