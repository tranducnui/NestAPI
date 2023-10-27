// import { MailerService } from "@nestjs-modules/mailer";
// import { Injectable } from "@nestjs/common";
// import { env } from "process";
// import { AuthDto } from "src/auth/dto";

// @Injectable()
// export class MailService {
//         constructor(
//             private mailerService: MailerService
//         ){}

//     async sendMail(email: string){
//         await this.mailerService.sendMail({
//             from:env.MAIL_FROM,
//             to: email,
//             subject:'Welcome',
//             template:'./queue',
//             text:'Hello'
//            })
//     }
// }