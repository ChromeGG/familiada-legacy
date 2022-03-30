import { TeamColor } from '@familiada/shared-interfaces'

export class CreateTeamDto {
  readonly gameName: string
  readonly color: TeamColor
}
