import { PlayerId, TeamId } from '@familiada/shared-interfaces'
import { Joi } from '../../../validator/base'

export interface JoinToGameDto {
  teamId: TeamId
  name: PlayerId
}

export const joinToGameSchema = Joi.object<JoinToGameDto>({
  teamId: Joi.string().required(),
  name: Joi.string().required(),
})
