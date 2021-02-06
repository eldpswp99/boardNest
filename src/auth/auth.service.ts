import { Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {User} from "../user/user.entity";
import {JwtService} from "@nestjs/jwt";
import {jwtConstants} from "./constants";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>,
        private jwtService:JwtService,
    ) {
    }

    async validateUser(username:string,password:string){
        const user = await this.userRepository.findOne({username,})
        if(user && bcrypt.compareSync(password,user.password)){
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(user:User){
        const payload = {username:user.username,sub:user.id};
        const refreshToken:string = this.jwtService.sign(payload,{
            secret: jwtConstants.secret,
        })
        user.refreshToken = refreshToken;
        await this.userRepository.save(user);
        return {
            ...user,
            access_token : this.jwtService.sign(payload,{
                secret: jwtConstants.secret,
                expiresIn:"180s"
            }),
            refresh_token : refreshToken
        }
    }
}
