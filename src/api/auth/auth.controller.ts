import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./_dto/auth.dto";


@Controller('auth')
export class AuthController{
    constructor(
        private readonly authService: AuthService,

    ) { }
    
    ////////LOGIN
    @Post('login')
    login(
        @Body() payload: LoginDto
    ) {
        return this.authService.login(payload)
    }
}