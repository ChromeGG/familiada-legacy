// import { Test, TestingModule } from '@nestjs/testing'
// import { GamesService } from './games.service'

describe('GamesService', () => {
  // let service: GamesService

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [GamesService],
  //   }).compile()

  //   service = module.get<GamesService>(GamesService)
  // })

  // it('should be defined', () => {
  //   expect(service).toBeDefined()
  // })

  describe('create', () => {
    it('should create a game', () => {
      console.log(process.env.NODE_ENV)
      console.log(process.env.REDIS_PORT)
      // ! NEXT: sprawdzić jak to odpalić
      expect(true).toBe(true)
    })
  })
  // it.todo('should create a game')
})
