import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class User{
    @Prop()
    name: string

    @Prop()
    email: string

    @Prop()
    password: string

    @Prop({type: Object})
    twoFactorAuth: Object

    @Prop()
    jwt: Array<string>

    @Prop()
    mobileJwt: Array<string>

}


export const UserSchema = SchemaFactory.createForClass(User)