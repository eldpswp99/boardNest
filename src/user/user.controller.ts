import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete, forwardRef,
    Get, HttpCode, HttpException, Inject,
    NotFoundException,
    Param,
    Post, Req, Res, UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {UserService} from "./user.service";
import {User} from "./user.entity";
import {CreateUserDto} from "./dto/create-user-dto";
import {DeleteResult} from "typeorm";
import {AuthGuard} from "@nestjs/passport";
import {LocalAuthGuard} from "../auth/local-auth.guard";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {AuthService} from "../auth/auth.service";

@Controller('user')
export class UserController {
    constructor(
        private authService:AuthService,
        private userService: UserService) {
    }

    @Get()
    getAll(): Promise<User[]> {
        return this.userService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async getOne(@Param('id') id: number): Promise<User> {
        const user: User = await this.userService.getOne(id);
        if(!user){
            throw new NotFoundException();
        }
        return user;

    }

    @Post()
    create(@Body() userData: CreateUserDto): Promise<User> {
        return this.userService.create(userData);
    }

    @Delete('/:id')
    async remove(@Param('id') id: number): Promise<void> {
        const deleteResult: DeleteResult = await this.userService.remove(id);
        if(deleteResult.affected === 0){
            throw new HttpException('No Content',204);
        }
        else return;
    }

    @UseGuards(LocalAuthGuard)
    @HttpCode(200)
    @Post('login')
    async login(@Req() req){
        return this.authService.login(req.user);
    }

}
