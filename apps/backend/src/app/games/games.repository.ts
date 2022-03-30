import { Inject, Injectable } from '@nestjs/common'
import { Client, Entity, EntityData, Schema } from 'redis-om'
import { JsonRepository } from 'redis-om/dist/repository/repository'
import { Game as GameI } from '@familiada/shared-interfaces'

// interface Game {
//   id: string
//   actualRound: number
//   answeringUserId: string
//   canHitAnswer: [string, string]
//   status: 'LOBBY' | 'RUNNING' | 'FINISHED'
// }

export class Game extends Entity {}

const schema = new Schema(Game, {
  id: { type: 'string' },
  actualRound: { type: 'number' },
  supervisorId: { type: 'string' },
  answeringUserId: { type: 'string' },
  canHitAnswer: { type: 'string[]' },
  stage: { type: 'string' },
})

@Injectable()
export class GamesRepository extends JsonRepository<Game> {
  constructor(@Inject('STORAGE_CONNECTION') client: Client) {
    super(schema, client)
  }

  protected async writeEntity(key: string, data: EntityData): Promise<void> {
    const { id } = data
    await this.client.jsonset(`Game:${id}`, data)
  }
}
