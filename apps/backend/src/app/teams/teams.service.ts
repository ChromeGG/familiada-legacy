import { Injectable } from '@nestjs/common'
import { CreateTeamDto } from './dto/create-team.dto'
import { UpdateTeamDto } from './dto/update-team.dto'

@Injectable()
export class TeamsService {
  create(createTeamDto: CreateTeamDto) {
    return 'This action adds a new team'
  }

  findOne(id: number) {
    return `This action returns a #${id} team`
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`
  }
}
