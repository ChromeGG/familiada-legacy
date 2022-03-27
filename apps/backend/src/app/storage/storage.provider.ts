import { Client } from 'redis-om'

export const storageProviders = [
  {
    provide: 'STORAGE_CONNECTION',
    useFactory: async (): Promise<Client> => {
      const client = await new Client().open('redis://localhost:6379')

      const aString = await client.execute(['PING'])
      console.log('~ aString', aString)

      return client
    },
  },
]
