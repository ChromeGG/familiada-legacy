import * as Joi from 'joi'

// export class CreatePlayerDto {}

export const createGameDto = Joi.object({
  playerName: Joi.string().min(3).max(20).required(),
  gameName: Joi.string().min(3).max(20).required(),
  playerTeam: Joi.string().valid('RED', 'BLUE').required(),
})
