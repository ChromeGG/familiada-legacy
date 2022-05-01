import { CreateGameDTO } from '@familiada/shared-interfaces'
import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common'
import { JoiValidationPipe } from '../validation.pipe'
import { createGameDto } from './dto/create-game.dto'
import { JoinToGameDto } from './dto/join-to-game.dto'

import { GamesService } from './games.service'

@Controller('/games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post('/create')
  @UsePipes(new JoiValidationPipe(createGameDto))
  createGame(@Body() game: CreateGameDTO) {
    return this.gamesService.create(game)
  }

  @Post('/join')
  joinToGame(@Body() joinToGameInput: JoinToGameDto) {
    // @ts-ignore
    return this.gamesService.joinToGame(joinToGameInput)
  }

  @Get(':id')
  getGameById(@Param('id') id: string) {
    return this.gamesService.findById(id)
  }
}
