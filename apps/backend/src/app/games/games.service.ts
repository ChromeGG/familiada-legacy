import { CreateGameDTO, PlayerId, TeamId } from '@familiada/shared-interfaces'
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

  async create({
    gameName,
    playerName,
    playerTeam,
  }: CreateGameDTO): Promise<any> {
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

    const newGame = this.gamesRepository.createEntity()

    const teamRed = await this.teamsService.create({
      color: 'RED',
      gameId: newGame.entityId,
      playersIds: [],
    })

    const teamBlue = await this.teamsService.create({
      color: 'BLUE',
      gameId: newGame.entityId,
      playersIds: [],
    })

    const playerGameId =
      playerTeam === 'RED' ? teamRed.entityId : teamBlue.entityId
    const supervisor = await this.playersService.create({
      name: playerName,
      teamId: <TeamId>playerGameId,
    })

    if (playerTeam === 'RED') {
      this.teamsService.joinToTeam(teamRed.entityId, supervisor.entityId)
    } else {
      this.teamsService.joinToTeam(teamBlue.entityId, supervisor.entityId)
    }

    newGame.name = gameName
    newGame.teamRedId = <TeamId>teamRed.entityId
    newGame.teamBlueId = <TeamId>teamBlue.entityId
    newGame.supervisorId = <PlayerId>supervisor.entityId
    newGame.status = 'LOBBY'

    return this.gamesRepository.save(newGame)
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
