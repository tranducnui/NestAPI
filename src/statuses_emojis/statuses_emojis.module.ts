import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StatusesEmojisService } from "./statuses_emojis.service";
import { Statuses_Emojis } from "./entities/statuses_emojis.entity";
import { StatusesEmojisController } from "./statuses_emojis.controller";
import { EmojiService } from "src/emoji";
import { StatusService } from "src/status/status.service";
import { Emoji } from "src/emoji/entities/emoji.entity";
import { Status } from "src/status/entities/status.entity";
import { User } from "src/user/entities/user.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Statuses_Emojis, Emoji, Status,User]),
    ],
    controllers: [StatusesEmojisController],

    providers: [StatusesEmojisService,
        EmojiService,
        StatusService,
        Statuses_Emojis,Status
        ],
})
export class StatusesEmojisModule { }