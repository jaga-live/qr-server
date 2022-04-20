"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceModule = void 0;
const common_1 = require("@nestjs/common");
const logs_module_1 = require("../logs/logs.module");
const user_module_1 = require("../users/user.module");
const device_controller_1 = require("./device.controller");
const device_service_1 = require("./device.service");
let DeviceModule = class DeviceModule {
};
DeviceModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule, logs_module_1.LogsModule],
        controllers: [device_controller_1.DeviceController],
        providers: [device_service_1.DeviceService]
    })
], DeviceModule);
exports.DeviceModule = DeviceModule;
//# sourceMappingURL=device.module.js.map