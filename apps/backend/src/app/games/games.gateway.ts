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

@WebSocketGateway({ cors: '*' })
export class GamesGateway {
  // constructor(private readonly gamesService: GamesService) {}
  @WebSocketServer()
  server: Server<ClientToServerEvents, ServerToClientEvents>

  @SubscribeMessage('answer')
  handleMessage(@MessageBody() message: string): void {
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
    this.server.emit('playerJoined', user)
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
