import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema()
export class ScanLogs{

    @Prop()
    createdAt: Date
    
    @Prop()
    userId: Types.ObjectId

    @Prop()
    placeId: Types.ObjectId

    @Prop()
    deviceId: string

    @Prop()
    status: string

}

export const ScanLogsSchema = SchemaFactory.createForClass(ScanLogs)