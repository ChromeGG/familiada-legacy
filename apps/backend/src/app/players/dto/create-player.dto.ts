import { TeamColor, TeamId } from '@familiada/shared-interfaces'

export class CreatePlayerDto {
  readonly name: string
  readonly teamId: TeamId
}
