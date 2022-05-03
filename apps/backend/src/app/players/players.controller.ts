import { Player, PlayerId } from '@familiada/shared-interfaces'
import { Controller, Get, Param } from '@nestjs/common'

import { PlayersService } from './players.service'

@Controller('/players')
export class PlayerController {
  constructor(private readonly playersService: PlayersService) {}

  @Get(':id')
  async get(@Param('id') id: PlayerId): Promise<Player> {
    return this.playersService.findById(id)
  }
}
