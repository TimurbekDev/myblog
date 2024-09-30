import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { IArticleCreateRequest } from "../interfaces";

export class CreateArticleDto implements IArticleCreateRequest{

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(200)
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    image_url: string;

    @IsNotEmpty()
    @IsNumber()
    user_id: number;
}