import { Module } from '@nestjs/common'
// import { RedisModule } from 'nestjs-redis'
import { StorageService } from './storage.service'
// import { ConfigModule } from '@nestjs/config';

@Module({
  // imports: [ConfigModule],
  exports: [
    // RedisModule.register({
    //   port: 6379,
    //   password: 'MyRedisPass',
    //   host: '127.0.0.1',
    //   onClientReady: (client) => {
    //     console.log('REDIS CONNECTED!')
    //     // client.on('error', (err) => {})
    //   },
    // }),
  ],
  providers: [StorageService],
})
export class StorageModule {}
