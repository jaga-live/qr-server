import { UserService } from "../users/user.service";
import { ScanLogsService } from "../logs/scan_log/logs.service";
export declare class DeviceService {
    private readonly userService;
    private readonly scanlogService;
    constructor(userService: UserService, scanlogService: ScanLogsService);
    validate_qr(qr: string, deviceId: string): Promise<{
        messgae: string;
    }>;
}
