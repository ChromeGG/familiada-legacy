import { PlayerId, TeamId } from '@familiada/shared-interfaces'
import * as Joi from 'joi'

export class JoinToGameDto {
  teamId: TeamId
  playerId: PlayerId
}

export const joinToGameSchema = Joi.object({
  teamId: Joi.string().required(),
  playerId: Joi.string().required(),
})
