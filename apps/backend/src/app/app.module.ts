import { Module } from '@nestjs/common'
import { GamesModule } from './games/games.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { RedisModule } from '@liaoliaots/nestjs-redis'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    RedisModule.forRoot({
      closeClient: true,
      config: { host: '127.0.0.1', port: 6379, password: 'MyRedisPass' },
    }),
    GamesModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
