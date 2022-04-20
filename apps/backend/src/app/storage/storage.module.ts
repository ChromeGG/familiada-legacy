import { Module } from '@nestjs/common'
import { storageProviders } from './storage.provider'
import { StorageService } from './storage.service'

@Module({
  // imports: [ConfigModule],
  providers: [...storageProviders],
  exports: [...storageProviders],
})
export class StorageModule {}
