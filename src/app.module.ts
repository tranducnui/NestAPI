import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis:{
        host: 'localhost',
        port: 6379
      }
    }),
    AuthModule,
    UserModule,
    BookmarkModule,
    PrismaModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
