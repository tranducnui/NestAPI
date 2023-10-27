// import { PrismaService } from './../../prisma/prisma.service';
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from '@nestjs/config';
import { env } from "process";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";


@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    'jwt',
)
{
    constructor(
        config: ConfigService,
        @InjectRepository(User)
        private userRepository: Repository<User>) {
        super({
            jwtFromRequest:
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: env.JWT_SECRET

        })
    }
    async validate(payload: {
        sub: number;
        email: string
    }) {
       
        const user =await this.userRepository.findOne({where: {id: payload.sub}})

        delete user.hash;
        return user
    }
}