// import { PrismaService } from './../prisma/prisma.service';
import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { env } from 'process';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { IsEmail } from 'class-validator';
import { MailerService, MailerModule } from '@nestjs-modules/mailer';
import { AuthDto } from './dto/auth.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';


@Injectable({})
export class AuthService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwt: JwtService,
        private config: ConfigService,
        private mailerService: MailerService
        // @InjectQueue('send-mail')
        // private sendMail: Queue
    ) { }


    async signup(dto: AuthDto) {


        const { email, password } = dto;

        const exitUser = await this.userRepository.findOne({ where: { email } })
        if (exitUser) {
            throw new ConflictException('Email already exit')
        }

        const hash = await argon.hash(dto.password);
        const user = this.userRepository.create({ email, hash })

    
        await this.mailerService.sendMail({
            to: dto.email,
            from: env.MAIL_FROM,
            context: {},
            subject: 'Welcome',
            text: 'Hello'
        })

        return this.userRepository.save(user)

    }

    async signin(dto: AuthDto) {

        const user = await this.userRepository.findOne({ where: { email: dto.email } })

        if (!user) throw new ConflictException('Incorrect information');


        //compare password
        const pwMatches = await argon.verify(
            user.hash,
            dto.password)

        if (!pwMatches)
            throw new ConflictException('Incorrect information');

        return this.signToken(user.id, user.email)
    }



    async signToken(
        userId: number,
        email: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email
        }

        const secret = env.JWT_SECRET

        const token = await this.jwt.signAsync(payload,
            {
                expiresIn: '15m',
                secret: secret
            });

        return {
            access_token: token,
        };
    }
}

