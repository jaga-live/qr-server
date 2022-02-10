import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/users/user.module';



@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRoot(process.env.MONGO_URI_DEV),
    // JwtModule.register({ secret: process.env.JWT_SECRET }),

    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
  
export class AppModule {}
