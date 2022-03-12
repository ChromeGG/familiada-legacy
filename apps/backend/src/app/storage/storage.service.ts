import { Injectable } from '@nestjs/common'
// import { RedisService } from 'nestjs-redis'

@Injectable()
export class StorageService {
  constructor(private readonly redisService: any) {}
  async root(): Promise<boolean> {
    // const client = await this.redisService.getClient('test')
    return true
  }
}
