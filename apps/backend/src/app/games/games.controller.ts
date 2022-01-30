import { Body, Controller, Get, Post } from '@nestjs/common';

import { Socket } from 'socket.io';
import { GamesGateway } from './games.gateway';
import { GamesService } from './games.service';

@Controller('/games')
export class GamesController {
  constructor(private readonly gamesService: GamesService, private gamesGateway: GamesGateway) {}


  async handleConnection(client: Socket, ...args: any[]) {
    // console.log(await this.server.fetchSockets())
    console.log(`Client connected: ${client.id}`);
   }

  @Get()
  getData() {
    return this.gamesService.getData();
  }

  @Get('/create')
  createGame() {
    return this.gamesService.createGame();
  }

  @Post('/join')
  joinToGame(@Body() {gameId, userName}: {gameId: string, userName: string}) {
    console.log(gameId)
    // ! TODO server is null, fix it
    this.gamesGateway.server.emit('userJoinedToGame', userName);
    return gameId
  }
}
