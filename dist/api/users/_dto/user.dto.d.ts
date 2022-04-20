import { Types } from "mongoose";
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    role: string;
    roles: [string];
    twoFactorAuth: any;
}
export declare class UserProfileDto {
    _id: Types.ObjectId;
    name: string;
    email: string;
}
export declare class EditUserDto {
    name: string;
}
