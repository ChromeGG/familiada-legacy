import { TeamId } from '@familiada/shared-interfaces'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreateTeamDto } from './dto/create-team.dto'
import { UpdateTeamDto } from './dto/update-team.dto'
import { TeamsRepository } from './teams.repository'

@Injectable()
export class TeamsService {
  constructor(
    @Inject(TeamsRepository) private teamsRepository: TeamsRepository
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

    return team.entityData
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`
  }
}
