import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "../users/user.service";
import * as speakeasy from "speakeasy"
import { Types } from "mongoose";
import { ScanLogsService } from "../logs/scan_log/logs.service";

@Injectable()
export class DeviceService{
    constructor(
        private readonly userService: UserService,
        private readonly scanlogService: ScanLogsService
    ) { }
    

    async validate_qr(qr: string, deviceId: string) {

        var userId = new Types.ObjectId(qr.split('-')[0])
        var code = qr.split('-')[1]

        var createError: any = {}

        if (!userId || code) createError.type = "invalid_qr"

        /////Validate user
        var isuserValid: any = await this.userService.view_user_by_id(new Types.ObjectId(userId))
        if (!isuserValid) createError.type = "invalid_user"
        
        /////Validate OTP
        var isVerified = speakeasy.totp.verify({
            secret: isuserValid.twoFactorAuth.totp,
            encoding: 'base32',
            token: code
        })

        if (!isVerified) createError.type = "invalid_otp"

        ////Initiate Scan Logs
        await this.scanlogService.logScan(deviceId, userId, createError ? createError.type : 'success')
        
        /////Throw Errors if any
        if (createError) throw new BadRequestException('Invalid QR')
        
        return {
            messgae: 'ok'
        }
    }


}