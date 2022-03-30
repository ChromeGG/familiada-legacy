import { GameId, TeamColor } from '@familiada/shared-interfaces'

export class CreateTeamDto {
  readonly gameId: GameId
  readonly color: TeamColor
}
