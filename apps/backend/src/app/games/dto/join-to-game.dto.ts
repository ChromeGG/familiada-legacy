import { JoinToGameDTO } from '@familiada/shared-interfaces'
import { Joi } from '../../../validator/base'

export const joinToGameSchema = Joi.object<JoinToGameDTO>({
  teamId: Joi.string().required(),
  name: Joi.string().required(),
})
