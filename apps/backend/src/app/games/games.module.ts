import { Module } from '@nestjs/common'
import { GamesService } from './games.service'
import { GamesGateway } from './games.gateway'
import { GamesController } from './games.controller'
import { StorageModule } from '../storage/storage.module'
import { GamesRepository } from './games.repository'
import { PlayersModule } from '../players/players.module'
import { TeamsModule } from '../teams/teams.module'

@Module({
  imports: [StorageModule, PlayersModule, TeamsModule],
  controllers: [GamesController],
  providers: [GamesRepository, GamesGateway, GamesService],
})
export class GamesModule {}
