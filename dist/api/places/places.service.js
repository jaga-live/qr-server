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
exports.PlaceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let PlaceService = class PlaceService {
    constructor(placeModel) {
        this.placeModel = placeModel;
    }
    async add_place(payload) {
        var place = await this.find_place_by_name(payload.name);
        if (place)
            throw new common_1.ConflictException('Place Already Exists');
        var saveData = await this.placeModel.insertMany(payload);
        return saveData[0];
    }
    async view_all_places() {
        var place = await this.placeModel.find({});
        return place;
    }
    async find_place_by_name(name) {
        var place = await this.placeModel.findOne({
            name: { $regex: name, $options: 'i' }
        });
        return place;
    }
    async find_place_by_deviceid(deviceId) {
        var place = await this.placeModel.findOne({ deviceId });
        return place;
    }
    async edit_place(placeId, payload) {
        await this.placeModel.updateOne({ _id: placeId }, {
            $set: payload
        });
        return Object.assign({}, payload);
    }
    async delete_place(placeId) {
        await this.placeModel.deleteOne({ _id: placeId });
        return {
            _id: placeId
        };
    }
};
PlaceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('places')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PlaceService);
exports.PlaceService = PlaceService;
//# sourceMappingURL=places.service.js.map