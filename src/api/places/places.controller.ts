import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { Types } from "mongoose";
import { Roles } from "../auth/decorators/roles.decorator";
import { Role } from "../auth/enum/role.enum";
import { JwtGuard } from "../auth/guards/jwt.guard";
import { RolesGuard } from "../auth/guards/role.guard";
import { PlaceService } from "./places.service";
import { CreatePlaceDto } from "./_dto/create.place";
import { EditPlaceDto } from "./_dto/edit.place";

@Controller('place')
export class PlaceController{
    constructor(
        private readonly placeService: PlaceService
    ) { }
    

///////CREATE
    /////Add Place
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Post()
    async addPlace(
        @Body() data: CreatePlaceDto
    ) {
        return this.placeService.add_place(data)
    }


///////VIEW
    /////View all Places
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Get()
    async viewPlace() {
        return this.placeService.view_all_users()
    }


//////PATCH
    ////Edit a Place
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Patch(':placeId')
    async editPlace(
        @Param('placeId') placeId: Types.ObjectId,
        @Body() data: EditPlaceDto
    ) {
        return this.placeService.edit_place(new Types.ObjectId(placeId), data)
    }


/////DELETE
    ////Delete a place
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Delete(':placeId')
    async deletePlace(
        @Param('placeId') placeId: Types.ObjectId
    ) {
        return this.placeService.delete_place(new Types.ObjectId(placeId))
        
    }
}