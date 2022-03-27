import { joiResolver } from '@hookform/resolvers/joi'
import useTranslation from 'next-translate/useTranslation'
import { useForm } from 'react-hook-form'

import { getJoi, extractDefaults } from './validations'

export interface AnswerFormInput {
  answer: string
}

export const useAnswerForm = () => {
  const { t } = useTranslation('error')
  const Joi = getJoi(t)

  const schema = Joi.object<AnswerFormInput>({
    answer: Joi.string().required().default('').label(t('field.answer')),
  })

  const defaultValues = extractDefaults<AnswerFormInput>(schema)

  return useForm<AnswerFormInput>({
    defaultValues,
    resolver: joiResolver(schema),
  })
}
