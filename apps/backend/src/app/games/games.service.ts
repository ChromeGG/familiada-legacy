import { CreateGameDTO } from '@familiada/shared-interfaces'
import { ConflictException, Inject, Injectable } from '@nestjs/common'
import { randomBytes } from 'crypto'
import { GamesRepository, Game } from './game.repository'

@Injectable()
export class GamesService {
  constructor(
    @Inject(GamesRepository) private gamesRepository: GamesRepository
  ) {}

  async create({ gameId, playerName, team }: CreateGameDTO): Promise<Game> {
    await this.gamesRepository.createIndex()
    const game = await this.gamesRepository
      .search()
      .where('id')
      .equals(gameId)
      .return.first()
    await this.gamesRepository.dropIndex()
    if (game) {
      throw new ConflictException('Game already exists')
    }

    return this.gamesRepository.createAndSave({
      id: gameId,
      supervisorId: '',
      stage: 'LOBBY',
    })
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
