import { Joi } from '../../../validator/base'
import { CreateGameDTO } from '@familiada/shared-interfaces'

export const createGameSchema = Joi.object<CreateGameDTO>({
  playerName: Joi.string().min(3).max(20).required(),
  gameName: Joi.string().min(3).max(20).required(),
  playerTeam: Joi.string().valid('RED', 'BLUE').required(),
})
