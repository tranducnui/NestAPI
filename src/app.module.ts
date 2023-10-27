import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { Module, Inject } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { ProfileModule } from './profile/profile.module';
import { StatusModule } from './status/status.module';
import { EmojiModule } from './emoji/emoji.module';
import { StatusesEmojisModule } from './statuses_emojis/statuses_emojis.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduleModuleDemo } from './scheduleDemo/scheduleDemo.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { env } from 'process';
import { RedisModule } from 'nestjs-redis';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    MailerModule.forRoot({
      transport: {
        host: env.MAIL_HOST,
        port: 587,
        secure: false,
        auth: {
          user: env.MAIL_USER,
          pass: env.MAIL_PASSWORD,
        },
      },

    }),

    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379
      }
    }),
    AuthModule,
    UserModule,
    StatusesEmojisModule,
    ProfileModule,
    StatusModule,
    EmojiModule,
    ScheduleModuleDemo,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
