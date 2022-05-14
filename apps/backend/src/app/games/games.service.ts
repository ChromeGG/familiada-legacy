import {
  CreateGameDTO,
  Game,
  GameId,
  Player,
  PlayerId,
  RoundNumber,
  TeamId,
} from '@familiada/shared-interfaces'
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { isEmpty } from 'ramda'
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
  }: CreateGameDTO): Promise<Game> {
    await this.gamesRepository.createIndex()
    const existingGame = await this.gamesRepository
      .search()
      .where('name')
      .equals(gameName)
      .return.first()

    if (existingGame) {
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
      this.teamsService.joinToTeam({
        teamId: <TeamId>teamRed.entityId,
        playerId: supervisor.id,
      })
    } else {
      this.teamsService.joinToTeam({
        teamId: <TeamId>teamBlue.entityId,
        playerId: supervisor.id,
      })
    }

    newGame.name = gameName
    newGame.teamRedId = <TeamId>teamRed.entityId
    newGame.teamBlueId = <TeamId>teamBlue.entityId
    newGame.supervisorId = <PlayerId>supervisor.id
    newGame.status = 'LOBBY'

    const gameId = await this.gamesRepository.save(newGame)
    const { entityData } = await this.gamesRepository.fetch(gameId)

    const game: Game = {
      id: <GameId>gameId,
      name: entityData.name as string,
      status: 'LOBBY',
      supervisorId: <PlayerId>entityData.supervisorId,
      teamRedId: <TeamId>entityData.teamRedId,
      teamBlueId: <TeamId>entityData.teamBlueId,
    }

    return game
  }

  async joinToGame({ name, teamId }): Promise<Player> {
    // check if team exists
    await this.teamsService.findById(teamId)

    // TODO add validation if name isn't unique in game

    const player = await this.playersService.create({ name, teamId })

    const { gameId } = await this.teamsService.joinToTeam({
      teamId,
      playerId: player.id,
    })

    // ! NEXT: ogarnąć dołączenie do pokojów (prawdopodobnie podczas dołączania trzeba .join(game.name))
    this.gamesGateway.server.to(gameId).emit('playerJoin', player)

    return player
  }

  async findByName(name: string): Promise<Game> {
    await this.gamesRepository.createIndex()
    const entity = await this.gamesRepository
      .search()
      .where('name')
      .equals(name)
      .return.first()

    if (!entity) {
      throw new NotFoundException(`Game with name ${name} not found`)
    }

    const game: Game = {
      id: <GameId>entity.entityId,
      name: entity.name,
      supervisorId: entity.supervisorId,
      teamRedId: entity.teamRedId,
      teamBlueId: entity.teamBlueId,
      status: entity.status,
      actualRound: <RoundNumber>entity.actualRound,
      answeringUserId: <PlayerId>entity.answeringUserId,
      canHitAnswer: <[PlayerId, PlayerId]>entity.canHitAnswer,
    }

    return game
  }

  async startGame(gameId: GameId): Promise<void> {
    const game = await this.gamesRepository.fetch(gameId)

    if (isEmpty(game.entityData)) {
      throw new NotFoundException(`Game with id ${gameId} not found`)
    }

    // TODO add validation, is player supervisor in this game?

    game.status = 'STARTING'
    await this.gamesRepository.save(game)

    console.log('~ game.name', game.name)
    this.gamesGateway.server.to(game.name).emit('gameStart', game)

    // return entityData
  }
}
