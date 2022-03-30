import { CreateGameDTO, TeamColor } from '@familiada/shared-interfaces'
import { ConflictException, Inject, Injectable } from '@nestjs/common'
import { randomBytes } from 'crypto'
import { PlayersService } from '../players/players.service'
import { TeamsService } from '../teams/teams.service'
import { GamesRepository, Game } from './games.repository'

@Injectable()
export class GamesService {
  constructor(
    @Inject(GamesRepository) private gamesRepository: GamesRepository,
    @Inject(PlayersService) private playersService: PlayersService,
    @Inject(TeamsService) private teamsService: TeamsService
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

    const teamRed = await this.teamsService.create({
      color: 'RED',
      gameId,
    })
    console.log('~ teamRed', teamRed)
    const teamBlue = await this.teamsService.create({ color: 'BLUE', gameId })
    console.log('~ teamBlue', teamBlue)

    const asd = await this.playersService.create({ name: playerName, team })

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
