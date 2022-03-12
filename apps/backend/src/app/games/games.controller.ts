import { Controller, Get } from '@nestjs/common'

import { GamesService } from './games.service'

@Controller('/games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  getData() {
    return this.gamesService.getData()
  }

  @Get('/create')
  createGame() {
    return this.gamesService.createGame()
  }
}
