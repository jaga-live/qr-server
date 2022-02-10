
import { Exclude } from "class-transformer"
import {IsNotEmpty, IsString, IsEmail, IsOptional, IsArray} from "class-validator"
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

    @IsNotEmpty()
    @IsString()
    role: string

    @IsOptional()
    @IsArray()
    roles: [string]

}



///////VIEW
export class UserProfileDto{

    _id: Types.ObjectId

    name: string

    email: string

}


/////PATCH
export class EditUserDto{

    @IsOptional()
    @IsString()
    name: string

}