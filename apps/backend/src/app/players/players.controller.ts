import { CreateGameDTO, Player } from '@familiada/shared-interfaces'
import { Body, Controller, Get, Param, Post } from '@nestjs/common'

import { PlayersService } from './players.service'

@Controller('/players')
export class PlayerController {
  constructor(private readonly gamesService: PlayersService) {}

  @Post('/create')
  create(@Body() player: CreateUserDTO) {
    return this.gamesService.create(player)
  }
}
