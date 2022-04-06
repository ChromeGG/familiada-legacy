import { Entity, Schema } from 'redis-om'
import { Client } from 'redis-om'

// export class Player {}
class Player extends Entity {}

const schema = new Schema(Player, {
  id: { type: 'string' },
  name: { type: 'text' },
  teamId: { type: 'number' },
})

// (async function() {

//   const redis = createClient('redis://localhost:6379')
//   let client = await new Client().use(redis)

//   await redis.set('foo', 'bar')
//   let value = await client.execute(['GET', 'foo'])
//   let albumRepository = client.fetchRepository(schema)
// })()
