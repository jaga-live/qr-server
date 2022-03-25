import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "../users/user.service";
import * as speakeasy from "speakeasy"
import { Types } from "mongoose";

@Injectable()
export class DeviceService{
    constructor(
        private readonly userService: UserService
    ) { }
    

    async validate_qr(qr: string) {
        var userId = qr.split('-')[0]
        var code = qr.split('-')[1]


        /////Validate user
        var isuserValid: any = await this.userService.view_user_by_id(new Types.ObjectId(userId))
        if (!isuserValid) throw new BadRequestException('Invalid QR')
        
        /////Validate OTP
        var isVerified = speakeasy.totp.verify({
            secret: isuserValid.twoFactorAuth.totp,
            encoding: 'base32',
            token: code
        })

        if (!isVerified) throw new BadRequestException('Invalid QR')
        
        return {
            messgae: 'ok'
        }
    }


}