import { Client } from 'redis-om'
// (async function() {

//   const redis = createClient('redis://localhost:6379')
//   let client = await new Client().use(redis)

//   await redis.set('foo', 'bar')
//   let value = await client.execute(['GET', 'foo'])
//   let albumRepository = client.fetchRepository(schema)
// })()

export const storageProviders = [
  {
    provide: 'STORAGE_CONNECTION',
    useFactory: async (): Promise<Client> => {
      const client = new Client()
      await client.open('redis://localhost:6379')

      const aString = await client.execute(['PING'])
      console.log('~ aString', aString)
      // 'PONG'

      // const aNumber = await client.execute([
      //   'HSET',
      //   'foo',
      //   'bar',
      //   'baz',
      //   'qux',
      //   42,
      // ])
      // // 2
      // const anArray = await client.execute(['HGETALL', 'foo'])

      // const client = await mongodb.MongoClient.connect(
      //   'mongodb://localhost',
      //   {
      //     useUnifiedTopology: true,
      //   }
      // )
      // const db = client.db('test')

      return client
    },
  },
]
