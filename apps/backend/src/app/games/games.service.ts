import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { Injectable } from '@nestjs/common'
import { randomBytes } from 'crypto'
import { Redis } from 'ioredis'

@Injectable()
export class GamesService {
  constructor(@InjectRedis() private readonly defaultRedisClient: Redis) {}

  getData(): { message: string } {
    // TODO tutaj read game ID musi sie wykonać
    return { message: 'Welcome to backend!' }
  }

  async createGame() {
    const id = randomBytes(3).toString('hex')
    console.log(1123)
    console.log(await this.defaultRedisClient.keys('hello'))
    return { id }
  }

  registerUserHit() {
    return 0
  }
}
