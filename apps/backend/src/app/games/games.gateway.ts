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
  constructor(private readonly gamesService: GamesService) {}
  @WebSocketServer()
  server: Server<ClientToServerEvents, ServerToClientEvents>

  @SubscribeMessage('answer')
  handleMessage(@MessageBody() message: string): void {
    // console.log('~ answer', message)
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
    this.gamesService.registerUserHit()
    // console.log('~ socket', client.rooms)
    // console.log('~ socket', this.server.in('123').allSockets)
    // console.log('~ user', user)
    this.server.emit('userJoined', user)
  }

  @SubscribeMessage('join')
  async join(@ConnectedSocket() client: Socket, @MessageBody() user: Player) {
    // console.log('~ socket', client.rooms)
    // console.log('~ socket', this.server.in('123').allSockets)
    // console.log('~ user', user)
    // this.server.emit('userJoined', user)
  }

  // TODO add validation, maybe https://github.com/elisvathi/joi-typescript-validator?
  async handleConnection(client: Socket, user: Player) {
    // console.log(client.id)
    return client
    // client.join()
  }
}
