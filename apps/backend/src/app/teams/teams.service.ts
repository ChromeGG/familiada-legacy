import { PlayerId, TeamId } from '@familiada/shared-interfaces'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { PlayersService } from '../players/players.service'
import { CreateTeamDto } from './dto/create-team.dto'
import { UpdateTeamDto } from './dto/update-team.dto'
import { TeamsRepository } from './teams.repository'

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

  async findById(id: TeamId): Promise<any> {
    const team = await this.teamsRepository.fetch(id)

    if (!team) {
      throw new NotFoundException(`Team with id ${id} not found`)
    }

    console.log(team.entityData)
    team.entityData.players = await this.playersService.findByIds(
      <PlayerId[]>team.entityData.playersIds
    )
    return team.entityData
  }

  async joinToTeam(teamId: TeamId, playerId: PlayerId) {
    const team = await this.teamsRepository.fetch(teamId)

    if (!team) {
      throw new NotFoundException(`Team with id ${teamId} not found`)
    }

    // TODO TS error, but it's working
    team.entityData.playersIds.push(playerId)
    await this.teamsRepository.save(team)
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`
  }
}
