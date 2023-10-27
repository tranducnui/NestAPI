import { AuthDto } from './../src/auth/dto/auth.dto';
import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { after } from "node:test";
import * as pactum from 'pactum'

const PORT = 3332
describe('Test E2E hehe', () => {
  let app: INestApplication;
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
    await app.listen(PORT)
    

  }) 
  afterAll(() => {
    app.close();
  })
  it.todo('hi,hello')

  // describe('Auth', () => {
  //   describe('Signup', () => {
  //     it('should signup', () => {
  //       const dto: AuthDto = {
  //         email: 'nui@gmail.com',
  //         password: '22082001'
  //       }
  //       return pactum
  //         .spec()
  //         .post('http://localhost:3335/auth/signup',)
  //         .withBody(dto)
  //         .expectStatus(201)
  //         .inspect
  //     })
  //   })
  //   describe('Signin', () => {
  //     it.todo('should signin')
  //   })
  // })

  // describe('User', () => {
  //   describe('Get me', () => { })
  //   describe('Edit user', () => { })
  // })

  // describe('Bookmarks', () => {
  //   describe('Create bookmark', () => { })
  //   describe('Get bookmarks', () => { })
  //   describe('Get bookmark by id', () => { })
  //   describe('Edit bookmark', () => { })
  //   describe('Delete bookmark', () => { })
  // })

})