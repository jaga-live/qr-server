import { IsNotEmpty, IsString } from "class-validator";

export class CreatePlaceDto{
    @IsNotEmpty()
    @IsString()
    name: string
}