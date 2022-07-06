import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Place{
    @Prop()
    name: string
    
    @Prop()
    deviceId: string

}

export const PlaceSchema = SchemaFactory.createForClass(Place)