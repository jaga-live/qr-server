import { JwtService } from "@nestjs/jwt";
import { Model, Types } from "mongoose";
import { User } from "../users/model/user.model";
import { UserService } from "../users/user.service";
export declare class AuthService {
    private readonly userModel;
    private readonly jwtService;
    private readonly userService;
    constructor(userModel: Model<User>, jwtService: JwtService, userService: UserService);
    login(payload: any): Promise<{
        _id: any;
        token: string;
        roles: any;
        totp_secret: any;
    }>;
    logout(userData: any): Promise<void>;
    verify_totp_user(userId: Types.ObjectId, token: string): Promise<boolean>;
}
