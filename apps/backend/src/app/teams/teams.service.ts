import {
  GameId,
  PlayerId,
  Team,
  TeamColor,
  TeamId,
} from '@familiada/shared-interfaces'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { PlayersService } from '../players/players.service'
import { CreateTeamDto } from './dto/create-team.dto'
import { UpdateTeamDto } from './dto/update-team.dto'
import { TeamsRepository } from './teams.repository'
import { isEmpty } from 'ramda'

@Injectable()
export class TeamsService {
  constructor(
    @Inject(TeamsRepository) private teamsRepository: TeamsRepository,
    @Inject(PlayersService) private playersService: PlayersService
  ) {}
  async create({ color, gameId, playersIds }: CreateTeamDto) {
    // await this.teamsRepository.createAndSave({ color, gameId })
    return this.teamsRepository.createAndSave({ color, gameId, playersIds })
  }

  async findById(id: TeamId): Promise<Team> {
    const entity = await this.teamsRepository.fetch(id)

    if (!entity) {
      throw new NotFoundException(`Team with id ${id} not found`)
    }

    const players = await this.playersService.findByIds(
      <PlayerId[]>entity.entityData.playersIds
    )

    const team: Team = {
      id: <TeamId>entity.entityId,
      color: entity.entityData.color as TeamColor,
      gameId: <GameId>entity.entityData.gameId,
      lastAnsweringPlayerId: <PlayerId>entity.entityData.lastAnsweringPlayerId,
      players: players,
    }
    return team
  }

  async joinToTeam({
    teamId,
    playerId,
  }: {
    teamId: TeamId
    playerId: PlayerId
  }) {
    const team = await this.teamsRepository.fetch(teamId)

    if (!team || isEmpty(team.entityData)) {
      throw new NotFoundException(`Team with id ${teamId} not found`)
    }

    // TODO TS error, but it's working
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    team.entityData.playersIds.push(playerId)
    await this.teamsRepository.save(team)
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`
  }
}
