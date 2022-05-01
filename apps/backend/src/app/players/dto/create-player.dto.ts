import { TeamColor, TeamId } from '@familiada/shared-interfaces'
import { minLength } from 'class-validator'

export class CreatePlayerDto {
  readonly name: string
  readonly teamId: TeamId
}
