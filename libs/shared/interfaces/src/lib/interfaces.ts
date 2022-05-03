import { Opaque } from 'type-fest'
import { Socket } from 'socket.io-client'

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

export type Game = {
  id: GameId
  name: string
  supervisorId: PlayerId
  teamRedId: TeamId
  teamBlueId: TeamId
} & (
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
  gameId: GameId
  color: TeamColor
  lastAnsweringPlayerId: PlayerId
  players: Player[]
}

export type ClientToServerEvents = {
  answer: (player: Player) => void
}

export type ServerToClientEvents = { playerJoined: (player: Player) => void }

export type AppSocket = Socket<ServerToClientEvents, ClientToServerEvents>

export interface SocketData {
  gameId: string
  user: Player
}
