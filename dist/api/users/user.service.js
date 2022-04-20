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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const bcrypt_1 = require("bcrypt");
const mongoose_2 = require("mongoose");
const speakeasy = require("speakeasy");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async add_user(payload) {
        var doesUserExist = await this.view_user_by_email(payload.email);
        if (doesUserExist)
            throw new common_1.ConflictException('User Already Exists');
        payload.password = (0, bcrypt_1.hashSync)(payload.password, 12);
        payload.roles = [payload.role];
        var secret = speakeasy.generateSecret();
        payload.twoFactorAuth = {
            totp: secret.base32
        };
        await this.userModel.insertMany(payload);
        delete payload.password;
        delete payload.twoFactorAuth;
        return Object.assign({}, payload);
    }
    async user_profile(userId) {
        var user = await this.userModel.findOne({ _id: userId }, {
            password: 0,
            jwt: 0,
            mobileJwt: 0,
            twofactorAuth: 0
        });
        return user;
    }
    async view_user_by_email(email) {
        var user = await this.userModel.findOne({ email }).lean();
        return user;
    }
    async view_user_by_id(_id) {
        var user = await this.userModel.findOne({ _id }).lean();
        return user;
    }
    async view_all_users(role) {
        var user = await this.userModel.find({ roles: role }, {
            password: 0,
            jwt: 0,
            mobileJwt: 0,
            twofactorAuth: 0
        });
        return user;
    }
    async edit_user(userId, payload) {
        var isUserValid = await this.view_user_by_id(userId);
        if (!isUserValid)
            throw new common_1.BadRequestException('User Not Found');
        await this.userModel.updateOne({ _id: userId }, {
            $set: payload
        });
        return Object.assign({ _id: userId }, payload);
    }
    async delete_user(userId) {
        var isUserValid = await this.view_user_by_id(userId);
        if (!isUserValid)
            throw new common_1.BadRequestException('User Not Found');
        await this.userModel.deleteOne({ _id: userId });
        return {
            _id: userId
        };
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('users')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map