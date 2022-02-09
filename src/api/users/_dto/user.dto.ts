
import { Exclude } from "class-transformer"
import {IsNotEmpty, IsString, IsEmail} from "class-validator"
import { Types } from "mongoose"



/////CREATE
export class CreateUserDto{

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string

}



///////VIEW
export class UserProfileDto{

    _id: Types.ObjectId

    name: string

    email: string

}