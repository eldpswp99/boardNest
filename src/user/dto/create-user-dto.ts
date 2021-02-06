import {IsBoolean, IsOptional, IsString} from "class-validator";

export class CreateUserDto{
    @IsString()
    readonly username:string;

    @IsString()
    readonly password:string;

    @IsString()
    readonly firstName:string;

    @IsString()
    readonly lastName:string;

    @IsBoolean()
    @IsOptional()
    readonly isActive:boolean;
}