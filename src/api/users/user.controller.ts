import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { Roles } from "../auth/decorators/roles.decorator";
import { Role } from "../auth/enum/role.enum";
import { JwtGuard } from "../auth/guards/jwt.guard";
import { RolesGuard } from "../auth/guards/role.guard";
import { UserService } from "./user.service";
import { CreateUserDto } from "./_dto/user.dto";


@Controller('user')
export class UserController{
    constructor(
        private readonly userService: UserService
    ) { }
    

/////CREATE
    ///////Add User
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Post()
    async addUser(
        @Body() data: CreateUserDto
    ) {

        return this.userService.add_user(data)
        
    }



///////VIEW
    ///user Profile
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN, Role.EMPLOYEE)
    @Get('profile')
    async profile(
        @Req() req: any
    ) {
        return this.userService.user_profile(req.user._id)
    }


 }
