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
        
        var place = await this.find_user_by_name(payload.name)
        if(place) throw new ConflictException('Place Already Exists')

        var saveData = await this.placeModel.insertMany(payload)

        return saveData[0]

    }
    
    
//////VIEW
    ////Find all Users
    async view_all_users(): Promise<Place[]> {
        var place = await this.placeModel.find({})
        return place
    }


    ////Find user by name
    async find_user_by_name(name: string) {

        var place = await this.placeModel.findOne({
            name: { $regex: name, $options: 'i'}
        })

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