import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { hashSync } from "bcrypt";
import { classToPlain } from "class-transformer";
import { Model, Types } from "mongoose";
import { User } from "./model/user.model";
import { CreateUserDto, UserProfileDto } from "./_dto/user.dto";


@Injectable()
export class UserService {
    constructor(
        @InjectModel('users') private readonly userModel: Model<User>
    ) { }
    
    ///Add a user
    async add_user(payload: CreateUserDto) {
        
        var doesUserExist = await this.view_user_by_email(payload.email)
        if (doesUserExist) throw new ConflictException('User Already Exists')
        
        payload.password = hashSync(payload.password, 12)
        await this.userModel.insertMany(payload)


        ////Response
        delete payload.password
        return {
            ...payload
        }
    
    }

    ////View a single User by email
    async view_user_by_email(email: string): Promise<object | null> {
        
        var user = await this.userModel.findOne({ email }).lean()
        return user
    }

}