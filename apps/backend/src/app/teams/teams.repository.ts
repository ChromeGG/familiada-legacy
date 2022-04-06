export { Team } from '@familiada/shared-interfaces'
import { Inject, Injectable } from '@nestjs/common'
import { Client, Entity, EntityData, Schema } from 'redis-om'
import { JsonRepository } from 'redis-om/dist/repository/repository'

class Team extends Entity {}

const schema = new Schema(Team, {
  id: { type: 'string' },
  gameId: { type: 'string' },
  color: { type: 'string' },
  lastAnsweringPlayer: { type: 'string' },
  playersIds: { type: 'string[]' },
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
