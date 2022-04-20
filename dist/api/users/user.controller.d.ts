import { Types } from "mongoose";
import { UserService } from "./user.service";
import { CreateUserDto, EditUserDto } from "./_dto/user.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    addUser(data: CreateUserDto): Promise<{
        name: string;
        email: string;
        password: string;
        role: string;
        roles: [string];
        twoFactorAuth: any;
    }>;
    profile(req: any): Promise<import("mongoose").Document<unknown, any, import("./model/user.model").User> & import("./model/user.model").User & {
        _id: Types.ObjectId;
    }>;
    viewAllUsers(role: string): Promise<any[]>;
    edit_user(userId: Types.ObjectId, payload: EditUserDto): Promise<{
        name: string;
        _id: Types.ObjectId;
    }>;
    delete_user(userId: Types.ObjectId): Promise<{
        _id: Types.ObjectId;
    }>;
    verify(req: any, token: string): Promise<void>;
}
