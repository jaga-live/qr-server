import { Model, Types } from "mongoose";
import { User } from "./model/user.model";
import { CreateUserDto, EditUserDto } from "./_dto/user.dto";
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    add_user(payload: CreateUserDto): Promise<{
        name: string;
        email: string;
        password: string;
        role: string;
        roles: [string];
        twoFactorAuth: any;
    }>;
    user_profile(userId: Types.ObjectId): Promise<import("mongoose").Document<unknown, any, User> & User & {
        _id: Types.ObjectId;
    }>;
    view_user_by_email(email: string): Promise<object | null>;
    view_user_by_id(_id: Types.ObjectId): Promise<object | null>;
    view_all_users(role: string): Promise<Array<any>>;
    edit_user(userId: Types.ObjectId, payload: EditUserDto): Promise<{
        name: string;
        _id: Types.ObjectId;
    }>;
    delete_user(userId: Types.ObjectId): Promise<{
        _id: Types.ObjectId;
    }>;
}
