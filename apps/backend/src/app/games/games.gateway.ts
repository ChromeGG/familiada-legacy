import { GamesService } from './games.service';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({cors: '*'})
export class GamesGateway {
  constructor(private readonly gamesService: GamesService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    console.log('~ message', message)
    this.server.emit('message', message);
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    console.log(data)
    return data;
  }

  async handleConnection(client: Socket, ...args: any[]) {
    // console.log(await this.server.fetchSockets())
    console.log(`Client connected: ${client.id}`);
   }
}
