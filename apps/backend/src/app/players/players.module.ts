import { Module } from '@nestjs/common'
import { PlayersService } from './players.service'
import { PlayersGateway } from './players.gateway'
import { StorageModule } from '../storage/storage.module'
import { PlayersRepository } from './players.repository'

@Module({
  imports: [StorageModule],
  providers: [PlayersRepository, PlayersGateway, PlayersService],
})
export class PlayersModule {}
