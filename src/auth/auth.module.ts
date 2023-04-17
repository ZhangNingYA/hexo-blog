import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {JwtModule} from '@nestjs/jwt';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../user/entities/user.entity";
import {UserModule} from "../user/user.module";
import {LocalStrategy} from "./local.strategy";
import {PassportModule} from "@nestjs/passport";
import { jwtConstants } from "./constant";
import {JwtStrategy} from "./jwt.strategy";

@Module({
    imports: [TypeOrmModule.forFeature([User]),
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '6000s' },
        }),
        ],
  controllers: [AuthController],
  providers: [LocalStrategy, AuthService, JwtStrategy],
    exports:  [AuthService],
})
export class AuthModule {}
