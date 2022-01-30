import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesGateway } from './games.gateway';
import { GamesController } from './games.controller';

@Module({
  controllers: [GamesController],
  providers: [GamesGateway, GamesService],
})
export class GamesModule {}
