import { Inject, Injectable } from '@nestjs/common'
import { Client } from 'redis-om'
import { CreatePlayerDto } from './dto/create-player.dto'
import { UpdatePlayerDto } from './dto/update-player.dto'
import { PlayerRepository } from './player.repository'

@Injectable()
export class PlayerService {
  constructor(
    @Inject(PlayerRepository) private playerRepository: PlayerRepository
  ) {}

  create(createPlayerDto: CreatePlayerDto) {
    // ! NEXT: Create player. What ID should be? Socket ID? Redis ID?
    // await this.playerRepository.createAndSave(createPlayerDto)
    return 'This action adds a new player'
  }

  findAll() {
    return `This action returns all player`
  }

  async findOne(id: number) {
    // await this.db.fetchRepository
    return `This action returns a #${id} player`
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return `This action updates a #${id} player`
  }

  remove(id: number) {
    return `This action removes a #${id} player`
  }
}
