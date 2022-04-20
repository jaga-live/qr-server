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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const bcrypt_1 = require("bcrypt");
const mongoose_2 = require("mongoose");
const uuid_1 = require("uuid");
const user_service_1 = require("../users/user.service");
const speakeasy = require("speakeasy");
let AuthService = class AuthService {
    constructor(userModel, jwtService, userService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async login(payload) {
        var _a;
        const { email, password } = payload;
        var isUserValid = await this.userService.view_user_by_email(email);
        if (!isUserValid)
            throw new common_1.BadRequestException('User Not Found');
        if (!(0, bcrypt_1.compareSync)(password, isUserValid.password))
            throw new common_1.BadRequestException('Invalid Email or Password');
        var jwt_session = (0, uuid_1.v4)();
        var jwt = this.jwtService.sign({
            _id: isUserValid._id,
            roles: isUserValid.roles,
            jwt_session
        });
        await this.userModel.updateOne({ email }, {
            $push: {
                jwt: jwt_session
            }
        });
        return {
            _id: isUserValid._id,
            token: jwt,
            roles: isUserValid.roles,
            totp_secret: (_a = isUserValid === null || isUserValid === void 0 ? void 0 : isUserValid.twoFactorAuth) === null || _a === void 0 ? void 0 : _a.totp
        };
    }
    async logout(userData) {
    }
    async verify_totp_user(userId, token) {
        var user = await this.userService.view_user_by_id(userId);
        var isVerified = speakeasy.totp.verify({
            secret: user.twoFactorAuth.totp,
            encoding: 'base32',
            token
        });
        return isVerified;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('users')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map