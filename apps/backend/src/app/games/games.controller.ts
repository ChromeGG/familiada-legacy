import { Player } from '@familiada/shared-interfaces'
import { Body, Controller, Get, Param, Post } from '@nestjs/common'

import { GamesService } from './games.service'

@Controller('/games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post(':id')
  joinToGame(@Param('id') gameId: string, player: Player) {
    return 0
    // return this.gamesService.joinToGame({ id: gameId })
  }

  @Post('/create')
  createGame(@Body() game: Game) {
    return this.gamesService.createGame(game)
  }
}
