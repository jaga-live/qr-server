import { BadRequestException, Controller, Get, Param } from "@nestjs/common";
import { Types } from "mongoose";
import { UserService } from "../users/user.service";
import * as speakeasy from "speakeasy"
import { DeviceService } from "./device.service";

@Controller()
export class DeviceController{
    constructor(
        private readonly deviceService: DeviceService
    ) { }
    


    /////////QR - Validate
    @Get('device/:deviceId/:qr')
    async validate_qr(
        @Param('deviceId') deviceId: string,
        @Param('qr') qr: string
    ) {
        
        return this.deviceService.validate_qr(qr)

    }


}