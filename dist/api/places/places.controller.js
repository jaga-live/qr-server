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
exports.PlaceController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const role_enum_1 = require("../auth/enum/role.enum");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const role_guard_1 = require("../auth/guards/role.guard");
const places_service_1 = require("./places.service");
const create_place_1 = require("./_dto/create.place");
const edit_place_1 = require("./_dto/edit.place");
let PlaceController = class PlaceController {
    constructor(placeService) {
        this.placeService = placeService;
    }
    async addPlace(data) {
        return this.placeService.add_place(data);
    }
    async viewPlace() {
        return this.placeService.view_all_places();
    }
    async editPlace(placeId, data) {
        return this.placeService.edit_place(new mongoose_1.Types.ObjectId(placeId), data);
    }
    async deletePlace(placeId) {
        return this.placeService.delete_place(new mongoose_1.Types.ObjectId(placeId));
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_place_1.CreatePlaceDto]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "addPlace", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "viewPlace", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.Patch)(':placeId'),
    __param(0, (0, common_1.Param)('placeId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, edit_place_1.EditPlaceDto]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "editPlace", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.Delete)(':placeId'),
    __param(0, (0, common_1.Param)('placeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "deletePlace", null);
PlaceController = __decorate([
    (0, common_1.Controller)('place'),
    __metadata("design:paramtypes", [places_service_1.PlaceService])
], PlaceController);
exports.PlaceController = PlaceController;
//# sourceMappingURL=places.controller.js.map