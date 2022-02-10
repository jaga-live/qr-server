import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { Types } from "mongoose";
import { Roles } from "../auth/decorators/roles.decorator";
import { Role } from "../auth/enum/role.enum";
import { JwtGuard } from "../auth/guards/jwt.guard";
import { RolesGuard } from "../auth/guards/role.guard";
import { UserService } from "./user.service";
import { CreateUserDto, EditUserDto } from "./_dto/user.dto";


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


    ////View All Users by role
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Get(':role')
    viewAllUsers(
        @Param('role') role: string
    ) {
        return this.userService.view_all_users(role)
    }



///////EDIT
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Patch(':userId')
    async edit_user(
        @Param('userId') userId: Types.ObjectId,
        @Body() payload: EditUserDto
    ) {

        return this.userService.edit_user(userId, payload )
    }    


//////DELETE
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Delete(':userId')
    async delete_user(
        @Param('userId') userId: Types.ObjectId,
    ) {

        return this.userService.delete_user(userId)
    }    

 }
