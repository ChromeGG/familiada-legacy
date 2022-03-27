import { Inject, Injectable } from '@nestjs/common'
import { Client, Entity, EntityData, Schema } from 'redis-om'
import { JsonRepository } from 'redis-om/dist/repository/repository'

class Game extends Entity {}

const schema = new Schema(Game, {
  id: { type: 'string' },
  name: { type: 'string' },
  actualRound: { type: 'number' },
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
