import { AuthDto } from './../src/auth/dto/auth.dto';
import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { after } from "node:test";
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum'

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService
  beforeAll(async () => {
    const moduleRef =
      await Test.createTestingModule({
        imports: [AppModule]
      }).compile()
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true
      })
    )
    await app.init()
    prisma = app.get(PrismaService)
    await prisma.cleanDb()

  }) 
  afterAll(() => {
    app.close();
  })


  describe('Auth', () => {
    describe('Signup', () => {
      it('should signup', () => {
        const dto: AuthDto = {
          email: 'nui@gmail.com',
          password: '22082001'
        }
        return pactum
          .spec()
          .post('http://localhost:3335/auth/signup',)
          .withBody(dto)
          .expectStatus(201)
          .inspect
      })
    })
    describe('Signin', () => {
      it.todo('should signin')
    })
  })

  describe('User', () => {
    describe('Get me', () => { })
    describe('Edit user', () => { })
  })

  describe('Bookmarks', () => {
    describe('Create bookmark', () => { })
    describe('Get bookmarks', () => { })
    describe('Get bookmark by id', () => { })
    describe('Edit bookmark', () => { })
    describe('Delete bookmark', () => { })
  })

})