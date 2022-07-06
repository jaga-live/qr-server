import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PlaceModule } from "../places/places.module";
import { ScanLogsSchema } from "../log/models/scan_log.model";
import { ScanLogsService } from "../log/scan_log/logs.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'scan_logs', schema: ScanLogsSchema }]),
        PlaceModule
    ],
    controllers: [],
    providers: [ScanLogsService],
    exports: [ScanLogsService]

})
export class LogsModule { }
