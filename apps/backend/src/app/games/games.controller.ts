import { CreateGameDTO, Player } from '@familiada/shared-interfaces'
import { Body, Controller, Get, Param, Post } from '@nestjs/common'
// import { JoinToGameDto } from './dto/join-to-game.dto'

import { GamesService } from './games.service'

@Controller('/games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post('/create')
  createGame(@Body() game: CreateGameDTO) {
    return this.gamesService.create(game)
  }

  @Post('/join')
  joinToGame(@Body() joinToGameInput) {
    return this.gamesService.joinToGame(joinToGameInput)
  }

  @Get(':id')
  getGameById(@Param('id') id: string) {
    return this.gamesService.findById(id)
  }
}
