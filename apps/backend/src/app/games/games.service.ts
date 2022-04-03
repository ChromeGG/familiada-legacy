import { CreateGameDTO, TeamId } from '@familiada/shared-interfaces'
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PlayersService } from '../players/players.service'
import { TeamsService } from '../teams/teams.service'
import { GamesRepository } from './games.repository'

@Injectable()
export class GamesService {
  constructor(
    @Inject(GamesRepository) private gamesRepository: GamesRepository,
    @Inject(PlayersService) private playersService: PlayersService,
    @Inject(TeamsService) private teamsService: TeamsService
  ) {}

  async create({ gameName, playerName, team }: CreateGameDTO): Promise<any> {
    await this.gamesRepository.createIndex()
    const game = await this.gamesRepository
      .search()
      .where('name')
      .equals(gameName)
      .return.first()
    await this.gamesRepository.dropIndex()

    if (game) {
      throw new ConflictException('Game already exists')
    }

    const teamRed = await this.teamsService.create({
      color: 'RED',
      gameName,
    })
    const teamBlue = await this.teamsService.create({ color: 'BLUE', gameName })

    const playerGameId = team === 'RED' ? teamRed.entityId : teamBlue.entityId
    const supervisor = await this.playersService.create({
      name: playerName,
      teamId: <TeamId>playerGameId,
    })

    return this.gamesRepository.createAndSave({
      name: gameName,
      supervisorId: supervisor.entityId,
      stage: 'LOBBY',
    })
  }

  async joinToGame() {
    // const id = randomBytes(3).toString('hex')
    // console.log(1123)
    // // console.log(await this.defaultRedisClient.keys('hello'))
    // return { id }
  }

  async findById(id: string): Promise<any> {
    await this.gamesRepository.createIndex()
    const game = await this.gamesRepository
      .search()
      .where('name')
      .equals(id)
      .return.first()
    await this.gamesRepository.dropIndex()

    if (!game) {
      throw new NotFoundException(`Game with id ${id} not found`)
    }

    return game.entityData
  }
}
