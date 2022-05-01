import { CreateGameDTO } from '@familiada/shared-interfaces'
import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common'
import { JoiValidationPipe } from '../validation.pipe'
import { createGameSchema } from './dto/create-game.dto'
import { JoinToGameDto, joinToGameSchema } from './dto/join-to-game.dto'

import { GamesService } from './games.service'

@Controller('/games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post('/create')
  @UsePipes(new JoiValidationPipe(createGameSchema))
  createGame(@Body() game: CreateGameDTO) {
    return this.gamesService.create(game)
  }

  @Post('/join')
  @UsePipes(new JoiValidationPipe(joinToGameSchema))
  joinToGame(@Body() joinToGameInput: JoinToGameDto) {
    // @ts-ignore
    return this.gamesService.joinToGame(joinToGameInput)
  }

  @Get(':id')
  getGameById(@Param('id') id: string) {
    console.log('~ id', id)
    return this.gamesService.findById(id)
  }
}
