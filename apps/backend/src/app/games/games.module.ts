import { Module } from '@nestjs/common'
import { GamesService } from './games.service'
import { GamesGateway } from './games.gateway'
import { GamesController } from './games.controller'
import { StorageModule } from '../storage/storage.module'

@Module({
  imports: [StorageModule],
  controllers: [GamesController],
  providers: [GamesGateway, GamesService],
})
export class GamesModule {}
