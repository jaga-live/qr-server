import { UserService } from "../users/user.service";
import { AuthService } from "./auth.service";
import { LoginDto } from "./_dto/auth.dto";
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    login(payload: LoginDto): Promise<{
        _id: any;
        token: string;
        roles: any;
        totp_secret: any;
    }>;
    checkAuthStatus(req: any): Promise<any>;
    logout(): Promise<void>;
}
