import { PrismaModule } from './../prisma/prisma.module';
import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy";
import { env } from "process";

@Module({
    imports: [
        PrismaModule,
        JwtModule.register({
            secret: env.JWT_SECRET,
            signOptions: { expiresIn: '15m' }
        })],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule { }