/// <reference types="mongoose" />
export declare class User {
    name: string;
    email: string;
    password: string;
    roles: Array<string>;
    twoFactorAuth: Object;
    jwt: Array<string>;
    mobileJwt: Array<string>;
}
export declare const UserSchema: import("mongoose").Schema<import("mongoose").Document<User, any, any>, import("mongoose").Model<import("mongoose").Document<User, any, any>, any, any, any>, any, any>;
