import { TEAM } from '@familiada/shared-interfaces'
import { joiResolver } from '@hookform/resolvers/joi'
import useTranslation from 'next-translate/useTranslation'
import { useForm } from 'react-hook-form'

import { getJoi, extractDefaults } from './validations'

export interface JoinToGameFormInput {
  name: string
  gameId: string
  team: TEAM
}

export const useJoinToGameForm = () => {
  const { t } = useTranslation('error')
  const Joi = getJoi(t)

  const schema = Joi.object<JoinToGameFormInput>({
    name: Joi.string().required().min(3).default('').label(t('field.name')),
    gameId: Joi.string().required().min(3).default('').label(t('field.gameId')),
    team: Joi.string().valid('RED', 'BLUE'),
  })

  const defaultValues = extractDefaults<JoinToGameFormInput>(schema)

  return useForm<JoinToGameFormInput>({
    defaultValues,
    resolver: joiResolver(schema),
  })
}
