import { IsOptional, IsString } from "class-validator"

export class EditPlaceDto{
    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    deviceId: string
    
}