import { Module } from "@nestjs/common";
import { UserModule } from "../users/user.module";
import { DeviceController } from "./device.controller";
import { DeviceService } from "./device.service";


@Module({
    imports: [ UserModule ],
    controllers: [ DeviceController],
    providers: [ DeviceService]
})
export class DeviceModule{

}