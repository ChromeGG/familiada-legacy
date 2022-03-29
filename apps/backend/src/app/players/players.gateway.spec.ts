import { Test, TestingModule } from '@nestjs/testing'
import { PlayersGateway } from './players.gateway'
import { PlayersService } from './players.service'

describe('PlayerGateway', () => {
  let gateway: PlayersGateway

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayersGateway, PlayersService],
    }).compile()

    gateway = module.get<PlayersGateway>(PlayersGateway)
  })

  it('should be defined', () => {
    expect(gateway).toBeDefined()
  })
})
