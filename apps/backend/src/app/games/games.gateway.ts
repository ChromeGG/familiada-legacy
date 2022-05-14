import { GamesService } from './games.service'
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import {
  ClientToServerEvents,
  ServerToClientEvents,
  Player,
} from '@familiada/shared-interfaces'
import { forwardRef, Inject } from '@nestjs/common'

@WebSocketGateway({ cors: '*' })
export class GamesGateway {
  constructor(
    @Inject(forwardRef(() => GamesService)) private gamesService: GamesService
  ) {}
  @WebSocketServer()
  server: Server<ClientToServerEvents, ServerToClientEvents>

  @SubscribeMessage('startGame')
  async startGame(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    [player, gameId]: Parameters<ClientToServerEvents['startGame']>
  ) {
    await this.gamesService.startGame(gameId)
  }

  @SubscribeMessage('answer')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: string
  ) {
    console.log('Clienti', client)
    console.log(message)
    console.log(await this.server.allSockets())
    // this.server.to().emit('message', message)
  }

  @SubscribeMessage('answerHit')
  async answerHit(
    @ConnectedSocket() client: Socket,
    @MessageBody() user: Player
  ) {
    // this.server.emit('lockAnswering')
    //
    // To ustawia w round[0].firstAnswerHit: Adam
    // this.gamesService.registerUserHit()
    // this.server.emit('playerJoin', user)
  }

  @SubscribeMessage('join')
  async join(@ConnectedSocket() client: Socket, @MessageBody() user: Player) {
    // this.server.emit('userJoined', user)
  }

  // TODO add validation, maybe https://github.com/elisvathi/joi-typescript-validator?
  async handleConnection(client: Socket, user: Player) {
    return client
  }
}
