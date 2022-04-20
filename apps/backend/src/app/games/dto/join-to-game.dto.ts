import { PlayerId, TeamId } from '@familiada/shared-interfaces'
import { isString, isEmail } from 'class-validator'

export class JoinToGameDto {
  // ! NEXT: Fix it
  @isString()
  teamId: string
  @isString()
  playerId: PlayerId
}
