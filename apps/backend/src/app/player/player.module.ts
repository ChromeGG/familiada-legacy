import { Module } from '@nestjs/common'
import { PlayerService } from './player.service'
import { PlayerGateway } from './player.gateway'
import { StorageModule } from '../storage/storage.module'

@Module({
  imports: [StorageModule],
  providers: [PlayerGateway, PlayerService],
})
export class PlayerModule {}
