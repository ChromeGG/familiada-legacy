import { TeamColor } from '@familiada/shared-interfaces'

export class CreatePlayerDto {
  readonly name: string
  readonly team: TeamColor
}
