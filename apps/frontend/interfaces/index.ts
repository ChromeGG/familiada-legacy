import { Player, TeamColor } from '@familiada/shared-interfaces'

export interface AvailableActions {
  hitAnswer: string[]
  answeringUserId: string
}

export interface Team {
  players: Omit<Player, 'team'>[]
  color: TeamColor
  score: number
}

export interface Round {
  currentRound: number
  questionText: string
  answers: [
    {
      text: string
      score: number
    }
  ]
}
