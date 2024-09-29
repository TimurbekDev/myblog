import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('users')
export class UserController {
    constructor(private readonly usersService: UserService) { }

    @Post()
    @UseInterceptors(FileInterceptor('image_url'))
    async createUser(
        @Body(new ValidationPipe()) createUserDto: CreateUserDto,
        @UploadedFile() file:Express.Multer.File
    ) {
        if(file)
            createUserDto.image_url = file.filename
        return await this.usersService.createUser(createUserDto);
    }

    @Get()
    async getAllUsers() {
        return await this.usersService.findAll()
    }

    @Get('/:userId')
    async getUserById(@Param('userId') id: number) {
        return await this.usersService.findById(id)
    }

    @Patch('/:userId')
    @UseInterceptors(FileInterceptor('image_url'))
    async updateUserById(
        @Param('userId') id: number, 
        @Body(new ValidationPipe) updateUserDto: UpdateUserDto,
        @UploadedFile() file : Express.Multer.File
    ) {
        if(file)
            updateUserDto.image_url = file.filename
        return await this.usersService.updateById(id, updateUserDto)
    }

    @Delete('/:userId')
    async deleteUserById(@Param('userId') id: number) {
        return await this.usersService.deleteById(id)
    }
}