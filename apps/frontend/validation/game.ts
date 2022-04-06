import { CreateGameDTO } from '@familiada/shared-interfaces'
import { joiResolver } from '@hookform/resolvers/joi'
import useTranslation from 'next-translate/useTranslation'
import { useForm } from 'react-hook-form'

import { getJoi, extractDefaults } from './validations'

export const useCreateGameForm = () => {
  const { t } = useTranslation('error')
  const Joi = getJoi(t)

  const schema = Joi.object<CreateGameDTO>({
    playerName: Joi.string()
      .required()
      .min(3)
      .max(20)
      .default('')
      .label(t('field.playerName')),
    gameName: Joi.string()
      .required()
      .min(3)
      .max(20)
      .default('')
      .label(t('field.gameName')),
    team: Joi.string().valid('RED', 'BLUE').required().label(t('field.team')),
  })

  const defaultValues = extractDefaults<CreateGameDTO>(schema)

  return useForm<CreateGameDTO>({
    defaultValues,
    // @ts-ignore
    resolver: joiResolver(schema),
  })
}

export interface JoinToGameInput {
  name: string
  team: string
}

export const useJoinToGameForm = () => {
  const { t } = useTranslation('error')
  const Joi = getJoi(t)

  const schema = Joi.object<JoinToGameInput>({
    name: Joi.string()
      .required()
      .min(3)
      .max(20)
      .default('')
      .label(t('field.playerName')),
    team: Joi.string().valid('RED', 'BLUE').required().label(t('field.team')),
  })

  const defaultValues = extractDefaults<JoinToGameInput>(schema)

  return useForm<JoinToGameInput>({
    defaultValues,
    resolver: joiResolver(schema),
  })
}
