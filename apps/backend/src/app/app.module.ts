import { Module } from '@nestjs/common'
import { GamesModule } from './games/games.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PlayerModule } from './player/player.module'

@Module({
  imports: [GamesModule, PlayerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
