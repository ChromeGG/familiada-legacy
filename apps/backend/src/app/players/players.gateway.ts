import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets'
import { PlayersService } from './players.service'
import { CreatePlayerDto } from './dto/create-player.dto'
import { UpdatePlayerDto } from './dto/update-player.dto'

@WebSocketGateway()
export class PlayersGateway {
  constructor(private readonly playerService: PlayersService) {}

  // @SubscribeMessage('createPlayer')
  // create(@MessageBody() createPlayerDto: CreatePlayerDto) {
  //   return this.playerService.create(createPlayerDto)
  // }

  // @SubscribeMessage('findOnePlayer')
  // findOne(@MessageBody() id: number) {
  //   return this.playerService.findById(id)
  // }

  // @SubscribeMessage('updatePlayer')
  // update(@MessageBody() updatePlayerDto: UpdatePlayerDto) {
  //   return this.playerService.update(updatePlayerDto.id, updatePlayerDto)
  // }
}
