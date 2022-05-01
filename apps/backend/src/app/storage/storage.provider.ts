import { Client } from 'redis-om'

export const storageProviders = [
  {
    provide: 'STORAGE_CONNECTION',
    useFactory: async (): Promise<Client> => {
      // TODO create config module and use it
      const port = process.env.REDIS_PORT || 6379
      const client = await new Client().open(`redis://localhost:${port}`)

      const aString = await client.execute(['PING'])
      console.log('~ aString', aString)

      return client
    },
  },
]
