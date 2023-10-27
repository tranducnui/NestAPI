// import { Module } from "@nestjs/common";
// import { MailService } from "./mail.service";
// import { MailController } from "./mail.controller";
// import { MailerModule } from "@nestjs-modules/mailer";
// import { env } from "process";

// @Module({
//     imports: [ MailerModule.forRoot({
//         transport: {
//           host: env.MAIN,
//           secure: false,
//           auth: {
//             user: env.MAIL_USER,
//             pass: env.MAIL_PASSWORD,
//           },
//         },
       
//       }),],
//     controllers: [MailController],
//     providers: [MailService],
//   })
//   export class MailModule {}