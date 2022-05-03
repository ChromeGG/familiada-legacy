import { Module } from '@nestjs/common'
import { PlayersService } from './players.service'
import { PlayersGateway } from './players.gateway'
import { StorageModule } from '../storage/storage.module'
import { PlayersRepository } from './players.repository'
import { PlayersController } from './players.controller'

@Module({
  imports: [StorageModule],
  providers: [PlayersRepository, PlayersGateway, PlayersService],
  controllers: [PlayersController],
  exports: [PlayersService],
})
export class PlayersModule {}
