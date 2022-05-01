// import { bootstrap } from './src/main'
// ;(async () => {
//   await bootstrap()
// })()

import { Client } from 'redis-om'

afterEach(async () => {
  console.log('afterEach')
})
afterEach(async () => {
  // const module: TestingModule = await Test.createTestingModule({
  // }).compile()
  // service = module.get<GamesService>(GamesService)
  // await app.init()
  // TODO move it out of afterEach
  const port = process.env.REDIS_PORT || 6379
  const client = await new Client().open(`redis://localhost:${port}`)
  await client.execute(['FLUSHDB'])
})
