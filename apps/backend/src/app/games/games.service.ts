import {
  ClientToServerEvents,
  CreateGameDTO,
  Game,
  Player,
  PlayerId,
  ServerToClientEvents,
  TeamId,
} from '@familiada/shared-interfaces'
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'
import { PlayersService } from '../players/players.service'
import { TeamsService } from '../teams/teams.service'
import { GamesGateway } from './games.gateway'
import { GamesRepository } from './games.repository'

@Injectable()
export class GamesService {
  constructor(
    @Inject(GamesRepository) private gamesRepository: GamesRepository,
    @Inject(PlayersService) private playersService: PlayersService,
    @Inject(TeamsService) private teamsService: TeamsService,
    private readonly gamesGateway: GamesGateway
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
    console.log('~ supervisor', supervisor)

    if (playerTeam === 'RED') {
      this.teamsService.joinToTeam(teamRed.entityId, supervisor.id)
    } else {
      this.teamsService.joinToTeam(teamBlue.entityId, supervisor.id)
    }

    newGame.name = gameName
    newGame.teamRedId = <TeamId>teamRed.entityId
    newGame.teamBlueId = <TeamId>teamBlue.entityId
    newGame.supervisorId = <PlayerId>supervisor.id
    newGame.status = 'LOBBY'

    const gameId = await this.gamesRepository.save(newGame)
    const { entityData } = await this.gamesRepository.fetch(gameId)
    return entityData
  }

  async joinToGame({ name, teamId }) {
    const user = await this.playersService.create({ name, teamId })

    // TODO this should be normalized ({input1, input2} vs (input1, input2))
    this.teamsService.joinToTeam(teamId, user.id)
    this.gamesGateway.server.emit('userJoined', user)

    return 1
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
