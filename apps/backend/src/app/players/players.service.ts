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

  create(createPlayerDto: CreatePlayerDto) {
    // ! NEXT: Create player. What ID should be? Socket ID? Redis ID?
    // await this.playerRepository.createAndSave(createPlayerDto)
    return 'This action adds a new player'
  }

  async findOne(id: number) {
    // await this.db.fetchRepository
    return `This action returns a #${id} player`
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return `This action updates a #${id} player`
  }
}
