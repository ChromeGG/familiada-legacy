import { PlayerId } from '@familiada/shared-interfaces'
import { Inject, Injectable } from '@nestjs/common'
import { Client } from 'redis-om'
import { CreatePlayerDto } from './dto/create-player.dto'
import { UpdatePlayerDto } from './dto/update-player.dto'
import { PlayersRepository } from './players.repository'

@Injectable()
export class PlayersService {
  constructor(
    @Inject(PlayersRepository) private playersRepository: PlayersRepository
  ) {}

  async create({ name, teamId }: CreatePlayerDto) {
    return await this.playersRepository.createAndSave({ name, teamId })
  }

  async findOne(id: number) {
    // await this.db.fetchRepository
    return `This action returns a #${id} player`
  }

  async findByIds(ids: PlayerId[]) {
    await this.playersRepository.createIndex()
    const players = await this.playersRepository.search().return.all()
    await this.playersRepository.dropIndex()

    const results = ids.map(
      (id) => players.find((player) => player.entityId === id).entityData
    )

    return results
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return `This action updates a #${id} player`
  }
}
