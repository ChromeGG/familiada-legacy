import { Module } from '@nestjs/common'
import { TeamsService } from './teams.service'
import { TeamsController } from './teams.controller'
import { TeamsRepository } from './teams.repository'
import { StorageModule } from '../storage/storage.module'
import { PlayersModule } from '../players/players.module'

@Module({
  imports: [StorageModule, PlayersModule],
  controllers: [TeamsController],
  providers: [TeamsService, TeamsRepository],
  exports: [TeamsService],
})
export class TeamsModule {}
