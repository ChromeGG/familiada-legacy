import { Module } from '@nestjs/common'
import { GamesModule } from './games/games.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PlayersModule } from './players/players.module'
import { TeamsModule } from './teams/teams.module'

@Module({
  imports: [GamesModule, PlayersModule, TeamsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
