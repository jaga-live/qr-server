import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { PlaceService } from "src/api/places/places.service";
import { ScanLogs } from "../models/scan_log.model";


@Injectable()
export class ScanLogsService{
    constructor(
        @InjectModel('scan_logs') private readonly ScanModel: Model<ScanLogs>,
        private readonly placeService: PlaceService
    ) { }
    

    /////////Log a Scan from device
    async logScan(deviceId: string, userId: Types.ObjectId, status: string): Promise<void> {
        
        /////Get PlaceId
        let placeInfo: any = await this.placeService.find_place_by_deviceid(deviceId)

        await this.ScanModel.insertMany({
            deviceId,
            userId,
            placeId: placeInfo?._id || null,
            status,
            createdAt: new Date()
        })
    }
}