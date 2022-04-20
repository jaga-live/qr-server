import { Strategy } from 'passport-jwt';
import { Model } from 'mongoose';
import { User } from 'src/api/users/model/user.model';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userModel;
    constructor(userModel: Model<User>);
    validate(payload: any): Promise<any>;
}
export {};
