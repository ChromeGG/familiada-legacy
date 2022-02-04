import { Module } from '@nestjs/common'
import { GamesModule } from './games/games.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [GamesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
