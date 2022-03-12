import { Module } from '@nestjs/common'
import { GamesModule } from './games/games.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { RedisModule } from '@liaoliaots/nestjs-redis'

@Module({
  imports: [
    GamesModule,
    RedisModule.forRoot({
      closeClient: true,
      config: { host: '127.0.0.1', port: 6379, password: 'MyRedisPass' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
