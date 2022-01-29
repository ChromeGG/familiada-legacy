import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, ) {}
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

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('/games/create')
  createGame() {
    return this.appService.createGame();
  }

  @Post('/games/join')
  joinToGame(@Body() {gameId, userName}: {gameId: string, userName: string}) {
    console.log(gameId)
    // ! TODO server is null, fix it
    this.server.emit('userJoinedToGame', userName);
    return gameId
  }
}
