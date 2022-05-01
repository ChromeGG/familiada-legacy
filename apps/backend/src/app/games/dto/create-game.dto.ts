import { Joi } from '../../../validator/base'

// export class CreatePlayerDto {}

export const createGameSchema = Joi.object({
  playerName: Joi.string().min(3).max(20).required(),
  gameName: Joi.string().min(3).max(20).required(),
  playerTeam: Joi.string().valid('RED', 'BLUE').required(),
})
