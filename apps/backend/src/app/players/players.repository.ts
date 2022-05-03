import { Inject, Injectable } from '@nestjs/common'
import { Client, Entity, Schema } from 'redis-om'
import { JsonRepository } from 'redis-om/dist/repository/repository'

class Player extends Entity {}

const schema = new Schema(Player, {
  name: { type: 'string' },
  teamId: { type: 'string' },
})

@Injectable()
export class PlayersRepository extends JsonRepository<Player> {
  constructor(@Inject('STORAGE_CONNECTION') client: Client) {
    super(schema, client)
  }
}
