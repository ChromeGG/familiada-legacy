import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { Inject, Injectable } from '@nestjs/common'
import { randomBytes } from 'crypto'
import { Redis } from 'ioredis'
import { Client, Entity, Schema } from 'redis-om'

@Injectable()
class Player extends Entity {}
export class GamesService {
  // constructor(@InjectRedis() private readonly defaultRedisClient: Redis) {}
  constructor(@Inject('STORAGE_CONNECTION') private client: Client) {}

  async getData(): Promise<{ message: string }> {
    // TODO tutaj read game ID musi sie wykonać
    // this.db.
    const schema = new Schema(Player, {
      id: { type: 'string' },
      name: { type: 'string' },
      teamId: { type: 'number' },
    })

    const playerRepo = this.client.fetchRepository(schema)
    await playerRepo.createAndSave({
      id: '1',
      name: 'test',
      teamId: 1,
    })
    return { message: 'Welcome to backend!' }
  }

  async createGame() {
    const id = randomBytes(3).toString('hex')
    console.log(1123)
    // console.log(await this.defaultRedisClient.keys('hello'))
    return { id }
  }

  registerUserHit() {
    return 0
  }
}
