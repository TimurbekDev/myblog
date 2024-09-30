import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { IArticleUpdateRequest } from "../interfaces";

export class UpdateArticleDto implements IArticleUpdateRequest{

    @IsOptional()
    @IsString()
    @MinLength(4)
    @MaxLength(200)
    title: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    image_url: string;
}