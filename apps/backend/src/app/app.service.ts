import { Injectable } from '@nestjs/common'
import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { Redis } from 'ioredis'
@Injectable()
export class AppService {
  // constructor(@InjectRedis() private readonly defaultRedisClient: Redis) {}

  getData(): { message: string } {
    return { message: 'Welcome to backend!' }
  }
}
