import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PlaceSchema } from "./model/place.model";
import { PlaceController } from "./places.controller";
import { PlaceService } from "./places.service";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'places', schema: PlaceSchema }])
    ],
    controllers: [ PlaceController],
    providers: [PlaceService],
    exports: [PlaceService]
})
export class PlaceModule { }