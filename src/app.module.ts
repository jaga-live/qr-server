import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { LogsModule } from 'src/api/logs/logs.module';
import { AuthModule } from './api/auth/auth.module';
import { DeviceModule } from './api/device/device.module';
import { PlaceModule } from './api/places/places.module';
import { UserModule } from './api/users/user.module';
import { AppController } from './app.controller';



@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRoot(process.env.MONGO_URI_DEV),
    // JwtModule.register({ secret: process.env.JWT_SECRET }),

    UserModule,
    AuthModule,
    DeviceModule,
    PlaceModule,
    LogsModule
  ],
  controllers: [ AppController],
  providers: [],
})
  
export class AppModule {}
