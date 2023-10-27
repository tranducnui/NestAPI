// import { PrismaModule } from './../prisma/prisma.module';
import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
// import { JwtStrategy } from "./strategy";
import { env } from "process";
import { MAILER_OPTIONS, MailerModule, MailerService } from '@nestjs-modules/mailer';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { AppModule } from "src/app.module";
import { AppService } from "src/app.service";
import { BullModule } from "@nestjs/bull";
import { EmailConsumer } from "src/queue/email.consumer";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({}),
        BullModule.registerQueue({
            name:'send-mail'
          })
       ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, AppService,EmailConsumer]
       
})
export class AuthModule { }