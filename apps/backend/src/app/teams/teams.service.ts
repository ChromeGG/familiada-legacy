import { Inject, Injectable } from '@nestjs/common'
import { CreateTeamDto } from './dto/create-team.dto'
import { UpdateTeamDto } from './dto/update-team.dto'
import { TeamsRepository } from './teams.repository'

@Injectable()
export class TeamsService {
  constructor(
    @Inject(TeamsRepository) private teamsRepository: TeamsRepository
  ) {}
  async create({ color, gameName }: CreateTeamDto) {
    // await this.teamsRepository.createAndSave({ color, gameId })
    return this.teamsRepository.createAndSave({ color, gameName })
  }

  findOne(id: number) {
    return `This action returns a #${id} team`
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`
  }
}
