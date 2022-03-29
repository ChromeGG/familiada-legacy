import { GameId, TeamColor } from '../lib/interfaces'

export interface CreateGameDTO {
  playerName: string
  gameId: GameId
  team: TeamColor
}
