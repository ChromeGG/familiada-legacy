import { Inject, Injectable } from '@nestjs/common'
import { Client, Entity, Schema } from 'redis-om'
import { JsonRepository } from 'redis-om/dist/repository/repository'
import {
  Game as GameI,
  GameId,
  PlayerId,
  RoundNumber,
  TeamId,
} from '@familiada/shared-interfaces'

// TODO this should be [NonDiscriminatedUnion](https://github.com/sindresorhus/type-fest/issues/386)
interface Game {
  id: GameId
  actualRound: RoundNumber
  answeringUserId: PlayerId
  canHitAnswer: [PlayerId, PlayerId]
  name: string
  status: 'LOBBY' | 'RUNNING' | 'FINISHED'
  teamRedId: TeamId
  teamBlueId: TeamId
  supervisorId: PlayerId
}

class Game extends Entity {}

const schema = new Schema(Game, {
  name: { type: 'string' },
  teamRedId: { type: 'string' },
  teamBlueId: { type: 'string' },
  supervisorId: { type: 'string' },
  actualRound: { type: 'number' },
  answeringUserId: { type: 'string' },
  canHitAnswer: { type: 'string[]' },
  status: { type: 'string' },
})

@Injectable()
export class GamesRepository extends JsonRepository<Game> {
  constructor(@Inject('STORAGE_CONNECTION') client: Client) {
    super(schema, client)
  }
}
