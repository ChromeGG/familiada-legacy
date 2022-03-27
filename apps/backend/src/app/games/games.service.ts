import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { Inject, Injectable } from '@nestjs/common'
import { randomBytes } from 'crypto'
import { GamesRepository } from './game.repository'

@Injectable()
export class GamesService {
  constructor(
    @Inject(GamesRepository) private gamesRepository: GamesRepository
  ) {}

  async getData({ id }: { id: string }): Promise<{ id: string }> {
    // TODO tutaj read game ID musi sie wykonać
    console.log('~ id', id)
    const game = await this.gamesRepository.createAndSave({
      id,
      name: 'test',
      actualRound: 1,
    })
    console.log('~ game', game)
    return { id: 'Welcome to backend!' }
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
