import { Controller, Get, Param } from '@nestjs/common'

import { GamesService } from './games.service'

@Controller('/games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get(':id')
  getData(@Param('id') id: string) {
    console.log('~ id', id)
    return this.gamesService.getData({ id })
  }

  @Get('/create')
  createGame() {
    return this.gamesService.createGame()
  }
}
