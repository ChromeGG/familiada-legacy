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

export type GameStatus = 'LOBBY' | 'STARTING' | 'RUNNING' | 'FINISHED'

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
  | {
      status: 'STARTING'
    }
)

export interface Team {
  id: TeamId
  gameId: GameId
  color: TeamColor
  lastAnsweringPlayerId: PlayerId
  players: Player[]
}

type ClientEvent<Input = never> = (player: Player, input?: Input) => void

export type ClientToServerEvents = {
  startGame: ClientEvent<GameId>
  startRound: ClientEvent
  answer: ClientEvent<string>
}

export type ServerToClientEvents = {
  playerJoin: (player: Player) => void
  gameStart: (game: Game) => void
  roundStart: () => void // there should be answer which players are allowed to answer
}

export type AppSocket = Socket<ServerToClientEvents, ClientToServerEvents>

export interface SocketData {
  gameId: string
  user: Player
}
