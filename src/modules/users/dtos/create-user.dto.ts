import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { UserRoles } from "../enums";
import { IUserCreateRequest } from "../interfaces";

export class CreateUserDto implements IUserCreateRequest{

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(50)
    full_name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsEnum(UserRoles,{
        message: "Invalid User Role",
        
    })
    role : UserRoles;

    @IsOptional()
    @IsString()
    image_url: string; 
}