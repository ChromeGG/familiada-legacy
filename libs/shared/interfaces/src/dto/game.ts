import { TeamColor } from '../lib/interfaces'

export interface CreateGameDTO {
  playerName: string
  gameName: string
  playerTeam: TeamColor
}
