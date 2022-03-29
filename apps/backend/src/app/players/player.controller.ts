import { CreateGameDTO, Player } from '@familiada/shared-interfaces'
import { Body, Controller, Get, Param, Post } from '@nestjs/common'

import { PlayerService } from './player.service'

@Controller('/players')
export class PlayerController {
  constructor(private readonly gamesService: PlayerService) {}

  @Post('/create')
  createGame(@Body() player: CreateGameDTO) {
    return this.gamesService.create(player)
  }

  // @Post(':id')
  // joinToGame(@Param('id') gameId: string, player: Player) {
  //   return 0
  //   // return this.gamesService.joinToGame({ id: gameId })
  // }
}
