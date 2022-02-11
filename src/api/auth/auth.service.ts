import { BadRequestException, Get, Injectable, Req, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { compareSync } from "bcrypt";
import { Model } from "mongoose";
import { v4 } from "uuid";
import { User } from "../users/model/user.model";
import { UserService } from "../users/user.service";
import { JwtGuard } from "./guards/jwt.guard";


@Injectable()
export class AuthService{
    constructor(
        @InjectModel('users') private readonly userModel: Model<User>,
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) { }
    

    //////LOGIN USER
    async login(payload: any) {
        const { email, password } = payload
        
        var isUserValid: any = await this.userService.view_user_by_email(email)
        if (!isUserValid) throw new BadRequestException('User Not Found')
        
        if (!compareSync(password, isUserValid.password)) throw new BadRequestException('Invalid Email or Password')

        var jwt_session = v4()

        var jwt = this.jwtService.sign({
            _id: isUserValid._id,
            roles: isUserValid.roles,
            jwt_session
        })
        
        await this.userModel.updateOne({ email }, {
            $push: {
                jwt: jwt_session
            }
        })

        return {
            _id: isUserValid._id,
            token: jwt,
            role: isUserValid.roles[0]
        }

    }



   

}