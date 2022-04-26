import { Test, TestingModule } from '@nestjs/testing'
import { GamesGateway } from './games.gateway'
import { GamesRepository } from './games.repository'
import { GamesService } from './games.service'
import { StorageModule } from '../storage/storage.module'
import { PlayersModule } from '../players/players.module'
import { TeamsModule } from '../teams/teams.module'
import { INestApplication } from '@nestjs/common'

describe('GamesService', () => {
  let service: GamesService
  let app: INestApplication
  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [GamesRepository, GamesGateway, GamesService],
      imports: [StorageModule, PlayersModule, TeamsModule],
    }).compile()

    service = module.get<GamesService>(GamesService)
    app = module.createNestApplication()
    await app.init()
  })

  // it('should be defined', () => {
  //   expect(service).toBeDefined()
  // })

  describe('create', () => {
    it('should create a game', async () => {
      // console.log(process.env.NODE_ENV)
      // console.log(process.env.REDIS_PORT)
      // expect(true).toBe(true)
      // new GamesService()
      await service.create({
        gameName: 'testGameName',
        playerName: 'testPlayerNm',
        playerTeam: 'RED',
      })
    })
  })
  // it.todo('should create a game')
})
