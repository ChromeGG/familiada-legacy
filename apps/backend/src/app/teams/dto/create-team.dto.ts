import { TeamColor } from '@familiada/shared-interfaces'

export class CreateTeamDto {
  readonly gameId: string
  readonly color: TeamColor
}
