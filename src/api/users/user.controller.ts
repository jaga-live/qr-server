import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./_dto/user.dto";


@Controller('user')
export class UserController{
    constructor(
        private readonly userService: UserService
    ) { }
    

    ///////Add User
    @Post()
    async addUser(
        @Body() data: CreateUserDto
    ) {

        return this.userService.add_user(data)
        
    }


 }
