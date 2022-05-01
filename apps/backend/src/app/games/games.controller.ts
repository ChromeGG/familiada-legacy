import { CreateGameDTO, JoinToGameDTO } from '@familiada/shared-interfaces'
import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common'
import { JoiValidationPipe } from '../validation.pipe'
import { createGameSchema } from './dto/create-game.dto'
import { joinToGameSchema } from './dto/join-to-game.dto'

import { GamesService } from './games.service'

@Controller('/games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post('/create')
  @UsePipes(new JoiValidationPipe(createGameSchema))
  async createGame(@Body() game: CreateGameDTO) {
    return this.gamesService.create(game)
  }

  @Post('/join')
  @UsePipes(new JoiValidationPipe(joinToGameSchema))
  async joinToGame(@Body() joinToGameInput: JoinToGameDTO) {
    return this.gamesService.joinToGame(joinToGameInput)
  }

  @Get(':id')
  async getGameById(@Param('id') id: string) {
    return this.gamesService.findById(id)
  }
}
