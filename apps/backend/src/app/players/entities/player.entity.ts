import { Entity, Schema } from 'redis-om'
import { Client } from 'redis-om'

// export class Player {}
class Player extends Entity {}

const schema = new Schema(Player, {
  id: { type: 'string' },
  name: { type: 'text' },
  teamId: { type: 'number' },
})
