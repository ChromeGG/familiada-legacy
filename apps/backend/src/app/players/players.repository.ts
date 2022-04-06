import { Inject, Injectable } from '@nestjs/common'
import { Client, Entity, EntityData, Schema } from 'redis-om'
import { JsonRepository } from 'redis-om/dist/repository/repository'

// interface Game {
//   id: string
//   actualRound: number
//   answeringUserId: string
//   canHitAnswer: [string, string]
//   status: 'LOBBY' | 'RUNNING' | 'FINISHED'
// }

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

  // protected async writeEntity(key: string, data: EntityData): Promise<void> {
  //   const { id } = data
  //   await this.client.jsonset(`Player:${id}`, data)
  // }
}
