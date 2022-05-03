import { TeamColor, TeamId } from '../lib/interfaces'

export interface CreateGameDTO {
  playerName: string
  gameName: string
  playerTeam: TeamColor
}

export interface JoinToGameDTO {
  teamId: TeamId
  name: string
}
