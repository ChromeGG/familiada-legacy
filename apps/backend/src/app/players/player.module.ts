import { Module } from '@nestjs/common'
import { PlayerService } from './player.service'
import { PlayerGateway } from './player.gateway'
import { StorageModule } from '../storage/storage.module'
import { PlayerRepository } from './player.repository'

@Module({
  imports: [StorageModule],
  providers: [PlayerRepository, PlayerGateway, PlayerService],
})
export class PlayerModule {}
