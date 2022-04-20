import { DeviceService } from "./device.service";
export declare class DeviceController {
    private readonly deviceService;
    constructor(deviceService: DeviceService);
    validate_qr(deviceId: string, qr: string): Promise<{
        messgae: string;
    }>;
}
