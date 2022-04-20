import { PlayerId, TeamId } from '@familiada/shared-interfaces'
import { isString, isEmail } from 'class-validator'

export class JoinToGameDto {
  @isString()
  teamId: string
  playerId: PlayerId
}
