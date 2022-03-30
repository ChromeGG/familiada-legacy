// TODO

import { Opaque } from 'type-fest'

export type TeamColor = 'RED' | 'BLUE'
export type PlayerId = Opaque<string, 'PlayerId'>
export type TeamId = Opaque<string, 'TeamId'>
export type GameId = Opaque<string, 'GameId'>
export type RoundNumber = Opaque<1 | 2 | 3 | 4, 'RoundNumber'>

export interface Player {
  id: PlayerId
  name: string
  teamId: TeamId
}

export type Game = { id: string; supervisorId: PlayerId } & (
  | {
      status: 'LOBBY' | 'FINISHED'
    }
  | {
      status: 'RUNNING'
      actualRound: RoundNumber
      answeringUserId: PlayerId
      canHitAnswer: [PlayerId, PlayerId]
    }
)

export interface Team {
  id: TeamId
  gameName: string
  color: TeamColor
  lastAnsweringPlayerId: PlayerId
  playersOrder: PlayerId[]
}

export type ClientToServerEvents = {
  join: (user: Player) => void
  answer: (user: Player) => void
}

export type ServerToClientEvents = { userJoined: (user: Player) => void }

export interface SocketData {
  gameId: string
  user: Player
}
