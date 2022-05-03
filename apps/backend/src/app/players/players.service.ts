import { Player, PlayerId, TeamId } from '@familiada/shared-interfaces'
import { Inject, Injectable } from '@nestjs/common'
import { CreatePlayerDto } from './dto/create-player.dto'
import { PlayersRepository } from './players.repository'

@Injectable()
export class PlayersService {
  constructor(
    @Inject(PlayersRepository) private playersRepository: PlayersRepository
  ) {}

  async create({ name, teamId }: CreatePlayerDto): Promise<Player> {
    const { entityData, entityId } = await this.playersRepository.createAndSave(
      {
        name,
        teamId,
      }
    )

    const player: Player = {
      id: <PlayerId>entityId,
      // It return general type EntityData, but it's string
      name: entityData.name as string,
      teamId: <TeamId>entityData.teamId,
    }

    return player
  }

  async findById(id: PlayerId): Promise<Player> {
    const entity = await this.playersRepository.fetch(id)

    const player: Player = {
      id,
      name: entity.entityData.name as string,
      teamId: <TeamId>entity.entityData.teamId,
    }

    return player
  }

  async findByIds(ids: PlayerId[]): Promise<Player[]> {
    if (!ids.length) {
      return []
    }

    await this.playersRepository.createIndex()
    const entities = await this.playersRepository.search().return.all()

    const filteredEntities = ids.map((id) =>
      entities.find((player) => player.entityId === id)
    )

    const players: Player[] = filteredEntities.map((entity) => {
      const player: Player = {
        id: <PlayerId>entity.entityId,
        name: entity.entityData.name as string,
        teamId: <TeamId>entity.entityData.teamId,
      }
      return player
    })

    return players
  }
}
