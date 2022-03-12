import { Test, TestingModule } from '@nestjs/testing'
import { UserGateway } from './user.gateway'
import { UserService } from './user.service'

describe('UserGateway', () => {
  let gateway: UserGateway

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGateway, UserService],
    }).compile()

    gateway = module.get<UserGateway>(UserGateway)
  })

  it('should be defined', () => {
    expect(gateway).toBeDefined()
  })
})
