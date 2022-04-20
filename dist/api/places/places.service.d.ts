import { Model, Types } from "mongoose";
import { Place } from "./model/place.model";
import { CreatePlaceDto } from "./_dto/create.place";
import { EditPlaceDto } from "./_dto/edit.place";
export declare class PlaceService {
    private readonly placeModel;
    constructor(placeModel: Model<Place>);
    add_place(payload: CreatePlaceDto): Promise<Place>;
    view_all_places(): Promise<Place[]>;
    find_place_by_name(name: string): Promise<import("mongoose").Document<unknown, any, Place> & Place & {
        _id: Types.ObjectId;
    }>;
    find_place_by_deviceid(deviceId: string): Promise<import("mongoose").Document<unknown, any, Place> & Place & {
        _id: Types.ObjectId;
    }>;
    edit_place(placeId: Types.ObjectId, payload: EditPlaceDto): Promise<{
        name: string;
        deviceId: string;
    }>;
    delete_place(placeId: Types.ObjectId): Promise<{
        _id: Types.ObjectId;
    }>;
}
