import { Types } from "mongoose";
import { PlaceService } from "./places.service";
import { CreatePlaceDto } from "./_dto/create.place";
import { EditPlaceDto } from "./_dto/edit.place";
export declare class PlaceController {
    private readonly placeService;
    constructor(placeService: PlaceService);
    addPlace(data: CreatePlaceDto): Promise<import("./model/place.model").Place>;
    viewPlace(): Promise<import("./model/place.model").Place[]>;
    editPlace(placeId: Types.ObjectId, data: EditPlaceDto): Promise<{
        name: string;
        deviceId: string;
    }>;
    deletePlace(placeId: Types.ObjectId): Promise<{
        _id: Types.ObjectId;
    }>;
}
