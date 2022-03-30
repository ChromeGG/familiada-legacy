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

class Team extends Entity {}

const schema = new Schema(Team, {
  id: { type: 'string' },
  gameId: { type: 'string' },
  color: { type: 'string' },
  lastAnsweringPlayer: { type: 'string' },
  playersOrder: { type: 'string[]' },
})

@Injectable()
export class TeamsRepository extends JsonRepository<Team> {
  constructor(@Inject('STORAGE_CONNECTION') client: Client) {
    super(schema, client)
  }

  // protected async writeEntity(key: string, data: EntityData): Promise<void> {
  //   const { id } = data
  //   await this.client.jsonset(`Player:${id}`, data)
  // }
}
