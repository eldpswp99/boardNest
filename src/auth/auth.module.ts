import {forwardRef, Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./local.strategy";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./jwt.strategy";
import {UserModule} from "../user/user.module";

@Module({
    imports: [
        forwardRef(() => UserModule),
        PassportModule,
        JwtModule.register({}),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService,]
})
export class AuthModule {
}
