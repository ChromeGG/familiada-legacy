import { Inject, Injectable } from '@nestjs/common'
import { randomBytes } from 'crypto'
import { GamesRepository } from './game.repository'

@Injectable()
export class GamesService {
  constructor(
    @Inject(GamesRepository) private gamesRepository: GamesRepository
  ) {}

  async createGame({ id }: { id: string }): Promise<Game> {
    let game = await this.gamesRepository.fetch(id)

    console.log(game)
    if (!game.id) {
      game = await this.gamesRepository.createAndSave({
        id,
        actualRound: 1,
      })
    }

    return game
  }

  async joinToGame() {
    const id = randomBytes(3).toString('hex')
    console.log(1123)
    // console.log(await this.defaultRedisClient.keys('hello'))
    return { id }
  }

  registerUserHit() {
    return 0
  }
}
