import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { hashSync } from "bcrypt";
import { classToPlain } from "class-transformer";
import { Model, Types } from "mongoose";
import { User } from "./model/user.model";
import { CreateUserDto, EditUserDto, UserProfileDto } from "./_dto/user.dto";


@Injectable()
export class UserService {
    constructor(
        @InjectModel('users') private readonly userModel: Model<User>
    ) { }

    
////CREATE
    ///Add a user
    async add_user(payload: CreateUserDto) {
        
        var doesUserExist = await this.view_user_by_email(payload.email)
        if (doesUserExist) throw new ConflictException('User Already Exists')
        
        payload.password = hashSync(payload.password, 12)
        payload.roles = [payload.role]

        await this.userModel.insertMany(payload)


        ////Response Data
        delete payload.password
        return {
            ...payload
        }
    
    }



///////VIEW
    /////User Profile
    async user_profile(userId: Types.ObjectId) {

        var user = await this.userModel.findOne({ _id: userId }, {
            password: 0,
            jwt: 0,
            mobileJwt: 0,
            twofactorAuth: 0
        })
        return user
    }

    ////View a single User by email
    async view_user_by_email(email: string): Promise<object | null> {
        
        var user = await this.userModel.findOne({ email }).lean()
        return user
    }

    ////View a single User by _id
    async view_user_by_id(_id: Types.ObjectId): Promise<object | null> {
        
        var user = await this.userModel.findOne({ _id }).lean()
        return user
    }


    //////View All Users ny Role
    async view_all_users(role: string): Promise<Array<any>> {

        var user = await this.userModel.find({ roles: role }, {
            password: 0,
            jwt: 0,
            mobileJwt: 0,
            twofactorAuth: 0
        })
        return user
    }



//////PATCH
    async edit_user(userId: Types.ObjectId, payload: EditUserDto) {

        var isUserValid = await this.view_user_by_id(userId)
        if (!isUserValid) throw new BadRequestException('User Not Found')
        
        await this.userModel.updateOne({ _id: userId }, {
            $set: payload
        })

        return {
            _id: userId,
            ...payload
        }
        
    }



///////DELETE
    ////Delete User
    async delete_user(userId: Types.ObjectId) {

        var isUserValid = await this.view_user_by_id(userId)
        if (!isUserValid) throw new BadRequestException('User Not Found')

        await this.userModel.deleteOne({ _id: userId })
        
        return {
            _id: userId
        }
    }

}