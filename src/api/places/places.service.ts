import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Place } from "./model/place.model";
import { CreatePlaceDto } from "./_dto/create.place";
import { EditPlaceDto } from "./_dto/edit.place";


@Injectable()
export class PlaceService{
    constructor(
        @InjectModel('places') private readonly placeModel: Model<Place>
    ) { }
    

///////CREATE
    /////Add a place
    async add_place( payload: CreatePlaceDto): Promise<Place> {
        
        var place = await this.find_place_by_name(payload.name)
        if(place) throw new ConflictException('Place Already Exists')

        var saveData = await this.placeModel.insertMany(payload)

        return saveData[0]

    }
    
    
//////VIEW
    ////Find all Places
    async view_all_places(): Promise<Place[]> {
        var place = await this.placeModel.find({})
        return place
    }


    ////Find place by name
    async find_place_by_name(name: string) {

        var place = await this.placeModel.findOne({
            name: { $regex: name, $options: 'i'}
        })

        return place
    }

    /////Get place by Devie ID
    async find_place_by_deviceid(deviceId: string) {
        
        var place = await this.placeModel.findOne({ deviceId })
        return place
    }
    
    
/////PATCH
    ////Edit a Place
    async edit_place(placeId: Types.ObjectId, payload: EditPlaceDto) {
        
        await this.placeModel.updateOne({ _id: placeId }, {
            $set: payload
        })

        return {
            ...payload
        }

    }
    
    
/////DELETE
    async delete_place(placeId: Types.ObjectId) {
        
        await this.placeModel.deleteOne({ _id: placeId })
        return {
            _id: placeId
        }
    }
}