import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { UserService } from "../users/user.service";
import { AuthService } from "./auth.service";
import { JwtGuard } from "./guards/jwt.guard";
import { LoginDto } from "./_dto/auth.dto";


@Controller('auth')
export class AuthController{
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService

    ) { }
    
    ////////LOGIN
    @Post('login')
    login(
        @Body() payload: LoginDto
    ) {
        return this.authService.login(payload)
    }



  ///////Check Auth status
  @UseGuards(JwtGuard)
  @Get('refresh')
  async checkAuthStatus(@Req() req: any) {
    const { _id } = req.user
      var userData: any= await this.userService.view_user_by_id(_id)
      userData.role = userData.roles[0]
    return userData
  }





  ///////////TOTP (Time Based One-time Password)
  


}