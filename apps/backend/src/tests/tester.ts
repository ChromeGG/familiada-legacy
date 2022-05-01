// // export const Tester

// import { Client } from 'redis-om'

// export const createTester = async () => {
//   const port = process.env.REDIS_PORT || 6379
//   const client = await new Client().open(`redis://localhost:${port}`)

//   afterEach(async () => {
//     // const module: TestingModule = await Test.createTestingModule({
//     // }).compile()
//     // service = module.get<GamesService>(GamesService)
//     // await app.init()
//     // TODO move it out of afterEach
//     await client.execute(['FLUSHDB'])
//   })

//   return {
//     checkInDb: async (key) => {
//       const result = await client.execute(['JSON.GET', key])
//       return result
//     },
//   }
// }
